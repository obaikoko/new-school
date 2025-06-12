import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../config/db/prisma';
import { subjectResults } from '../utils/subjectResults'; // adjust the import path
import { createResultSchema } from '../validators/resultValidator';

// @desc Creates New Result
// @route POST /results/:id
// privacy PRIVATE Users
const createResult = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validateData = createResultSchema.parse(req.body);
    const { session, term, level } = validateData;
    const id = req.params.id as string;

    const user = req.user;

    if (!user) {
      res.status(401);
      throw new Error('Unauthorized User');
    }

    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      res.status(400);
      throw new Error('Student does not exist');
    }

    const resultExist = await prisma.result.findFirst({
      where: {
        studentId: id,
        session,
        term,
        level,
      },
    });

    if (resultExist) {
      res.status(400);
      throw new Error('Result already generated!');
    }

    const addSubjects = subjectResults({ level });

    const baseData = {
      userId: user.id,
      studentId: id,
      level,
      subLevel: student.subLevel,
      firstName: student.firstName,
      lastName: student.lastName,
      otherName: student.otherName ?? '',
      image: student.imageUrl ?? '',
      session,
      term,
      subjectResults: addSubjects,
      teacherRemark: '',
      principalRemark: '',
    };

    let result;

    if (level === 'Lower Reception' || level === 'Upper Reception') {
      result = await prisma.result.create({
        data: baseData,
      });
    } else {
      result = await prisma.result.create({
        data: {
          ...baseData,
          position: '',
          totalScore: 0,
          averageScore: 0,
          affectiveAssessment: [
            { aCategory: 'Attendance', grade: '-' },
            { aCategory: 'Carefulness', grade: '-' },
            { aCategory: 'Responsibility', grade: '-' },
            { aCategory: 'Honesty', grade: '-' },
            { aCategory: 'Neatness', grade: '-' },
            { aCategory: 'Obedience', grade: '-' },
            { aCategory: 'Politeness', grade: '-' },
            { aCategory: 'Punctuality', grade: '-' },
          ],
          psychomotor: [
            { pCategory: 'Handwriting', grade: '-' },
            { pCategory: 'Drawing', grade: '-' },
            { pCategory: 'Sport', grade: '-' },
            { pCategory: 'Speaking', grade: '-' },
            { pCategory: 'Music', grade: '-' },
            { pCategory: 'Craft', grade: '-' },
            { pCategory: 'ComputerPractice', grade: '-' },
          ],
        },
      });
    }

    res.status(200).json(result);
  }
);

// @GET ALL RESULT
// @route GET api/results
// @privacy Private
const getResults = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const user = req.user;
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

    const [results, totalCount] = await Promise.all([
      prisma.result.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: pageSize * (page - 1),
        take: pageSize,
      }),
      prisma.result.count({
        where: whereClause,
      }),
    ]);

    res.status(200).json({
      results,
      page,
      totalPages: Math.ceil(totalCount / pageSize),
    });
  }
);

// @GET STUDENT RESULT
// @route GET api/results/:id
// @privacy Private
const getResult = asyncHandler(async (req: Request, res: Response) => {
  const result = await prisma.result.findFirst({
    where: {
      id: req.params.id,
    },
  });

  if (!result) {
    res.status(404);
    throw new Error('Result does not exist');
  }

  // If a student is making the request
  if (req.student) {
    const isOwner = req.student.id.toString() === result.studentId.toString();

    if (!isOwner) {
      res.status(401);
      throw new Error('Unauthorized Access!');
    }

    if (!result.isPaid) {
      res.status(401);
      throw new Error('Unable to access result, Please contact the admin');
    }
  }
  // If a teacher (user) is making the request, allow access regardless of isPaid
  // No additional checks needed unless you want to restrict teachers to only certain results

  res.status(200).json(result);
});

const getStudentResults = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const studentId = req.params.id as string;
      const user = req.user;

      if (!studentId) {
        res.status(400);
        throw new Error('invalid studentId');
      }

      const results = await prisma.result.findMany({
        where: {
          studentId,
        },
      });

      if (!results) {
        res.status(404);
        throw new Error('Results not found!');
      }

      // If a student is making the request
      if (req.student) {
        const isOwner = req.student.id.toString() === studentId.toString();

        if (!isOwner) {
          res.status(401);
          throw new Error('Unauthorized Access!');
        }
      }

      res.status(200).json(results);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export { createResult, getResult, getResults, getStudentResults };
