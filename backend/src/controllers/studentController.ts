// src/controllers/studentController.ts
import { Parser } from 'json2csv';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import {
  authStudentSchema,
  forgetStudentPasswordSchema,
  insertStudentSchema,
  updateStudentSchema,
} from '../validators/studentValidators';
import { prisma } from '../config/db/prisma'; // update with actual prisma instance path
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken';
import { generateStudentPdf } from '../utils/generateStudentPdf';
import { generateStudentResultHTML } from '../utils/generateStudentResult';
import { sendSingleMail } from '../services/emailService';
import crypto from 'crypto';
import { resetPasswordSchema } from '../validators/usersValidators';
import { classCodeMapping, classProgression } from '../utils/classUtils';

// Authenticate Student
// @route POST api/student/auth
// privacy Public
const authStudent = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = authStudentSchema.parse(req.body);

      const { studentId, password } = validatedData;

      const student = await prisma.students.findFirst({
        where: {
          studentId,
        },
        select: {
          id: true,
          studentId: true,
          firstName: true,
          lastName: true,
          otherName: true,
          password: true,
        },
      });
      if (!student) {
        res.status(400);
        throw new Error('Student does not exist');
      }

      if (!student || !(await bcrypt.compare(password, student.password))) {
        res.status(401);
        throw new Error('Invalid Email or Password');
      }

      const authenticatedStudent = await prisma.students.findFirst({
        where: {
          studentId,
        },
        select: {
          id: true,
          studentId: true,
          firstName: true,
          lastName: true,
          otherName: true,
          dateOfBirth: true,
          level: true,
          subLevel: true,
          isStudent: true,
          isPaid: true,
          gender: true,
          yearAdmitted: true,
          stateOfOrigin: true,
          localGvt: true,
          homeTown: true,
          sponsorEmail: true,
          sponsorName: true,
          sponsorPhoneNumber: true,
          sponsorRelationship: true,
          imageUrl: true,
          createdAt: true,
        },
      });

      res.status(200);
      generateToken(res, student.id);
      res.json(authenticatedStudent);
    } catch (error) {
      throw error;
    }
  }
);

// ADD  STUDENT
// @route POST api/students/
// @privacy Private ADMIN
const registerStudent = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const validatedData = insertStudentSchema.parse(req.body);

      const {
        firstName,
        lastName,
        otherName,
        dateOfBirth,
        level,
        subLevel,
        gender,
        yearAdmitted,
        stateOfOrigin,
        localGvt,
        homeTown,
        sponsorName,
        sponsorRelationship,
        sponsorPhoneNumber,
        sponsorEmail,
      } = validatedData;

      // Check if student already exists
      const existingStudent = await prisma.students.findFirst({
        where: {
          firstName: { equals: firstName, mode: 'insensitive' },
          lastName: { equals: lastName, mode: 'insensitive' },
          dateOfBirth: { equals: dateOfBirth },
        },
      });

      if (existingStudent) {
        res.status(400);
        throw new Error('Student already exists');
      }

      // Class level to code mapping

      const currentYear = new Date().getFullYear();
      const classCode = classCodeMapping[level];

      const count = await prisma.students.count({
        where: { level },
      });

      const studentId = `BDIS/${currentYear}/${classCode}/${(count + 1)
        .toString()
        .padStart(3, '0')}`;

      const hashedPassword = await bcrypt.hash(
        process.env.DEFAULTPASSWORD as string,
        10
      );

      const student = await prisma.students.create({
        data: {
          userId: req.user?.id,
          firstName,
          lastName,
          otherName,
          dateOfBirth,
          level,
          subLevel,
          gender,
          yearAdmitted,
          studentId,
          password: hashedPassword,
          stateOfOrigin,
          localGvt,
          homeTown,
          sponsorName,
          sponsorRelationship,
          sponsorPhoneNumber,
          sponsorEmail,
        },
        select: {
          id: true,
          studentId: true,
          firstName: true,
          lastName: true,
          otherName: true,
          dateOfBirth: true,
          level: true,
          subLevel: true,
          isStudent: true,
          isPaid: true,
          gender: true,
          yearAdmitted: true,
          stateOfOrigin: true,
          localGvt: true,
          homeTown: true,
          sponsorEmail: true,
          sponsorName: true,
          sponsorPhoneNumber: true,
          sponsorRelationship: true,
          imageUrl: true,
          createdAt: true,
        },
      });

      res.status(201).json(student);
    } catch (error) {
      throw error;
    }
  }
);

