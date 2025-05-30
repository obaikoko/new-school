import { z } from 'zod';
import {
  insertUserSchema,
  sendSingleMailSchema,
  sendBulkMailSchema,
} from '../validators/usersValidators';

export type User = z.infer<typeof insertUserSchema> & {
  id: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};


export type SendSingleMailProps = z.infer<typeof sendSingleMailSchema>;
export type SendBulkMailProps = z.infer<typeof sendBulkMailSchema>;
