"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvPath = getEnvPath;
exports.determineEnvFilePath = determineEnvFilePath;
const fs_1 = require("fs");
const path_1 = require("path");
function getEnvPath(dest) {
    const env = process.env.NODE_ENV;
    const fallback = (0, path_1.resolve)(`${dest}/.env`);
    const filename = env ? `${env}.env` : 'development.env';
    let filePath = (0, path_1.resolve)(`${dest}/${filename}`);
    if (!(0, fs_1.existsSync)(filePath)) {
        filePath = fallback;
    }
    return filePath;
}
function determineEnvFilePath() {
    const envPath = process.env.ENV_PATH;
    if (envPath) {
        console.log(`Using custom environment file path: ${envPath}`);
        return envPath;
    }
    const env = process.env.NODE_ENV || 'development';
    switch (env) {
        case 'production':
            return 'env/.env.prod';
        case 'test':
            return 'env/.env.test';
        default:
            return 'env/.env.dev';
    }
}
//# sourceMappingURL=env.helper.js.map