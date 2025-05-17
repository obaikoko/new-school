import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // ✅ Handle Zod validation errors
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.reduce((acc, curr) => {
      const path = curr.path.join('.');
      acc[path] = curr.message;
      return acc;
    }, {} as Record<string, string>);

    res.status(400).json({
      message: 'Validation failed',
      errors: formattedErrors,
    });
    return;
  }

  // ✅ Mongoose bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // ✅ Default fallback
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
