import { User, Student, Result } from '@prisma/client'; // or from your model types

declare global {
  namespace Express {
    interface Request {
      user?: User;
      student?: Student;
      result?: Result;
    }
  }
}
