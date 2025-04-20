import { z } from 'zod';
import { insertUserSchema } from '../validators';

export type User = z.infer<typeof insertUserSchema> & {
  id: string;
  resetPasswordToken: string;
  resetPasswordExpires: string;
  isAdmin: string;
  createdAt: string;
  updatedAt: string;
};
