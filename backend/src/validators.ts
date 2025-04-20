import { z } from 'zod';

export const insertUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(3, 'First name must be at least 3 letters'),
  lastName: z.string().min(3, 'Last name must be at least 3 letters'),
  level: z.string().optional().nullable(),
  subLevel: z.string().optional().nullable(),
  password: z.string(),
});
