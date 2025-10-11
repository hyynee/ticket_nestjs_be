import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/create.dto';
import { RefreshTokenDTO } from './dto/refreshToken.dto';
import { ChangePasswordDTO } from './dto/password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(data: RegisterDTO): Promise<import("../schemas/user.schema").User>;
    login(loginDto: LoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    googleLogin(): Promise<void>;
    googleLoginCallback(req: any, res: any): Promise<void>;
    status(): Promise<{
        message: string;
    }>;
    refreshToken(token: RefreshTokenDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getCurrentUser(currentUser: any): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/user.schema").User, {}, {}> & import("../schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
    logout(currentUser: any): Promise<{
        message: string;
    }>;
    changePassword(currentUser: any, data: ChangePasswordDTO): Promise<{
        message: string;
    }>;
}
