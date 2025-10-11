import { LoginDTO } from './dto/login.dto';
import { User } from '@src/schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterDTO } from './dto/create.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '@src/schemas/refresh-token.schema';
import { RefreshTokenDTO } from './dto/refreshToken.dto';
import { ChangePasswordDTO } from './dto/password.dto';
export declare class AuthService {
    private readonly userModel;
    private readonly refreshTokenModel;
    private jwtService;
    constructor(userModel: Model<User>, refreshTokenModel: Model<RefreshToken>, jwtService: JwtService);
    register(data: RegisterDTO): Promise<User>;
    login(data: LoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    loginWithGoogle(profile: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    handleGoogleLoginCallback(profile: any, res: any): Promise<void>;
    status(): Promise<{
        message: string;
    }>;
    getCurrentUser(req: any): Promise<any>;
    getUserById(id: string): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    refreshToken(data: RefreshTokenDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(userId: string, accessToken: string): Promise<{
        message: string;
    }>;
    generateUserTokens(userId: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    storeRefreshToken(token: string, userId: string): Promise<void>;
    changePassword(userId: string, data: ChangePasswordDTO): Promise<{
        message: string;
    }>;
}
