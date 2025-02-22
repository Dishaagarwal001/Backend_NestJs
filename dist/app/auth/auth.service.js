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
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const refresh_token_entity_1 = require("../../database/entities/refresh-token.entity");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../../database/entities/user.entity");
const email_service_1 = require("../email/email.service");
const crypto_1 = require("crypto");
let AuthService = class AuthService {
    constructor(userService, jwtService, config, mailerService, refreshTokenRepository, userRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.config = config;
        this.mailerService = mailerService;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
    }
    async login(user, device, ip) {
        const payload = { username: user.username, sub: user.id };
        const accessToken = this.jwtService.sign(payload);
        const refreshTokenValue = this.jwtService.sign({ sub: user.id }, { expiresIn: '7d', secret: this.config.get('REFRESH_TOKEN_SECRET') });
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        const refreshToken = this.refreshTokenRepository.create({
            token: refreshTokenValue,
            expiresAt,
            user,
            device,
            ip,
        });
        await this.refreshTokenRepository.save(refreshToken);
        return {
            access_token: accessToken,
            refresh_token: refreshTokenValue,
        };
    }
    async refreshToken(refreshTokenValue, ip) {
        const refreshToken = await this.refreshTokenRepository.findOne({
            where: { token: refreshTokenValue },
            relations: ['user'],
        });
        if (!refreshToken || refreshToken.expiresAt < new Date()) {
            throw new common_1.UnauthorizedException('Invalid or expired refresh token');
        }
        if (refreshToken.ip !== ip) {
            throw new common_1.UnauthorizedException('IP mismatch');
        }
        const user = refreshToken.user;
        return this.login(user, refreshToken.device, ip);
    }
    async validateUser(username, password) {
        return this.userService.validateUser(username, password);
    }
    async logout(refreshToken, userId) {
        const token = await this.refreshTokenRepository.findOne({
            where: { token: refreshToken, user: { id: userId } },
        });
        if (!token) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
        await this.refreshTokenRepository.delete({ id: token.id });
    }
    async register(name, email, password) {
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.HttpException('Email has been used before.', common_1.HttpStatus.BAD_REQUEST);
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const newUser = { name, email, password: passwordHash };
        const activationToken = this.jwtService.sign(newUser, {
            secret: this.config.get('ACTIVATION_TOKEN_SECRET'),
            expiresIn: '1h',
        });
        const clientUrl = this.config.get('CLIENT_URL');
        const activationUrl = `${clientUrl}/activate/${activationToken}`;
        await this.mailerService.sendRegistrationUrl({
            to: email,
            context: { name, activationUrl },
        });
    }
    async forgotPassword(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.BAD_REQUEST);
        }
        const otp = (0, crypto_1.randomInt)(100000, 999999).toString();
        user.resetOtp = otp;
        user.resetOtpExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
        await this.userRepository.save(user);
        await this.mailerService.sendResetPasswordOtp({
            to: email,
            context: { name: user.name, otp },
        });
    }
    async confirmOtp(email, otp) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || user.resetOtp !== otp || user.resetOtpExpiresAt < new Date()) {
            throw new common_1.HttpException('Invalid OTP or expired', common_1.HttpStatus.BAD_REQUEST);
        }
        user.resetOtp = null;
        user.resetOtpExpiresAt = null;
        await this.userRepository.save(user);
        const resetToken = this.jwtService.sign({ email }, {
            secret: this.config.get('RESET_TOKEN_SECRET'),
            expiresIn: '15m',
        });
        return resetToken;
    }
    async resetPassword(token, newPassword) {
        const decoded = this.jwtService.verify(token, {
            secret: this.config.get('RESET_TOKEN_SECRET'),
        });
        const user = await this.userRepository.findOne({
            where: { email: decoded.email },
        });
        if (!user) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.BAD_REQUEST);
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await this.userRepository.save(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __param(5, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService,
        email_service_1.EmailService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map