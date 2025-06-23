import { z } from 'zod';
import {
  studentSchema,
  authStudentSchema,
  registerStudentSchema,
  searchSchema,
  forgetPasswordSchema,
  editStudentSchema,
  studentIdSchema,
  nextTermDetailsSchema,
} from '@/validators/studentValidation';

export type AuthStudentForm = z.infer<typeof authStudentSchema>;
export type RegisterStudentForm = z.infer<typeof registerStudentSchema>;
export type EditStudentForm = z.infer<typeof editStudentSchema> & {
  studentId: string;
};
export type Student = z.infer<typeof studentSchema> & {
  createdAt: string;
  updatedAt: string;
};
export type Students = {
  students: Student[];
  page: number;
  totalPages: number;
};
export type SearchForm = z.infer<typeof searchSchema>;
export type ForgetPassword = z.infer<typeof forgetPasswordSchema>;
export type StudentId = z.infer<typeof studentIdSchema>;
export type NextTermDetailsForm = z.infer<typeof nextTermDetailsSchema>;

export type StudentFormData = {
  studentId?: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  gender: string;
  dateOfBirth: string;
  level: string;
  subLevel: string;
  stateOfOrigin: string;
  localGvt: string;
  homeTown: string;
  isPaid: boolean;
  isStudent: boolean;
  sponsorName: string;
  sponsorEmail: string;
  sponsorPhoneNumber: string;
  sponsorRelationship: string;
  yearAdmitted: string;
};