// @route   GET /api/students
// @access  Private (Admin or Owner)
const getAllStudents = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as {
    isAdmin: boolean;
    level?: string;
    subLevel?: string;
  };
  if (!user) {
    res.status(401);
    throw new Error('Unauthorized User');
  }

  const level = req.query.level as string | undefined;
  const keyword = req.query.keyword as string | undefined;
  const page = parseInt(req.query.pageNumber as string) || 1;
  const pageSize = 30;

  // Prisma filter
  const whereClause: any = {
    ...(keyword && {
      OR: [
        { firstName: { contains: keyword, mode: 'insensitive' } },
        { lastName: { contains: keyword, mode: 'insensitive' } },
        { otherName: { contains: keyword, mode: 'insensitive' } },
      ],
    }),
    ...(level &&
      level !== 'All' && {
        level: { contains: level, mode: 'insensitive' },
      }),
  };

  // If not admin, filter by their level/subLevel
  if (!user.isAdmin) {
    whereClause.level = user.level;
    whereClause.subLevel = user.subLevel;
  }

  const [students, totalCount] = await Promise.all([
    prisma.students.findMany({
      select: {
        id: true,
        studentId: true,
        firstName: true,
        lastName: true,
        otherName: true,
        dateOfBirth: true,
        level: true,
        subLevel: true,
        isStudent: true,
        isPaid: true,
        gender: true,
        yearAdmitted: true,
        stateOfOrigin: true,
        localGvt: true,
        homeTown: true,
        sponsorEmail: true,
        sponsorName: true,
        sponsorPhoneNumber: true,
        sponsorRelationship: true,
        imageUrl: true,
        createdAt: true,
      },
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      skip: pageSize * (page - 1),
      take: pageSize,
    }),
    prisma.students.count({ where: whereClause }),
  ]);

  res.status(200).json({
    students,
    page,
    totalPages: Math.ceil(totalCount / pageSize),
  });
});

// GET /api/students/registered-by-me
const getStudentsRegisteredByUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const userId = req.user.id;

    const page = parseInt(req.query.pageNumber as string) || 1;
    const pageSize = 30;

    const totalCount = await prisma.students.count({
      where: {
        userId: userId,
      },
    });

    const students = await prisma.students.findMany({
      select: {
        id: true,
        studentId: true,
        firstName: true,
        lastName: true,
        otherName: true,
        dateOfBirth: true,
        level: true,
        subLevel: true,
        isStudent: true,
        isPaid: true,
        gender: true,
        yearAdmitted: true,
        stateOfOrigin: true,
        localGvt: true,
        homeTown: true,
        sponsorEmail: true,
        sponsorName: true,
        sponsorPhoneNumber: true,
        sponsorRelationship: true,
        imageUrl: true,
        createdAt: true,
      },
      where: {
        userId: userId,
      },
      orderBy: { createdAt: 'desc' },
      skip: pageSize * (page - 1),
      take: pageSize,
    });

    res.status(200).json({
      students,
      page,
      totalPages: Math.ceil(totalCount / pageSize),
    });
  }
);

// GET /api/students/export

const exportStudentsCSV = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user || !req.user.isAdmin) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const students = await prisma.students.findMany({
      select: {
        studentId: true,
        firstName: true,
        lastName: true,
        otherName: true,
        gender: true,
        level: true,
        subLevel: true,
        yearAdmitted: true,
        stateOfOrigin: true,
        localGvt: true,
      },
    });

    if (!students.length) {
      res.status(404);
      throw new Error('No student data to export');
    }

    // Format current date
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // e.g., '2025-05-25'
    const filename = `students_${formattedDate}.csv`;

    // Convert to CSV
    const parser = new Parser();
    const csv = parser.parse(students);

    // Set headers to trigger download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.status(200).send(csv);
  }
);

// GET  STUDENT
// @route GET api/students/:id
// @privacy Private ADMIN
const getStudent = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401);
      throw new Error('Unauthorized User');
    }
    const student = await prisma.students.findFirst({
      select: {
        id: true,
        studentId: true,
        firstName: true,
        lastName: true,
        otherName: true,
        dateOfBirth: true,
        level: true,
        subLevel: true,
        isStudent: true,
        isPaid: true,
        gender: true,
        yearAdmitted: true,
        stateOfOrigin: true,
        localGvt: true,
        homeTown: true,
        sponsorEmail: true,
        sponsorName: true,
        sponsorPhoneNumber: true,
        sponsorRelationship: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        id: req.params.id,
      },
    });
    if (!student) {
      res.status(400);
      throw new Error('Student not found!');
    }
    res.status(200);
    res.json(student);
  }
);

