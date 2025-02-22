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
exports.PermissionsSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const permission_entity_1 = require("../../entities/permission.entity");
const role_entity_1 = require("../../entities/role.entity");
let PermissionsSeeder = class PermissionsSeeder {
    constructor(permissionsRepository, rolesRepository) {
        this.permissionsRepository = permissionsRepository;
        this.rolesRepository = rolesRepository;
    }
    async seed() {
        const permissionsData = [
            'create_user',
            'edit_user',
            'delete_user',
            'view_users',
            'edit_role',
            'delete_role',
            'create_role',
            'view_roles',
            'view_profile',
            'edit_profile',
        ];
        const permissions = await Promise.all(permissionsData.map(async (permissionName) => {
            const permission = await this.permissionsRepository.findOne({
                where: { name: permissionName },
            });
            if (!permission) {
                return this.permissionsRepository.save({ name: permissionName });
            }
            return permission;
        }));
        const adminPermissions = permissions;
        const userPermissions = permissions.filter((permission) => ['view_profile', 'edit_profile'].includes(permission.name));
        const adminRole = await this.rolesRepository.findOne({
            where: { name: 'Admin' },
            relations: ['permissions'],
        });
        const userRole = await this.rolesRepository.findOne({
            where: { name: 'User' },
            relations: ['permissions'],
        });
        if (adminRole) {
            adminRole.permissions = adminPermissions;
            await this.rolesRepository.save(adminRole);
        }
        if (userRole) {
            userRole.permissions = userPermissions;
            await this.rolesRepository.save(userRole);
        }
    }
};
exports.PermissionsSeeder = PermissionsSeeder;
exports.PermissionsSeeder = PermissionsSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PermissionsSeeder);
//# sourceMappingURL=permission.seeder.js.map