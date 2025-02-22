"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config({ path: process.cwd() + '/core/env/.env.dev' });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
const swagger_2 = require("./swagger/swagger");
const config_1 = require("@nestjs/config");
const LISTEN_PORT = 3000;
async function bootstrap() {
    const opts = {};
    const app = await core_1.NestFactory.create(app_module_1.AppModule, opts);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT') || LISTEN_PORT;
    app.disable('x-powered-by');
    app.enableCors();
    app.use((0, helmet_1.default)());
    app.use(helmet_1.default.noSniff());
    app.use(helmet_1.default.hidePoweredBy());
    app.use(helmet_1.default.contentSecurityPolicy());
    swagger_1.SwaggerModule.setup('api-docs', app, (0, swagger_2.createDocument)(app));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map