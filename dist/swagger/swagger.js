"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocument = createDocument;
const swagger_1 = require("@nestjs/swagger");
const swagger_config_1 = require("./swagger.config");
function createDocument(app) {
    const { name, url, email } = swagger_config_1.SWAGGER_CONFIG.contact;
    const builder = new swagger_1.DocumentBuilder()
        .setTitle(swagger_config_1.SWAGGER_CONFIG.title)
        .setDescription(swagger_config_1.SWAGGER_CONFIG.description)
        .setVersion(swagger_config_1.SWAGGER_CONFIG.version)
        .setContact(name, url, email)
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token here',
    }, 'authorization');
    for (const tag of swagger_config_1.SWAGGER_CONFIG.tags) {
        builder.addTag(tag);
    }
    const options = builder.build();
    return swagger_1.SwaggerModule.createDocument(app, options);
}
//# sourceMappingURL=swagger.js.map