import { z } from 'zod';

export const registerStaffSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  otherName: z.string().optional(),
  dateOfBirth: z.coerce.date(),
  qualification: z.string(),
  category: z.string(),
  role: z.string(),
  gender: z.string(),
  maritalStatus: z.string(),
  yearAdmitted: z.coerce.date(),
  stateOfOrigin: z.string(),
  localGvt: z.string(),
  homeTown: z.string(),
  residence: z.string(),
  phone: z.string(),
  email: z.string().email(),
  imageUrl: z.string().optional(),
  imagePublicId: z.string().optional(),
});


export const staffSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  otherName: z.string().optional(),
  dateOfBirth: z.string(),
  qualification: z.string().optional(),
  category: z.string().optional(),
  role: z.string().optional(),
  gender: z.string(),
  maritalStatus: z.string().optional(),
  yearAdmitted: z.date().optional(),
  stateOfOrigin: z.string().optional(),
  localGvt: z.string().optional(),
  homeTown: z.string().optional(),
  residence: z.string().optional(),
  phone: z.string(),
  email: z.string().email(),
  image: z.string().optional(), // base64 or URL
});

export type RegisterStaffInput = z.infer<typeof registerStaffSchema>;
