import { z } from 'zod';
import { authStudentResponseSchema, authStudentSchema, registerStudentSchema } from '@/validators/studentValidation';

export type AuthStudentForm = z.infer<typeof authStudentSchema>;
export type RegisterStudentForm = z.infer<typeof registerStudentSchema>
export type authStudentResponseSchema = z.infer<typeof authStudentResponseSchema>;

