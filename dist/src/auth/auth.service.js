"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../schemas/user.schema");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
const refresh_token_schema_1 = require("../schemas/refresh-token.schema");
const uuid_1 = require("uuid");
const config_json_1 = require("../../app-config/config.json");
let AuthService = class AuthService {
    userModel;
    refreshTokenModel;
    jwtService;
    constructor(userModel, refreshTokenModel, jwtService) {
        this.userModel = userModel;
        this.refreshTokenModel = refreshTokenModel;
        this.jwtService = jwtService;
    }
    async register(data) {
        const { email, password, confirmPassword, fullname, role = 'user' } = data;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        if (password !== confirmPassword) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        const user = new this.userModel({
            email,
            password,
            name: fullname,
            role: role || 'user',
        });
        await user.save();
        return user;
    }
    async login(data) {
        const { email, password } = data;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return this.generateUserTokens(user._id);
    }
    async loginWithGoogle(profile) {
        const { email, name, picture } = profile;
        if (!email) {
            throw new common_1.BadRequestException('Invalid Google profile: email is required');
        }
        let user = await this.userModel.findOne({ email });
        if (!user) {
            user = new this.userModel({
                email,
                name,
                avatar: picture,
                role: 'user',
            });
            await user.save();
        }
        return this.generateUserTokens(user._id);
    }
    async handleGoogleLoginCallback(profile, res) {
        console.log('Google callback received:', profile);
        const jwt = await this.loginWithGoogle(profile);
        console.log('Generated JWT:', jwt);
        res.cookie('accessToken', jwt.accessToken, {
            httpOnly: true,
            domain: 'localhost',
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000,
        });
        res.cookie('refreshToken', jwt.refreshToken, {
            httpOnly: true,
            domain: 'localhost',
            secure: false,
            sameSite: 'lax',
            maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        res.redirect(`${config_json_1.FRONTEND_URL}?login=success`);
    }
    async status() {
        return { message: 'Logged in successfully' };
    }
    async getCurrentUser(req) {
        return req.currentUser;
    }
    async getUserById(id) {
        const user = await this.userModel.findById(id);
        return user;
    }
    async refreshToken(data) {
        const { refreshToken } = data;
        if (!refreshToken) {
            throw new common_1.BadRequestException('Refresh token is required');
        }
        const token = await this.refreshTokenModel.findOne({ token: refreshToken });
        if (!token) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        if (token.expiryDate < new Date()) {
            await this.refreshTokenModel.deleteOne({ token: refreshToken });
            throw new common_1.UnauthorizedException('Refresh token has expired');
        }
        return this.generateUserTokens(token.userId);
    }
    async logout(userId, accessToken) {
        await this.refreshTokenModel.deleteMany({ userId });
        return { message: 'Logged out successfully' };
    }
    async generateUserTokens(userId) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const accessToken = this.jwtService.sign({ userId, role: user.role }, { secret: constants_1.jwtConstants.secret, expiresIn: '1h' });
        const refreshToken = (0, uuid_1.v4)();
        await this.refreshTokenModel.deleteMany({ userId });
        await this.storeRefreshToken(refreshToken, userId);
        return { accessToken, refreshToken };
    }
    async storeRefreshToken(token, userId) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 3);
        await this.refreshTokenModel.updateOne({ userId }, { $set: { token, expiryDate } }, { upsert: true });
    }
    async changePassword(userId, data) {
        const { oldPassword, newPassword } = data;
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid old password');
        }
        user.password = newPassword;
        await user.save();
        return { message: 'Password changed successfully' };
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "getCurrentUser", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(refresh_token_schema_1.RefreshToken.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map