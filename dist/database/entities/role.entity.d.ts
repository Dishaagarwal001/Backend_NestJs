import { Permission } from './permission.entity';
import { User } from './user.entity';
export declare class Role {
    id: number;
    name: string;
    permissions: Permission[];
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}
