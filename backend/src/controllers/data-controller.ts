import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../config/db/prisma'; // adjust this path based on where your Prisma client is

type Gender = 'Male' | 'Female';
type Level =
  | 'Creche'
  | 'Lower Reception'
  | 'Upper Reception'
  | 'Nursery 1'
  | 'Nursery 2'
  | 'Grade 1'
  | 'Grade 2'
  | 'Grade 3'
  | 'Grade 4'
  | 'Grade 5'
  | 'JSS 1'
  | 'JSS 2'
  | 'JSS 3'
  | 'SSS 1'
  | 'SSS 2'
  | 'SSS 3';

const levels: Level[] = [
  'Creche',
  'Lower Reception',
  'Upper Reception',
  'Nursery 1',
  'Nursery 2',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'JSS 1',
  'JSS 2',
  'JSS 3',
  'SSS 1',
  'SSS 2',
  'SSS 3',
];

const studentsData = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401);
    throw new Error('Unauthorized User');
  }

  const allStudents = await prisma.student.findMany();

  const genderCounts: Record<Gender, number> = { Male: 0, Female: 0 };
  const levelGenderCounts: Record<Level, Record<Gender, number>> = {} as any;

  // Initialize levelGenderCounts
  for (const level of levels) {
    levelGenderCounts[level] = { Male: 0, Female: 0 };
  }

  let paidFees = 0;

  for (const student of allStudents) {
    const gender = student.gender as Gender;
    const level = student.level as Level;

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

export { studentsData };
