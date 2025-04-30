// src/controllers/studentController.ts

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { insertStudentSchema } from '../validators';
import { prisma } from '../config/db/prisma'; // update with actual prisma instance path
import bcrypt from 'bcrypt';
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

      //   const { image } = req.body;
      //   if (!image) {
      //     res.status(400);
      //     throw new Error('Please attach an image');
      //   }

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
      const classCodeMapping: Record<string, string> = {
        'Lower Reception': 'LR',
        'Upper Reception': 'UR',
        'Nursery 1': 'N1',
        'Nursery 2': 'N2',
        'Grade 1': 'G1',
        'Grade 2': 'G2',
        'Grade 3': 'G3',
        'Grade 4': 'G4',
        'Grade 5': 'G5',
        'Grade 6': 'G6',
        'JSS 1': 'J1',
        'JSS 2': 'J2',
        'JSS 3': 'J3',
        'SSS 1': 'S1',
        'SSS 2': 'S2',
        'SSS 3': 'S3',
      };

      const currentYear = new Date().getFullYear();
      const classCode = classCodeMapping[level];

      const count = await prisma.students.count({
        where: { level },
      });

      const studentId = `BDIS/${currentYear}/${classCode}/${(count + 1)
        .toString()
        .padStart(3, '0')}`;

      //   const uploadResult = await cloudinary.uploader.upload(image, {
      //     folder: 'Bendonald',
      //   });

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
          //   imageUrl: uploadResult.secure_url,
          //   imagePublicId: uploadResult.public_id,
        },
      });

      res.status(201).json({
        message: 'Student registered successfully',
        student,
      });
    } catch (error) {
      throw error;
    }
  }
);

export { registerStudent };
