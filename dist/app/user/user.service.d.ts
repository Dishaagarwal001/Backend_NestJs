import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRelation } from 'src/core/interfaces/user';
import { User } from 'src/database/entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    validateUser(username: string, password: string): Promise<User | null>;
    findById(id: string, relations?: UserRelation): Promise<User>;
    findByEmail(email: string): Promise<User | undefined>;
    create(userData: Partial<User>): Promise<User>;
}
