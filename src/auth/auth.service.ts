import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Request,
  NotFoundException,
} from "@nestjs/common";
import { LoginDTO } from "./dto/login.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "@src/schemas/user.schema";
import { Model } from "mongoose";
import { RegisterDTO } from "./dto/create.dto";
import { JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { RefreshToken } from "@src/schemas/refresh-token.schema";
import { v4 as uuidv4 } from "uuid";
import { RefreshTokenDTO } from "./dto/refreshToken.dto";
import { ChangePasswordDTO } from "./dto/password.dto";
import { FRONTEND_URL } from "app-config/config.json";
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService
  ) {}

  async register(data: RegisterDTO): Promise<User> {
    const { email, password, confirmPassword, fullname, role = "user" } = data;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException("Email already exists");
    }
    if (password !== confirmPassword) {
      throw new BadRequestException("Passwords do not match");
    }
    const user = new this.userModel({
      email,
      password,
      name: fullname,
      role: role || "user",
    });
    await user.save();
    return user;
  }

  async login(data: LoginDTO) {
    const { email, password } = data;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return this.generateUserTokens(user._id);
  }

  async loginWithGoogle(profile: any) {
    const { email, name, picture } = profile;
    if (!email) {
      throw new BadRequestException(
        "Invalid Google profile: email is required"
      );
    }
    let user = await this.userModel.findOne({ email });
    if (!user) {
      user = new this.userModel({
        email,
        name,
        avatar: picture,
        role: "user",
      });
      await user.save();
    }
    return this.generateUserTokens(user._id);
  }

  async handleGoogleLoginCallback(profile: any, res: any) {
    console.log("Google callback received:", profile); // Log để debug
    const jwt = await this.loginWithGoogle(profile);
    console.log("Generated JWT:", jwt);

    // Set token vào HttpOnly cookies và điều hướng về FE
    res.cookie("accessToken", jwt.accessToken, {
      httpOnly: true,
      domain: "localhost",
      secure: false, // set true khi dùng HTTPS
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1h
    });
    res.cookie("refreshToken", jwt.refreshToken, {
      httpOnly: true,
      domain: "localhost",
      secure: false,
      sameSite: "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
    });
    res.redirect(`${FRONTEND_URL}?login=success`);
  }

  async status() {
    return { message: "Logged in successfully" };
  }

  async getCurrentUser(@Request() req) {
    return req.currentUser;
  }
  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    return user;
  }

  async refreshToken(data: RefreshTokenDTO) {
    const { refreshToken } = data;
    if (!refreshToken) {
      throw new BadRequestException("Refresh token is required");
    }
    const token = await this.refreshTokenModel.findOne({ token: refreshToken });
    if (!token) {
      throw new UnauthorizedException("Invalid refresh token");
    }
    if (token.expiryDate < new Date()) {
      await this.refreshTokenModel.deleteOne({ token: refreshToken });
      throw new UnauthorizedException("Refresh token has expired");
    }
    return this.generateUserTokens(token.userId);
  }

  async logout(userId: string, accessToken: string) {
    await this.refreshTokenModel.deleteMany({ userId });
    return { message: "Logged out successfully" };
  }

  // create token
  async generateUserTokens(userId) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    const accessToken = this.jwtService.sign(
      { userId, role: user.role },
      { secret: jwtConstants.secret, expiresIn: "1h" }
    );
    const refreshToken = uuidv4();
    // Xoá refresh token cũ
    await this.refreshTokenModel.deleteMany({ userId });
    // Tạo refresh token mới
    await this.storeRefreshToken(refreshToken, userId);
    return { accessToken, refreshToken };
  }

  //  refresh token
  async storeRefreshToken(token: string, userId: string) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    await this.refreshTokenModel.updateOne(
      { userId },
      { $set: { token, expiryDate } },
      { upsert: true }
    );
  }

  // changePassword
  async changePassword(userId: string, data: ChangePasswordDTO) {
    const { oldPassword, newPassword } = data;
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid old password");
    }
    user.password = newPassword;
    await user.save();
    return { message: "Password changed successfully" };
  }
}
