"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../guards/auth.guard");
const permissions_guard_1 = require("../guards/permissions.guard");
function Auth(...permissions) {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)('permissions', permissions), (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permissions_guard_1.PermissionsGuard));
}
//# sourceMappingURL=auth.decorator.js.map