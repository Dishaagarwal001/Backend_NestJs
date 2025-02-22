"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConflictException = void 0;
const common_1 = require("@nestjs/common");
class UserConflictException extends common_1.HttpException {
    constructor() {
        super('CONFLICT', common_1.HttpStatus.CONFLICT);
    }
}
exports.UserConflictException = UserConflictException;
//# sourceMappingURL=user.conflict.exception.js.map