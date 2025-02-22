import { Role } from './role.entity';
import { RefreshToken } from './refresh-token.entity';
export declare class User {
    id: string;
    name: string;
    username: string;
    email: string;
    dob?: Date;
    password: string;
    roles: Role[];
    gender: string;
    refreshTokens: RefreshToken[];
    isActive: boolean;
    isDeleted: boolean;
    resetOtp: string;
    resetOtpExpiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
