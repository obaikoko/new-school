import jwt, { JwtPayload } from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db/prisma';

interface DecodedToken extends JwtPayload {
  userId: string;
}

const protect = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies?.jwt;

    if (!token) {
      res.status(401);
      throw new Error('Not Authorized! No Token');
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as DecodedToken;

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      const student = await prisma.student.findUnique({
        where: { id: decoded.userId },
      });

      if (user) req.user = user;
      if (student) req.student = student;

      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not Authorized! Invalid Token');
    }
  }
);

const admin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not Authorized!!! Contact the Admin');
  }
};

export { protect, admin };
