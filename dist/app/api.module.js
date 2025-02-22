"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const exception_filter_1 = require("../core/filters/exception.filter");
const success_response_interceptor_1 = require("../core/interceptor/success-response.interceptor");
const email_module_1 = require("./email/email.module");
let ApiModule = class ApiModule {
};
exports.ApiModule = ApiModule;
exports.ApiModule = ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, user_module_1.UserModule, email_module_1.EmailModule],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: success_response_interceptor_1.SuccessResponseInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: exception_filter_1.ErrorsFilter,
            },
        ],
    })
], ApiModule);
//# sourceMappingURL=api.module.js.map