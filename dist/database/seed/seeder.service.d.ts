import { AdminSeeder } from './seeders/admin.seeder';
import { RolesSeeder } from './seeders/role.seeder';
import { PermissionsSeeder } from './seeders/permission.seeder';
export declare class SeederService {
    private readonly adminSeeder;
    private readonly rolesSeeder;
    private readonly permissionsSeeder;
    constructor(adminSeeder: AdminSeeder, rolesSeeder: RolesSeeder, permissionsSeeder: PermissionsSeeder);
    runSeeders(): Promise<void>;
}
