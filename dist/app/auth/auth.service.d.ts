import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { RefreshToken } from 'src/database/entities/refresh-token.entity';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/database/entities/user.entity';
import { EmailService } from '../email/email.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly config;
    private readonly mailerService;
    private readonly refreshTokenRepository;
    private readonly userRepository;
    constructor(userService: UserService, jwtService: JwtService, config: ConfigService, mailerService: EmailService, refreshTokenRepository: Repository<RefreshToken>, userRepository: Repository<User>);
    login(user: any, device: string, ip: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    refreshToken(refreshTokenValue: string, ip: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    validateUser(username: string, password: string): Promise<any>;
    logout(refreshToken: string, userId: string): Promise<void>;
    register(name: string, email: string, password: string): Promise<void>;
    forgotPassword(email: string): Promise<void>;
    confirmOtp(email: string, otp: string): Promise<string>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}
