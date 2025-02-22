"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const config_1 = require("@nestjs/config");
const configService = new config_1.ConfigService();
exports.dataSourceOptions = {
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    database: configService.get('DATABASE_NAME'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASSWORD'),
    entities: ['dist/**/*.entity.{ts,js}'],
    ssl: {
        rejectUnauthorized: false,
    },
    synchronize: true,
    logging: true,
};
//# sourceMappingURL=typeOrm.config.js.map