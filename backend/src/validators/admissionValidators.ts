import { z } from 'zod';

export const admissionSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  childName: z.string().min(1),
  dateOfBirth: z.string().transform((val) => new Date(val)),
  gender: z.string(),
  level: z.string(),
});

export type AdmissionInput = z.infer<typeof admissionSchema>;
