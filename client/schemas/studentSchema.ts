import { z } from 'zod';
import {
  studentSchema,
  authStudentSchema,
  registerStudentSchema,
  searchSchema,
} from '@/validators/studentValidation';

export type AuthStudentForm = z.infer<typeof authStudentSchema>;
export type RegisterStudentForm = z.infer<typeof registerStudentSchema>;
export type Student = z.infer<typeof studentSchema>;
export type SearchForm = z.infer<typeof searchSchema>;

