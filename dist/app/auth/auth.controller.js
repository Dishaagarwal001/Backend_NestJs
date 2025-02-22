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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const confirm_otp_dto_1 = require("./dto/confirm-otp.dto");
const forgot_password_dto_1 = require("./dto/forgot-password.dto");
const set_message_decorator_1 = require("../../core/decorators/set-message.decorator");
const user_service_1 = require("../user/user.service");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const reset_password_dto_1 = require("./dto/reset-password.dto");
let AuthController = class AuthController {
    constructor(authService, usersService, jwtService, configService) {
        this.authService = authService;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(body, req) {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const device = req.headers['user-agent'] || 'Unknown Device';
        const ip = req.ip || req.connection.remoteAddress;
        return this.authService.login(user, device, ip);
    }
    async refreshToken(body, req) {
        return this.authService.refreshToken(body.refreshToken, req.ip);
    }
    async logout(body, req) {
        if (!body.refreshToken) {
            throw new common_1.HttpException('Refresh token is required', common_1.HttpStatus.BAD_REQUEST);
        }
        const userId = req.user?.id;
        if (!userId) {
            throw new common_1.HttpException('Unauthorized', common_1.HttpStatus.UNAUTHORIZED);
        }
        await this.authService.logout(body.refreshToken, userId);
        return { message: 'Logout successful' };
    }
    async register(body) {
        await this.authService.register(body.name, body.email, body.password);
    }
    async forgotPassword(forgotPasswordDto) {
        await this.authService.forgotPassword(forgotPasswordDto.email);
    }
    async confirmOtp(confirmOtpDto) {
        const resetToken = await this.authService.confirmOtp(confirmOtpDto.email, confirmOtpDto.otp);
        return {
            resetToken,
        };
    }
    async activateAccount(body) {
        const { token } = body;
        if (!token) {
            throw new common_1.HttpException('Invalid account activation token.', common_1.HttpStatus.BAD_REQUEST);
        }
        const secret = this.configService.get('ACTIVATION_TOKEN_SECRET');
        const decoded = this.jwtService.verify(token, { secret });
        const existingUser = await this.usersService.findByEmail(decoded.email);
        if (existingUser) {
            throw new common_1.HttpException('Email has been used before.', common_1.HttpStatus.BAD_REQUEST);
        }
        await this.usersService.create({
            email: decoded.email,
            password: decoded.password,
            name: decoded.name,
            username: decoded.username,
        });
    }
    async resetPassword(resetPasswordDto) {
        await this.authService.resetPassword(resetPasswordDto.resetToken, resetPasswordDto.newPassword);
        return {
            message: 'Password reset successfully',
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({
        description: 'User login credentials',
        schema: {
            type: 'object',
            properties: {
                username: { type: 'string', example: 'john_doe' },
                password: { type: 'string', example: 'password123' },
            },
            required: ['username', 'password'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login successful',
        schema: {
            example: {
                access_token: 'JWT_ACCESS_TOKEN',
                refresh_token: 'JWT_REFRESH_TOKEN',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh-token'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({
        description: 'Refresh token payload',
        schema: {
            type: 'object',
            properties: {
                refreshToken: { type: 'string', example: 'REFRESH_TOKEN' },
            },
            required: ['refreshToken'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Token refreshed',
        schema: {
            example: {
                access_token: 'NEW_ACCESS_TOKEN',
                refresh_token: 'NEW_REFRESH_TOKEN',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid or expired refresh token' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Logout successful.',
        schema: {
            example: {
                message: 'Logout successful',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized or invalid token.',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(200),
    (0, set_message_decorator_1.SetMessage)('Email activation link has been sent to your email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({
        description: 'Forgot password request',
        schema: {
            type: 'object',
            properties: {
                email: { type: 'string', example: 'john.doe@example.com' },
            },
            required: ['email'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Password reset OTP sent',
        schema: {
            example: {
                message: 'OTP sent to email',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid email or user not found' }),
    (0, set_message_decorator_1.SetMessage)('OTP sent to email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('confirm-otp'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({
        description: 'OTP confirmation',
        schema: {
            type: 'object',
            properties: {
                otp: { type: 'string', example: '123456' },
                email: { type: 'string', example: 'john.doe@example.com' },
            },
            required: ['otp', 'email'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'OTP confirmed successfully',
        schema: {
            example: {
                message: 'OTP confirmed, proceed with password reset',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid OTP or expired' }),
    (0, set_message_decorator_1.SetMessage)('OTP confirmed, proceed with password reset'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [confirm_otp_dto_1.ConfirmOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmOtp", null);
__decorate([
    (0, common_1.Post)('activate'),
    (0, set_message_decorator_1.SetMessage)('Account has been activated successfully'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "activateAccount", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({
        description: 'Reset password',
        schema: {
            type: 'object',
            properties: {
                resetToken: { type: 'string', example: 'jwt_reset_token_here' },
                newPassword: { type: 'string', example: 'SecureP@ssword123' },
            },
            required: ['resetToken', 'newPassword'],
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Password reset successfully',
        schema: {
            example: {
                message: 'Password reset successfully',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Invalid token or password criteria not met',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    })),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map