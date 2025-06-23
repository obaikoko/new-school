import { z } from 'zod';

export const insertStudentSchema = z.object({
  firstName: z.string().min(3, 'First name must be at least 3 letters'),
  lastName: z.string().min(3, 'Last name must be at least 3 letters'),
  otherName: z.string().optional().nullable(),
  dateOfBirth: z.coerce.date({ message: 'Invalid date of birth' }),
  level: z.string().min(1, 'Student level cannot be empty'),
  subLevel: z.string().min(1, 'Sub level category cannot be empty'),
  gender: z.string().min(1, 'Gender is required'),
  yearAdmitted: z.coerce.date({ message: 'Invalid admission year' }),
  stateOfOrigin: z.string().min(1, 'State of origin is required'),
  localGvt: z.string().min(1, 'Local government is required'),
  homeTown: z.string().min(1, 'Hometown is required').optional().nullable(),
  sponsorName: z.string().optional().nullable(),
  sponsorRelationship: z.string().optional().nullable(),
  sponsorPhoneNumber: z.string().optional().nullable(),
  sponsorEmail: z.string().email('Invalid email address').optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  imagePublicId: z.string().optional().nullable(),
});

export const forgetStudentPasswordSchema = z.object({
  studentId: z.string().min(3, 'StudentID is required!'),
});

export const updateStudentSchema = z.object({
  firstName: z
    .string()
    .min(3, 'First name must be at least 3 letters')
    .optional()
    .nullable(),
  lastName: z
    .string()
    .min(3, 'Last name must be at least 3 letters')
    .optional()
    .nullable(),
  otherName: z.string().optional().nullable(),
  dateOfBirth: z.coerce
    .date({ message: 'Invalid date of birth' })
    .optional()
    .nullable(),
  level: z
    .string()
    .min(1, 'Student level cannot be empty')
    .optional()
    .nullable(),
  subLevel: z
    .string()
    .min(1, 'Sub level category cannot be empty')
    .optional()
    .nullable(),
  gender: z.string().min(1, 'Gender is required').optional().nullable(),
  yearAdmitted: z.coerce
    .date({ message: 'Invalid admission year' })
    .optional()
    .nullable(),
  stateOfOrigin: z
    .string()
    .min(1, 'State of origin is required')
    .optional()
    .nullable(),
  localGvt: z
    .string()
    .min(1, 'Local government is required')
    .optional()
    .nullable(),
  homeTown: z.string().min(1, 'Hometown is required').optional().nullable(),
  sponsorName: z.string().optional().nullable(),
  sponsorRelationship: z.string().optional().nullable(),
  sponsorPhoneNumber: z.string().optional().nullable(),
  sponsorEmail: z.string().email('Invalid email address').optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  imagePublicId: z.string().optional().nullable(),
});

export const authStudentSchema = z.object({
  studentId: z.string().min(3, 'StudentId must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const nextTermDetailsSchema = z.object({
  nextTermFee: z.coerce.number().min(-1, 'Amount cannot be less than 0'),
  session: z.string().min(1, 'Session cannot be empty'),
  term: z.string().min(3, 'Term cannot be empty'),
  level: z.string().min(3, 'Level/Class cannot be empty'),
  reOpeningDate: z.string().min(3, ' Re-opening date cannot be empty '),
  busFee: z.coerce.number().min(-1, 'Bus fee cannot be less than 0').optional(),
  otherCharges: z.coerce.number().optional(),
});

export const getNextTermDetailsSchema = z.object({
  session: z.string().min(3, 'Session should be more than 3 characters'),
  term: z.string().min(3, 'term should be more than 3 characters'),
  level: z.string().min(3, 'level should be more than 3 characters'),
});
