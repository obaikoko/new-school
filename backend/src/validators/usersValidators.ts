import { z } from 'zod';

export const insertUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(3, 'First name must be at least 3 letters'),
  lastName: z.string().min(3, 'Last name must be at least 3 letters'),
  level: z.string().optional().nullable(),
  subLevel: z.string().optional().nullable(),
  password: z.string().min(6, 'password must be at least 6 characters'),
});

export const authUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'password must be at least 6 characters'),
});
export const updateUserSchema = z.object({
  userId: z.string().min(3, 'UserId required'),
  firstName: z
    .string()
    .min(3, 'First name must be at least 3 letters')
    .optional(),
  lastName: z
    .string()
    .min(3, 'Last name must be at least 3 letters')
    .optional(),
  email: z.string().email('Add a valide email address').optional(),
  password: z
    .string()
    .min(6, 'password must be at least 6 characters')
    .optional(),
  level: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
  subLevel: z.string().optional(),
  isAdmin: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
});

export const sendSingleMailSchema = z.object({
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  text: z.string().min(1, 'Email body text is required'),
});

export const sendBulkMailSchema = z.object({
  emails: z.array(z.string()),
  subject: z.string().min(1, 'Subject is required'),
  text: z.string().min(1, 'Email body text is required'),
});

export const forgetPasswordSchema = z.object({
  email: z.string().email('Add a valid email address'),
});
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]/, 'Password must include at least one uppercase letter')
    .regex(/[a-z]/, 'Password must include at least one lowercase letter')
    .regex(/[0-9]/, 'Password must include at least one number')
    .regex(/[\W_]/, 'Password must include at least one special character'),
});
