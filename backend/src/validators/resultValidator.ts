import { z } from 'zod';

export const createResultSchema = z.object({
  session: z.string().min(3, 'session cannot be less than 3 characters'),
  level: z.string().min(3, 'level cannot be less than 3 characters'),
  term: z.string().min(3, 'term cannot be less than 3 characters'),
});
