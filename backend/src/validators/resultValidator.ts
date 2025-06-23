import { boolean, z } from 'zod';

export const createResultSchema = z.object({
  session: z.string().min(3, 'session cannot be less than 3 characters'),
  level: z.string().min(3, 'level cannot be less than 3 characters'),
  term: z.string().min(3, 'term cannot be less than 3 characters'),
});

export const updateResultSchema = z.object({
  subject: z.string().optional(),
  test: z.coerce
    .number()
    .max(30, 'test score cannot be more than 30')
    .optional()
    .nullable(),
  exam: z.coerce
    .number()
    .max(70, 'exam score cannot be more than 30')
    .optional()
    .nullable(),
  grade: z.string().optional(),

  affectiveAssessments: z
    .array(
      z.object({
        aCategory: z.string(),
        grade: z.string(),
      })
    )
    .optional(),

  psychomotorAssessments: z
    .array(
      z.object({
        pCategory: z.string(),
        grade: z.string(),
      })
    )
    .optional(),

  teacherRemark: z.string().optional(),
  principalRemark: z.string().optional(),
});

export const updateResultPaymentSchema = z.object({
  resultId: z.string().min(5, 'ResultID should be at least 5 characters'),
  resultFee: boolean(),
});

export const generatePositionsSchema = z.object({
  level: z.string().min(3, 'level should be at least 3 characters'),
  subLevel: z.string().min(1, 'sub level should be at least 1 character'),
  session: z.string().min(3, 'level should be at least 3 characters'),
  term: z.string().min(3, 'level should be at least 3 characters'),
});
export const subjectResultSchema = z.object({
  level: z.string().min(3, 'level should be at least 3 characters'),
  subjectName: z.string().min(3, 'subject should be at least 3 characters'),
  session: z.string().min(3, 'level should be at least 3 characters'),
  term: z.string().min(3, 'level should be at least 3 characters'),
});
 