import { z } from 'zod';
import {
  addSubjectSchema,
  generatePositionSchema,
  generateResultSchema,
  removeSubjectSchema,
  updateSubjectScoreSchema,
} from '@/validators/resultValidator';
export type GenerateResultForm = z.infer<typeof generateResultSchema>;
export type GeneratePositionForm = z.infer<typeof generatePositionSchema>;
export type UpdateSubjectScoreSchema = z.infer<typeof updateSubjectScoreSchema>;
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
  otherName: string;
  image: string;
  level: string;
  subLevel: string;
  term: string;
  session: string;
  position: string;
  totalScore: number;
  averageScore: number;
  numberInClass: number | null;
  teacherRemark: string;
  principalRemark: string;
  isPaid: boolean;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  subjectResults: SubjectResult[];
  affectiveAssessment: AffectiveAssessment[];
  psychomotor: Psychomotor[];
}
export type AddSubjectForm = z.infer<typeof addSubjectSchema>;
export type RemoveSubjectForm = z.infer<typeof removeSubjectSchema>;
