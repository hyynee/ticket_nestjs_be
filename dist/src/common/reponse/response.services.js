"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseService = void 0;
const common_1 = require("@nestjs/common");
let ResponseService = class ResponseService {
    success(data, message = 'Success', statusCode = common_1.HttpStatus.OK) {
        return {
            success: true,
            statusCode,
            message,
            data,
            timestamp: new Date().toISOString(),
        };
    }
    successWithoutData(message = 'Success', statusCode = common_1.HttpStatus.OK) {
        return {
            success: true,
            statusCode,
            message,
            timestamp: new Date().toISOString(),
        };
    }
    successWithPagination(data, page, limit, total, message = 'Success') {
        const totalPages = Math.ceil(total / limit);
        return {
            success: true,
            statusCode: common_1.HttpStatus.OK,
            message,
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages,
            },
            timestamp: new Date().toISOString(),
        };
    }
    error(message, statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR, errorCode, errors, details) {
        return {
            success: false,
            statusCode,
            message,
            errorCode,
            errors,
            details,
            timestamp: new Date().toISOString(),
        };
    }
    validationError(errors, message = 'Validation failed') {
        return this.error(message, common_1.HttpStatus.BAD_REQUEST, 'VALIDATION_ERROR', errors);
    }
    unauthorized(message = 'Unauthorized', errorCode) {
        return this.error(message, common_1.HttpStatus.UNAUTHORIZED, errorCode || 'UNAUTHORIZED');
    }
    forbidden(message = 'Forbidden', errorCode) {
        return this.error(message, common_1.HttpStatus.FORBIDDEN, errorCode || 'FORBIDDEN');
    }
    notFound(message = 'Not found', errorCode) {
        return this.error(message, common_1.HttpStatus.NOT_FOUND, errorCode || 'NOT_FOUND');
    }
    conflict(message = 'Conflict', errorCode) {
        return this.error(message, common_1.HttpStatus.CONFLICT, errorCode || 'CONFLICT');
    }
};
exports.ResponseService = ResponseService;
exports.ResponseService = ResponseService = __decorate([
    (0, common_1.Injectable)()
], ResponseService);
//# sourceMappingURL=response.services.js.map