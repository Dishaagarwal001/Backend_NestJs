import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/app/user/user.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthGuard implements CanActivate {
    private readonly jwtService;
    private readonly userService;
    private readonly config;
    constructor(jwtService: JwtService, userService: UserService, config: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
