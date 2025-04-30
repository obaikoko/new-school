import asyncHandler from 'express-async-handler';
import {
  authUserSchema,
  insertUserSchema,
  updateUserSchema,
} from '../validators';
import { prisma } from '../config/db/prisma';
import bcrypt from 'bcrypt';
import { ZodError } from 'zod';
import generateToken from '../utils/generateToken';
import { Request, Response } from 'express';
import { User } from '../schemas/userSchema';

// @desc Register new User
// @privacy Private Admin Only
// @route POST /api/users/register
const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const validateData = insertUserSchema.parse(req.body);
      const { firstName, lastName, email, password } = validateData;

      // check if user already exist
      const userExit = await prisma.users.findFirst({
        where: {
          email: email,
        },
      });

      if (userExit) {
        res.status(400);
        throw new Error('User already exist');
      }

      // hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // register new user
      const user = await prisma.users.create({
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
      throw error;
    }
  }
);

// @desc Authenticate User
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = authUserSchema.parse(req.body);

      const user = await prisma.users.findUnique({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error('Invalid Email or Password');
      }

      generateToken(res, user.id);
      res.status(200).json({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      throw error;
    }
  }
);

// @des gets users profile
// @Route GET /api/users
// @privacy Private
const getUserProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: req.user?.id,
        },
      });

      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }
      res.status(200);
      res.json({
        _id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Validation failed',
          errors: error.errors,
        });
        return;
      }

      throw error;
    }
  }
);

// @description This is to authenticate users
// @Route PUT /api/users/
// @privacy Private
const updateUserProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validateData = updateUserSchema.parse(req.body);
    const { firstName, lastName, email, password } = validateData;
    const user = await prisma.users.findFirst({
      where: { id: req.params.id },
    });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Update fields conditionally

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedUserPassword = await prisma.users.update({
        where: { id: user.id },
        data: {
          password: password ? hashedPassword : user.password,
        },
      });
    }

    const updatedUser = await prisma.users.update({
      where: { id: user.id },
      data: {
        firstName: firstName ?? user.firstName,
        lastName: lastName ?? user.lastName,
        email: email ?? user.email,
      },
    });

    res.status(200).json({
      _id: updatedUser.id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    });
  }
);

export { registerUser, authUser, getUserProfile, updateUserProfile };
