import { Repository } from 'typeorm';
import { SeederInterface } from '../seeder.interface';
import { Permission } from 'src/database/entities/permission.entity';
import { Role } from 'src/database/entities/role.entity';
export declare class PermissionsSeeder implements SeederInterface {
    private readonly permissionsRepository;
    private readonly rolesRepository;
    constructor(permissionsRepository: Repository<Permission>, rolesRepository: Repository<Role>);
    seed(): Promise<void>;
}
