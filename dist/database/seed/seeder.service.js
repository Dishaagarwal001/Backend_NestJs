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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const admin_seeder_1 = require("./seeders/admin.seeder");
const role_seeder_1 = require("./seeders/role.seeder");
const permission_seeder_1 = require("./seeders/permission.seeder");
let SeederService = class SeederService {
    constructor(adminSeeder, rolesSeeder, permissionsSeeder) {
        this.adminSeeder = adminSeeder;
        this.rolesSeeder = rolesSeeder;
        this.permissionsSeeder = permissionsSeeder;
    }
    async runSeeders() {
        await this.rolesSeeder.seed();
        await this.permissionsSeeder.seed();
        await this.adminSeeder.seed();
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [admin_seeder_1.AdminSeeder,
        role_seeder_1.RolesSeeder,
        permission_seeder_1.PermissionsSeeder])
], SeederService);
//# sourceMappingURL=seeder.service.js.map