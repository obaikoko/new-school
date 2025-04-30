import { z } from 'zod';

export const insertUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(3, 'First name must be at least 3 letters'),
  lastName: z.string().min(3, 'Last name must be at least 3 letters'),
  level: z.string().optional().nullable(),
  subLevel: z.string().optional().nullable(),
  password: z.string().min(6, 'password must be at least 6 characters'),
});

export const authUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'password must be at least 6 characters'),
});
export const updateUserSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});

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
  homeTown: z.string().min(1, 'Hometown is required'),
  sponsorName: z.string().optional().nullable(),
  sponsorRelationship: z.string().optional().nullable(),
  sponsorPhoneNumber: z.string().optional().nullable(),
  sponsorEmail: z.string().email('Invalid email address').optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  imagePublicId: z.string().optional().nullable(),
});
