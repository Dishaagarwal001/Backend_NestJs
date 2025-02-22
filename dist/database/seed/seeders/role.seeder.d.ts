import { Repository } from 'typeorm';
import { SeederInterface } from '../seeder.interface';
import { Role } from 'src/database/entities/role.entity';
export declare class RolesSeeder implements SeederInterface {
    private readonly rolesRepository;
    constructor(rolesRepository: Repository<Role>);
    seed(): Promise<void>;
    private generateData;
}
