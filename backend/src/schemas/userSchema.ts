import { z } from 'zod';
import {
  insertUserSchema,
  insertStudentSchema,
  sendSingleMailSchema,
  sendBulkMailSchema,
} from '../validators';

export type User = z.infer<typeof insertUserSchema> & {
  id: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

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

export type SendSingleMailProps = z.infer<typeof sendSingleMailSchema>;
export type SendBulkMailProps = z.infer<typeof sendBulkMailSchema>;
