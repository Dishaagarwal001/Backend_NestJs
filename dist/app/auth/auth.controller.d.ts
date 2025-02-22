import { AuthService } from './auth.service';
import { ConfirmOtpDto } from './dto/confirm-otp.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(authService: AuthService, usersService: UserService, jwtService: JwtService, configService: ConfigService);
    login(body: {
        username: string;
        password: string;
    }, req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(body: {
        refreshToken: string;
    }, req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(body: {
        refreshToken: string;
    }, req: any): Promise<{
        message: string;
    }>;
    register(body: {
        name: string;
        email: string;
        password: string;
    }): Promise<void>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void>;
    confirmOtp(confirmOtpDto: ConfirmOtpDto): Promise<{
        resetToken: string;
    }>;
    activateAccount(body: {
        token: string;
    }): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
