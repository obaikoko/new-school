import asyncHandler from 'express-async-handler';
import { insertUserSchema } from '../validators';
import { prisma } from '../db/prisma';
import bcrypt from 'bcrypt';
import Zod from 'zod';
const registerUser = asyncHandler(async (req, res) => {
  try {
    const validateData = insertUserSchema.parse(req.body);
    const { firstName, lastName, email, password } = validateData;

    // check if user already exist
    const userExit = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userExit) {
      res.status(400);
      throw new Error('User already exist');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // register new user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    res.status(201);
    res.json({
      message: 'User registered successfully',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof Zod.ZodError) {
      res.status(400).json({
        message: 'Validation failed',
        errors: error.errors,
      });
    } 
    else {
      throw error;
    }
  }
});

export { registerUser };
