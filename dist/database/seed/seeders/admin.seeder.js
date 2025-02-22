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
exports.AdminSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt_1 = require("bcrypt");
const config_1 = require("@nestjs/config");
const role_entity_1 = require("../../entities/role.entity");
const user_entity_1 = require("../../entities/user.entity");
let AdminSeeder = class AdminSeeder {
    constructor(rolesRepository, config, entityManager) {
        this.rolesRepository = rolesRepository;
        this.config = config;
        this.entityManager = entityManager;
    }
    async seed() {
        const data = await this.generateData();
        await this.entityManager.transaction(async (transactionalEntityManager) => {
            const result = await transactionalEntityManager.upsert(user_entity_1.User, data, {
                conflictPaths: ['email'],
            });
            const adminUser = await transactionalEntityManager
                .getRepository(user_entity_1.User)
                .findOne({
                where: {
                    id: result.raw[0]?.id,
                },
            });
            if (adminUser) {
                adminUser.roles = data.roles;
                await transactionalEntityManager.save(adminUser);
            }
        });
    }
    async generateData() {
        const password = this.config.get('ADMIN_PASSWORD');
        if (!password) {
            throw new Error('Admin password is not configured in the environment variables');
        }
        const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
        const adminRoles = await this.rolesRepository.find();
        return {
            name: 'Admin',
            username: 'admin',
            email: this.config.get('ADMIN_EMAIL'),
            password: hashedPassword,
            roles: adminRoles,
        };
    }
};
exports.AdminSeeder = AdminSeeder;
exports.AdminSeeder = AdminSeeder = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectEntityManager)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        typeorm_2.EntityManager])
], AdminSeeder);
//# sourceMappingURL=admin.seeder.js.map