import { z } from 'zod';

const wishlistZodSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: 'user id is required',
    }),
    email: z.string({
      required_error: 'email is required',
    }),
    bookId: z.object({
      title: z.string(),
      author: z.string(),
      genre: z.string(),
      publication_date: z.string(),
      publication_year: z.string(),
      image: z.string(),
    }),
  }),
});

const finishedReadingZodSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    finished: z.boolean().optional(),
  }),
});

export const wishlistValidation = {
  wishlistZodSchema,
  finishedReadingZodSchema,
};
