"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entities/user.entity");
const permission_entity_1 = require("../entities/permission.entity");
const role_entity_1 = require("../entities/role.entity");
const admin_seeder_1 = require("./seeders/admin.seeder");
const role_seeder_1 = require("./seeders/role.seeder");
const seeder_service_1 = require("./seeder.service");
const typeorm_service_1 = require("../typeorm/typeorm.service");
const env_helper_1 = require("../../core/utils/env.helper");
const permission_seeder_1 = require("./seeders/permission.seeder");
let SeederModule = class SeederModule {
};
exports.SeederModule = SeederModule;
exports.SeederModule = SeederModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: (0, env_helper_1.determineEnvFilePath)(),
                load: [() => ({ environment: process.env.NODE_ENV || 'development' })],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({ useClass: typeorm_service_1.TypeOrmConfigService }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, role_entity_1.Role, permission_entity_1.Permission]),
        ],
        providers: [seeder_service_1.SeederService, role_seeder_1.RolesSeeder, admin_seeder_1.AdminSeeder, permission_seeder_1.PermissionsSeeder],
        exports: [seeder_service_1.SeederService],
    })
], SeederModule);
//# sourceMappingURL=seeder.module.js.map