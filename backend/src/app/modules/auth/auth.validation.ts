import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.enum(['user', 'admin'], {
      required_error: 'role is required',
    }),
    name: z.string({
      required_error: 'name is required',
    }),
    phone: z.string({
      required_error: 'phone number is required',
    }),
  }),
});

const loginUserZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refreshToken is required',
    }),
  }),
});

export const authValidation = {
  createUserZodSchema,
  loginUserZodSchema,
  refreshTokenZodSchema,
};
