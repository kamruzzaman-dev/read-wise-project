"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        role: zod_1.z.enum(['user', 'admin']).optional(),
        name: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
    }),
});
exports.userValidation = {
    updateUserZodSchema,
};
