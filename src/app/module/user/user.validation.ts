import { z } from 'zod';

// Schema for name object
const NameSchema = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }).trim(),
  middleName: z.string().optional(),
  lastName: z.string().min(1, { message: 'Last name is required' }).trim(),
});

// Schema for user object
const createUser = z.object({
  body: z.object({
    user: z.object({
      name: NameSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({ message: 'Gender must be male, female, or other' }),
      }),
      dateOfBirth: z.string().optional(),
      email: z.string().email({ message: 'Invalid email address' }),
      password: z
        .string()
        .max(20, { message: 'Password can not be more than 20 characters' }),
      contactNo: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      address: z.string().min(1, { message: 'Address is required' }),
    }),
  }),
});

export const UserValidation = {
  createUser,
};
