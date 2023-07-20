"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readSoonListValidation = void 0;
const zod_1 = require("zod");
const ReadSoonListZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string({
            required_error: 'user id is required',
        }),
        email: zod_1.z.string({
            required_error: 'email is required',
        }),
        bookId: zod_1.z.object({
            title: zod_1.z.string(),
            author: zod_1.z.string(),
            genre: zod_1.z.string(),
            publication_date: zod_1.z.string(),
            publication_year: zod_1.z.string(),
            image: zod_1.z.string(),
        }),
    }),
});
const finishedReadingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.string().optional(),
        finished: zod_1.z.boolean().optional(),
    }),
});
exports.readSoonListValidation = {
    ReadSoonListZodSchema,
    finishedReadingZodSchema,
};
