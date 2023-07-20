"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValidation = void 0;
const zod_1 = require("zod");
const createBookZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        author: zod_1.z.string(),
        genre: zod_1.z.string(),
        publication_date: zod_1.z.string(),
        publication_year: zod_1.z.string(),
        image: zod_1.z.string(),
    }),
});
const updateBookZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        author: zod_1.z.string().optional(),
        genre: zod_1.z.string().optional(),
        publication_date: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        reviews: zod_1.z
            .array(zod_1.z.object({
            userName: zod_1.z.string(),
            review: zod_1.z.string(),
            userEmail: zod_1.z.string(),
        }))
            .optional(),
    }),
});
exports.BookValidation = {
    createBookZodValidation,
    updateBookZodValidation,
};
