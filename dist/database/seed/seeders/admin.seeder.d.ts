import { Repository, EntityManager } from 'typeorm';
import { SeederInterface } from '../seeder.interface';
import { ConfigService } from '@nestjs/config';
import { Role } from '../../entities/role.entity';
export declare class AdminSeeder implements SeederInterface {
    private readonly rolesRepository;
    private readonly config;
    private readonly entityManager;
    constructor(rolesRepository: Repository<Role>, config: ConfigService, entityManager: EntityManager);
    seed(): Promise<void>;
    private generateData;
}
