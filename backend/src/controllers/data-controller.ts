import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../config/db/prisma';
import { levels } from '../utils/classUtils';

const studentsData = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Unauthorized User');
  }

  const allStudents = await prisma.student.findMany();

  const genderCounts: Record<string, number> = { Male: 0, Female: 0 };
  const levelGenderCounts: Record<string, Record<string, number>> = {} as any;

  // Initialize levelGenderCounts
  for (const level of levels) {
    levelGenderCounts[level] = { Male: 0, Female: 0 };
  }

  let paidFees = 0;

  for (const student of allStudents) {
    const gender: string = student.gender;
    const level: string = student.level;

    if (gender === 'Male' || gender === 'Female') {
      genderCounts[gender]++;
    }

    if (levels.includes(level)) {
      levelGenderCounts[level][gender]++;
    }

    if (student.isPaid) {
      paidFees++;
    }
  }

  const response: {
    totalStudents: number;
    paidFees: number;
    Male: number;
    Female: number;
    [key: string]: number;
  } = {
    totalStudents: allStudents.length,
    paidFees,
    Male: genderCounts.Male,
    Female: genderCounts.Female,
  };

  // Append each level/gender count to the response
  for (const level of levels) {
    const safeKey = level.replace(/\s+/g, '');
    response[`${safeKey}Males`] = levelGenderCounts[level].Male;
    response[`${safeKey}Females`] = levelGenderCounts[level].Female;
  }

  res.json(response);
});

const userData = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const [total, adminUsers, activeUsers, suspendedUsers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          isAdmin: true,
        },
      }),
      prisma.user.count({
        where: {
          status: 'active',
        },
      }),
      prisma.user.count({
        where: {
          status: 'suspended',
        },
      }),
    ]);

    res.status(200).json({
      totalUsers: total,
      adminUsers: adminUsers,
      activeUsers: activeUsers,
      suspendedUsers: suspendedUsers,
    });
  }
);

export { studentsData, userData };
