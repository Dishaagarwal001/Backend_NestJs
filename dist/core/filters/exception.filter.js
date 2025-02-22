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
exports.ErrorsFilter = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const errors_1 = require("../utils/errors");
let ErrorsFilter = class ErrorsFilter {
    constructor(httpAdapterHost) {
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        common_1.Logger.error(exception.message);
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        if (exception instanceof common_1.HttpException) {
            const message = exception.message;
            const httpStatus = exception.getStatus() || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            const errorMessage = exception.getResponse().message;
            const errorCode = exception.getResponse().code || '60400';
            const errors = Array.isArray(errorMessage)
                ? errorMessage
                : [errorMessage];
            const responseBody = {
                isSuccess: false,
                message,
                errorCode,
                data: null,
                errors,
            };
            httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
        }
        else {
            const responseBody = {
                isSuccess: false,
                message: errors_1.errorMessages.global.internalError.message,
                errorCode: errors_1.errorMessages.global.internalError.code,
                data: null,
                errors: [errors_1.errorMessages.global.internalError.message],
            };
            httpAdapter.reply(ctx.getResponse(), responseBody, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ErrorsFilter = ErrorsFilter;
exports.ErrorsFilter = ErrorsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost])
], ErrorsFilter);
//# sourceMappingURL=exception.filter.js.map