import { z } from 'zod';
import { UserStatus } from './user.constant';

// Schema for name object
const NameSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }).trim(),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is required' }).trim(),
});

const UpdateNameSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .trim()
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .trim()
    .optional(),
});

// Schema for user object
const createUser = z.object({
  body: z.object({
    user: z.object({
      name: NameSchema,
      email: z.string().email({ message: 'Invalid email address' }),
      password: z
        .string()
        .max(20, { message: 'Password can not be more than 20 characters' }),
    }),
  }),
});

const updateUser = z.object({
  body: z.object({
    user: z.object({
      name: UpdateNameSchema.optional(),
      email: z.string().email({ message: 'Invalid email address' }).optional(),
      image: z.string().optional(),
    }),
  }),
});

const changeStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const UserValidation = {
  createUser,
  updateUser,
  changeStatusValidationSchema,
};
