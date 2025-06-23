import { z } from 'zod';
export const registerStudentSchema = z.object({
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
  sponsorPhoneNumber: z
    .string()
    .regex(/^\d{10,15}$/, 'Invalid phone number')
    .optional()
    .nullable(),
  sponsorEmail: z.string().email('Invalid email address').optional().nullable(),
});

export const editStudentSchema = z.object({
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
  sponsorPhoneNumber: z
    .string()
    .regex(/^\d{10,15}$/, 'Invalid phone number')
    .optional()
    .nullable(),
  sponsorEmail: z.string().email('Invalid email address').optional().nullable(),
});

export const authStudentSchema = z.object({
  studentId: z.string().min(3, 'StudentId must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const studentSchema = z.object({
  id: z.string(),
  studentId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  otherName: z.string().nullable(),
  dateOfBirth: z.string().datetime(), // ISO string (can adjust if you're transforming it)
  level: z.string(),
  subLevel: z.string(),
  isStudent: z.boolean(),
  isPaid: z.boolean(),
  gender: z.string(),
  yearAdmitted: z.string().datetime(), // Also an ISO date string
  stateOfOrigin: z.string(),
  localGvt: z.string(),
  homeTown: z.string(),
  sponsorEmail: z.string().email(),
  sponsorName: z.string().nullable(),
  sponsorPhoneNumber: z.string().nullable(),
  sponsorRelationship: z.string().nullable(),
  imageUrl: z.string().nullable(),
});

export const searchSchema = z.object({
  name: z.string().optional().nullable(),
  level: z.string(),
});
export const forgetPasswordSchema = z.object({
  studentId: z.string().min(3, 'StudentId should be at least 3 characters'),
});
export const studentIdSchema = z.object({
  studentId: z.string().min(3, 'StudentId should be at least 3 characters'),
});

export const nextTermDetailsSchema = z.object({
  nextTermFee: z.coerce.number().min(-1, 'Amount cannot be less than 0'),
  session: z.string().min(1, 'Session cannot be empty'),
  term: z.string().min(3, 'Term cannot be empty'),
  level: z.string().min(3, 'Level/Class cannot be empty'),
  reOpeningDate: z.string().min(3, ' Re-opening date cannot be empty '),
  busFee: z.coerce.number().min(-1, 'Bus fee cannot be less than 0').optional(),
  otherCharges: z.string().optional(),
});


