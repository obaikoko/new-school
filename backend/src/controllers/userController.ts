import asyncHandler from 'express-async-handler';
import {
  authUserSchema,
  forgetPasswordSchema,
  insertUserSchema,
  resetPasswordSchema,
  sendSingleMailSchema,
  updateUserSchema,
} from '../validators/usersValidators';
import { prisma } from '../config/db/prisma';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken';
import { Request, Response } from 'express';
import { sendSingleMail } from '../services/emailService';
import crypto from 'crypto';

// @desc Authenticate User
// @route POST /api/users/auth
// @access Public
const authUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = authUserSchema.parse(req.body);

      const user = await prisma.user.findUnique({
        where: { email: email },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          level: true,
          subLevel: true,
          isAdmin: true,
          role: true,
          status: true,
          password: true,
        },
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error('Invalid Email or Password');
      }

      const authenticatedUser = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          level: true,
          subLevel: true,
          isAdmin: true,
          role: true,
          status: true,
          createdAt: true,
        },
      });

      generateToken(res, user.id);
      res.status(200).json(authenticatedUser);
    } catch (error) {
      throw error;
    }
  }
);

const logoutUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
      });

      res.status(200);
      res.json({ message: 'Logged out user' });
    } catch (error) {
      throw error;
    }
  }
);

// @desc Register new User
// @privacy Private Admin Only
// @route POST /api/users/register
const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
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

      // hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // register new user
      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          level: true,
          subLevel: true,
          isAdmin: true,
          role: true,
          status: true,
          createdAt: true,
        },
      });

      res.status(201);
      res.json(user);
    } catch (error) {
      throw error;
    }
  }
);

// @desc gets users profile
// @Route GET /api/users
// @privacy Private
const getUserProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user!.id,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          level: true,
          subLevel: true,
          isAdmin: true,
          role: true,
          status: true,
          createdAt: true,
        },
      });

      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }
      res.status(200);
      res.json(user);
    } catch (error) {
      throw error;
    }
  }
);

// @description This is to authenticate users
// @Route PUT /api/users/:id
// @privacy Private Admin
const updateUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const validateData = updateUserSchema.parse(req.body);
      const {
        userId,
        firstName,
        lastName,
        email,
        password,
        level,
        role,
        status,
        subLevel,
        isAdmin,
      } = validateData;

      const user = await prisma.user.findFirst({
        where: { id: userId },
      });
      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }

      // Update fields conditionally
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.update({
          where: { id: user.id },
          data: {
            password: hashedPassword,
          },
        });
      }

      const updateUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          firstName: firstName ?? user.firstName,
          lastName: lastName ?? user.lastName,
          email: email ?? user.email,
          level: level ?? user.level,
          role: role ?? user.role,
          status: status ?? user.status,
          subLevel: subLevel ?? user.subLevel,
          isAdmin: isAdmin ?? user.isAdmin,
        },
      });
      const updatedUser = await prisma.user.findFirst({
        where: {
          id: updateUser.id,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          level: true,
          subLevel: true,
          isAdmin: true,
          role: true,
          status: true,
          createdAt: true,
        },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      throw error;
    }
  }
);

// @description This is to get all users
// @Route GET /api/users
// @privacy Private ADMIN
const getUsers = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          level: true,
          subLevel: true,
          isAdmin: true,
          role: true,
          status: true,
          createdAt: true,
        },
      });
      res.json(users);
    } catch (error) {
      throw error;
    }
  }
);

// @description This is to get user by ID
// @Route POST /api/users/:id
// @privacy Private ADMIN
const getUserById = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await prisma.user.findFirst({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          level: true,
          subLevel: true,
          isAdmin: true,
          role: true,
          status: true,
          createdAt: true,
        },
        where: {
          id: req.params.id,
        },
      });
      if (!user) {
        res.status(404);
        throw new Error('User not found!');
      }

      res.status(200).json(user);
    } catch (error) {
      throw error;
    }
  }
);

// @description This is to delete a user
// @Route DELETE /api/users/:id
// @privacy Private ADMIN
const deleteUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: req.params.id,
        },
      });

      if (user) {
        if (user.isAdmin) {
          res.status(400);
          throw new Error('Can not delete admin user');
        }
        await prisma.user.delete({
          where: {
            id: user.id,
          },
        });
        res.json({ message: 'User removed' });
      } else {
        res.status(404);
        throw new Error('User not found');
      }
    } catch (error) {
      throw error;
    }
  }
);

// @desc Send mail to single parent/sponsor
// @route POST /users/mails
// @privacy Private Admin
const sendMail = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const validateData = sendSingleMailSchema.parse(req.body);
      const { email, subject, text } = validateData;

      const user = req.user;
      if (!user) {
        res.status(401);
        throw new Error('Unauthorized!');
      }

      if (!user.isAdmin) {
        res.status(401);
        throw new Error('Unauthorized Contact the adminitration');
      }

      sendSingleMail({ email, subject, text });
      res.status(200);
      res.json('Email sent successfully');
    } catch (error) {
      throw error;
    }
  }
);

// @desc Send reset password link
// @route POST api/users/forget-password
// @privacy Public
const forgetPassword = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validateData = forgetPasswordSchema.parse(req.body);
    const { email } = validateData;
    try {
      if (!email) {
        res.status(400);
        throw new Error('Email Required');
      }

      // Find user by email
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });
      if (!user) {
        res.status(404);
        throw new Error('User not found');
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');

      // Hash the reset token before saving to the database
      const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      const newDate = new Date(Date.now() + 60 * 60 * 1000);
      const updateUser = await prisma.user.update({
        where: { email: email },
        data: {
          resetPasswordToken: hashedToken,
          resetPasswordExpires: newDate,
        },
      });

      // Create reset URL to send in email
      const resetUrl = `${process.env.PUBLIC_DOMAIN}/reset-password?token=${resetToken}`;

      // Send the email
      sendSingleMail({
        email,
        subject: 'Password Reset',
        text: `You requested a password reset. Please go to this link to reset your password: ${resetUrl}`,
      });

      res.status(200);
      res.json('Password reset link has been sent to your email');
    } catch (error) {
      throw error;
    }
  }
);

// @desc Reset password
// @route PUT api/users/reset-password
// @privacy Public
const resetPassword = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.query;
      if (!token || typeof token !== 'string') {
        res.status(400).json({ message: 'No token provided' });
        return;
      }

      const { password } = resetPasswordSchema.parse(req.body);

      const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const user = await prisma.user.findFirst({
        where: {
          resetPasswordToken: hashedToken,
          resetPasswordExpires: {
            gt: new Date(),
          },
        },
      });

      if (!user) {
        res.status(400).json({ message: 'Invalid or expired reset token' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        },
      });

      await sendSingleMail({
        email: user.email,
        subject: `Password Reset Successful`,
        text: `You have successfully reset your password. </br> NOTE: If you did not initiate this process, please change your password or contact the admin immediately.`,
      });

      res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
      throw error;
    }
  }
);

export {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile,
  updateUser,
  getUsers,
  getUserById,
  deleteUser,
  sendMail,
  forgetPassword,
  resetPassword,
};
