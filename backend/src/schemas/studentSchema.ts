import { insertStudentSchema } from '../validators/studentValidators';
import { z } from 'zod';
export type Student = z.infer<typeof insertStudentSchema> & {
  studentId: string;
  password: string;
  isStudent: boolean;
  isPaid: boolean;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
