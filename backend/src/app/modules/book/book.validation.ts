import { z } from 'zod';

const createBookZodValidation = z.object({
  body: z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    publication_date: z.string(),
    publication_year: z.string(),
    image: z.string(),
  }),
});

const updateBookZodValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publication_date: z.string().optional(),
    image: z.string().optional(),
    reviews: z
      .array(
        z.object({
          userName: z.string(),
          review: z.string(),
          userEmail: z.string(),
        })
      )
      .optional(),
  }),
});

export const BookValidation = {
  createBookZodValidation,
  updateBookZodValidation,
};
