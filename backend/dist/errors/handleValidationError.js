"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationError = void 0;
// This function handles validation errors in Mongoose and returns a formatted error response
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((error) => {
        return {
            path: error === null || error === void 0 ? void 0 : error.path,
            message: error === null || error === void 0 ? void 0 : error.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation error',
        errorMessage: errors,
    };
};
exports.handleValidationError = handleValidationError;
