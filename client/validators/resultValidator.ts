import { z } from 'zod';

export const generateResultSchema = z.object({
  session: z.string().min(3, 'session must have at least 3 characters'),
  term: z.string().min(3, 'term must have at least minimum of 3 characters'),
  level: z.string().min(3, 'level must have at least 3 characters'),
});

export const generatePositionSchema = z.object({
  session: z.string().min(3, 'session must have at least 3 characters'),
  term: z.string().min(3, 'term must have at least minimum of 3 characters'),
  level: z.string().min(3, 'level must have at least 3 characters'),
  subLevel: z.string().min(1, 'subLevel must have at least 1 character'),
});

export const updateSubjectScoreSchema = z.object({
  test: z
    .number({ invalid_type_error: 'Test score must be a number' })
    .min(0, 'Test score cannot be less than 0')
    .max(30, 'Test score cannot be more than 30'),
  exam: z
    .number({ invalid_type_error: 'Exam score must be a number' })
    .min(0, 'Exam score cannot be less than 0')
    .max(70, 'Exam score cannot be more than 70'),
  subject: z.string().min(1, 'Please select a subject'),
});

export const addSubjectSchema = z.object({
  session: z.string().min(3, 'Session is required'),
  term: z.string().min(3, 'Term is required'),
  level: z.string().min(3, 'Level is required'),
  subjectName: z.string().min(2, 'Subject name is required'),
});
export const removeSubjectSchema = z.object({
  session: z.string().min(3, 'Session is required'),
  term: z.string().min(3, 'Term is required'),
  level: z.string().min(3, 'Level is required'),
  subjectName: z.string().min(2, 'Subject name is required'),
});