// @desc Update student
// @route PUT api/students/:id
// @privacy Private ADMIN
const updateStudent = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validateData = updateStudentSchema.parse(req.body);
    const {
      firstName,
      lastName,
      otherName,
      dateOfBirth,
      level,
      subLevel,
      gender,
      yearAdmitted,
      stateOfOrigin,
      localGvt,
      homeTown,
      sponsorName,
      sponsorRelationship,
      sponsorPhoneNumber,
      sponsorEmail,
    } = validateData;

    if (!req.user) {
      res.status(401);
      throw new Error('Unauthorized User');
    }

    const student = await prisma.students.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!student) {
      res.status(404);
      throw new Error('No Student Found!');
    }

    const updateStudent = await prisma.students.update({
      select: {
        id: true,
        studentId: true,
        firstName: true,
        lastName: true,
        otherName: true,
        dateOfBirth: true,
        level: true,
        subLevel: true,
        isStudent: true,
        isPaid: true,
        gender: true,
        yearAdmitted: true,
        stateOfOrigin: true,
        localGvt: true,
        homeTown: true,
        sponsorEmail: true,
        sponsorName: true,
        sponsorPhoneNumber: true,
        sponsorRelationship: true,
        imageUrl: true,
        createdAt: true,
      },
      where: {
        id: req.params.id,
      },
      data: {
        firstName: firstName ?? student.firstName,
        lastName: lastName ?? student.lastName,
        otherName: otherName ?? student.otherName,
        dateOfBirth: dateOfBirth ?? student.dateOfBirth,
        level: level ?? student.level,
        subLevel: subLevel ?? student.subLevel,
        gender: gender ?? student.gender,
        yearAdmitted: yearAdmitted ?? student.yearAdmitted,
        stateOfOrigin: stateOfOrigin ?? student.stateOfOrigin,
        localGvt: localGvt ?? student.localGvt,
        homeTown: homeTown ?? student.homeTown,
        sponsorName: sponsorName ?? student.sponsorName,
        sponsorRelationship: sponsorRelationship ?? student.sponsorRelationship,
        sponsorEmail: sponsorEmail ?? student.sponsorEmail,
        sponsorPhoneNumber: sponsorPhoneNumber ?? student.sponsorPhoneNumber,
      },
    });

    // Return the updated student details
    res.status(200).json(updateStudent);
  }
);

// @desc Delete student
// @route DELETE api/students/:id
// @privacy Private ADMIN
const deleteStudent = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized User');
      }
      const student = await prisma.students.findUnique({
        where: {
          id: req.params.id,
        },
      });

      if (!student) {
        res.status(404);
        throw new Error('Student Not Found!');
      }
      const deleteStudent = await prisma.students.delete({
        where: {
          id: student.id,
        },
      });

      res.status(200).json('Student data deleted');
    } catch (error) {
      throw error;
    }
  }
);

// @desc Send reset password link student
// @route POST api/students/forget-password
// @privacy Public
const forgetPassword = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validateData = forgetStudentPasswordSchema.parse(req.body);
    const { studentId } = validateData;
    try {
      // Find user by studentId
      const student = await prisma.students.findFirst({
        where: {
          studentId,
        },
      });
      if (!student) {
        res.status(404);
        throw new Error('Student not found');
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');

      // Hash the reset token before saving to the database
      const hashedToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      const newDate = new Date(Date.now() + 60 * 60 * 1000);
      const updateStudent = await prisma.students.update({
        where: { id: student.id },
        data: {
          resetPasswordToken: hashedToken,
          resetPasswordExpires: newDate,
        },
      });

      // Create reset URL to send in email
      const resetUrl = `${process.env.PUBLIC_DOMAIN}/reset-password?token=${resetToken}`;

      // Send the email
      sendSingleMail({
        email: student.sponsorEmail!,
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
// @route PUT api/students/reset-password
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

      const student = await prisma.students.findFirst({
        where: {
          resetPasswordToken: hashedToken,
          resetPasswordExpires: {
            gt: new Date(),
          },
        },
      });
      console.log({ student: student });

      if (!student) {
        res.status(400).json({ message: 'Invalid or expired reset token' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await prisma.students.update({
        where: { id: student.id },
        data: {
          password: hashedPassword,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        },
      });

      await sendSingleMail({
        email: student.sponsorEmail!,
        subject: `Password Reset Successful`,
        text: `You have successfully reset your password. </br> NOTE: If you did not initiate this process, please change your password or contact the admin immediately.`,
      });

      res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
      throw error;
    }
  }
);

const exportStudentsPDF = asyncHandler(async (req: Request, res: Response) => {
  const students = await prisma.students.findMany({
    select: {
      studentId: true,
      firstName: true,
      lastName: true,
      level: true,
      subLevel: true,
    },
  });

  // const html = generateStudentHTML(students);
  const html = generateStudentResultHTML();
  const pdfBuffer = await generateStudentPdf(html);

  const fileName = `students-report-${
    new Date().toISOString().split('T')[0]
  }.pdf`;

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="${fileName}"`,
  });

  res.send(pdfBuffer);
});

const graduateStudent = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    // Step 1: Fetch all students
    const students = await prisma.students.findMany();

    const unmappedLevels: string[] = [];
    let updatedCount = 0;

    // Step 2: Loop through and update each student
    for (const student of students) {
      const currentLevel = student.level;
      const nextLevel = classProgression[currentLevel];

      if (nextLevel) {
        await prisma.students.update({
          where: { id: student.id },
          data: { level: nextLevel },
        });
        updatedCount++;
      } else {
        unmappedLevels.push(currentLevel);
      }
    }

    res.status(200).json({
      message: `Successfully promoted ${updatedCount} students.`,
      ...(unmappedLevels.length > 0 && {
        warning: `Some levels did not match class progression: ${[
          ...new Set(unmappedLevels),
        ].join(', ')}`,
      }),
    });
  }
);
export {
  authStudent,
  registerStudent,
  getAllStudents,
  getStudentsRegisteredByUser,
  getStudent,
  deleteStudent,
  forgetPassword,
  resetPassword,
  updateStudent,
  exportStudentsCSV,
  exportStudentsPDF,
  graduateStudent,
};
