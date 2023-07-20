"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function to handle Zod validation errors
const handleZodError = (error) => {
    var _a;
    // Extract the individual issues from the ZodError
    const errors = (_a = error === null || error === void 0 ? void 0 : error.issues) === null || _a === void 0 ? void 0 : _a.map((issue) => {
        var _a;
        return {
            // Extract the last property in the path array as the path
            path: issue === null || issue === void 0 ? void 0 : issue.path[((_a = issue === null || issue === void 0 ? void 0 : issue.path) === null || _a === void 0 ? void 0 : _a.length) - 1],
            // Extract the error message
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        // Set the response status code
        statusCode,
        // Set the generic message for the error
        message: 'Zod Validation Error',
        // Set the detailed error messages
        errorMessage: errors,
    };
};
exports.default = handleZodError;
