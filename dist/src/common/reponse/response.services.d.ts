import { ApiResponse, ErrorResponse, PaginatedResponse } from './response.interface';
export declare class ResponseService {
    success<T>(data: T, message?: string, statusCode?: number): ApiResponse<T>;
    successWithoutData(message?: string, statusCode?: number): ApiResponse;
    successWithPagination<T>(data: T[], page: number, limit: number, total: number, message?: string): PaginatedResponse<T>;
    error(message: string, statusCode?: number, errorCode?: string, errors?: string[], details?: any): ErrorResponse;
    validationError(errors: string[], message?: string): ErrorResponse;
    unauthorized(message?: string, errorCode?: string): ErrorResponse;
    forbidden(message?: string, errorCode?: string): ErrorResponse;
    notFound(message?: string, errorCode?: string): ErrorResponse;
    conflict(message?: string, errorCode?: string): ErrorResponse;
}
