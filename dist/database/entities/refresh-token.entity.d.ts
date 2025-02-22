import { User } from './user.entity';
export declare class RefreshToken {
    id: string;
    token: string;
    expiresAt: Date;
    user: User;
    device: string;
    ip: string;
    createdAt: Date;
    updatedAt: Date;
}
