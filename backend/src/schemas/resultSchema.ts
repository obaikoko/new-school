import {
  updateResultPaymentSchema,
  updateResultSchema,
} from '../validators/resultValidator';
import { z } from 'zod';

export type UpdateResult = z.infer<typeof updateResultSchema>;
export type UpdateResultPayment = z.infer<typeof updateResultPaymentSchema>;

export interface SubjectResult {
  subject: string;
  testScore: number;
  examScore: number;
  totalScore: number;
  grade: string;
}

export interface AffectiveAssessment {
  aCategory: string;
  grade: string;
}

export interface Psychomotor {
  pCategory: string;
  grade: string;
}

export interface StudentResult {
  id: string;
  userId: string;
  studentId: string;
  firstName: string;
  lastName: string;
  otherName: string | null;
  image: string | null;
  level: string;
  subLevel: string;
  term: string;
  session: string;
  position: string | null;
  totalScore: number | null;
  averageScore: number | null;
  numberInClass: number | null;
  teacherRemark: string | null;
  principalRemark: string | null;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
  subjectResults: SubjectResult[];
  affectiveAssessment: AffectiveAssessment[];
  psychomotor: Psychomotor[];
}
