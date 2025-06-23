import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../config/db/prisma';
import { subjectResults } from '../utils/subjectResults'; // adjust the import path
import {
  createResultSchema,
  generatePositionsSchema,
  subjectResultSchema,
  updateResultPaymentSchema,
  updateResultSchema,
} from '../validators/resultValidator';
import getGrade from '../utils/getGrade';
import { StudentResult, UpdateResultPayment } from '../schemas/resultSchema';
import getOrdinalSuffix from '../utils/getOrdinalSuffix';
import { generateStudentResultHTML } from '../utils/generateStudentResult';
import { generateStudentPdf } from '../utils/generateStudentPdf';

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

const updateResult = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401);
      throw new Error('Unauthorized User');
    }

    const validatedData = updateResultSchema.parse(req.body);
    const {
      subject,
      test,
      exam,
      grade,
      affectiveAssessments,
      psychomotorAssessments,
      teacherRemark,
      principalRemark,
    } = validatedData;

    const result: StudentResult | null = await prisma.result.findUnique({
      where: { id: req.params.id },
    });

    if (!result) {
      res.status(404);
      throw new Error('Result not found');
    }

    if (
      result.level !== req.user.level ||
      result.subLevel !== req.user.subLevel
    ) {
      res.status(401);
      throw new Error(
        'Unable to update this result, Please contact the class teacher'
      );
    }

    // --- Update subjectResults array ---
    let updatedSubjectResults = result.subjectResults;

    if (subject) {
      const index = updatedSubjectResults.findIndex(
        (s) => s.subject === subject
      );

      if (index === -1) {
        res.status(404);
        throw new Error('Subject not found in results');
      }

      const subjectToUpdate = updatedSubjectResults[index];

      if (
        result.level === 'Lower Reception' ||
        result.level === 'Upper Reception'
      ) {
        subjectToUpdate.grade = grade || subjectToUpdate.grade;
      } else {
        subjectToUpdate.testScore = test || subjectToUpdate.testScore;
        subjectToUpdate.examScore = exam || subjectToUpdate.examScore;
        subjectToUpdate.totalScore =
          subjectToUpdate.testScore + subjectToUpdate.examScore;
        subjectToUpdate.grade = getGrade(subjectToUpdate.totalScore);
      }

      updatedSubjectResults[index] = subjectToUpdate;
    }

    // --- Update affectiveAssessment array ---
    let updatedAffective = result.affectiveAssessment;
    if (affectiveAssessments?.length) {
      updatedAffective = updatedAffective.map((a) => {
        const incoming = affectiveAssessments.find(
          (x) => x.aCategory === a.aCategory
        );
        return incoming ? { ...a, grade: incoming.grade } : a;
      });
    }

    // --- Update psychomotor array ---
    let updatedPsychomotor = result.psychomotor;
    if (psychomotorAssessments?.length) {
      updatedPsychomotor = updatedPsychomotor.map((p) => {
        const incoming = psychomotorAssessments.find(
          (x) => x.pCategory === p.pCategory
        );
        return incoming ? { ...p, grade: incoming.grade } : p;
      });
    }

    // --- Recalculate total and average ---
    const totalScore = updatedSubjectResults.reduce(
      (acc, s) => acc + s.totalScore,
      0
    );
    const averageScore = totalScore / updatedSubjectResults.length;

    const updatedResult = await prisma.result.update({
      where: { id: result.id },
      data: {
        subjectResults: updatedSubjectResults,
        affectiveAssessment: updatedAffective,
        psychomotor: updatedPsychomotor,
        totalScore,
        averageScore,
        teacherRemark: teacherRemark || result.teacherRemark,
        principalRemark: principalRemark || result.principalRemark,
      },
    });

    res.status(200).json(updatedResult);
  }
);

const deleteResult = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await prisma.result.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!result) {
      res.status(404);
      throw new Error('Result not found!');
    }

    await prisma.result.delete({
      where: {
        id: result.id,
      },
    });

    res.status(200).json({ message: 'Result Deleted successfully' });
  }
);

// @desc updates result to paid and makes it visible to student
// @privacy private
const updateResultPayment = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const validateData = updateResultPaymentSchema.parse(req.body);
      const { resultId, resultFee } = validateData;

      const result = await prisma.result.findFirst({
        where: {
          id: resultId,
        },
      });
      if (!result) {
        res.status(404);
        throw new Error('Result not found!');
      }

      await prisma.result.update({
        where: {
          id: result.id,
        },
        data: {
          isPaid: resultFee,
        },
      });

      res.status(200);
      res.json('Payment status updated successfully');
    } catch (error) {
      throw error;
    }
  }
);

const generatePositions = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    if (!req.user) {
      res.status(401);
      throw new Error('Unauthorized User');
    }

    const validatedData = generatePositionsSchema.parse(req.body);
    const { level, subLevel, session, term } = validatedData;

    // Fetch all results for the specified class
    const results: StudentResult[] = await prisma.result.findMany({
      where: {
        level,
        subLevel,
        session,
        term,
      },
    });

    if (!results || results.length === 0) {
      res.status(404);
      throw new Error(
        `No results found for ${level}${subLevel} ${session} session`
      );
    }

    // Sort results by averageScore in descending order
    const sortedResults = results.sort((a, b) => {
      const aAvg = a.averageScore ?? 0;
      const bAvg = b.averageScore ?? 0;
      return bAvg - aAvg;
    });

    // Assign positions
    const updatedResults = sortedResults.map((result, index) => ({
      id: result.id,
      position: `${index + 1}${getOrdinalSuffix(index + 1)}`,
      numberInClass: results.length,
    }));

    // Batch update using Prisma's `updateMany` alternative: multiple update calls
    await Promise.all(
      updatedResults.map(({ id, position, numberInClass }) =>
        prisma.result.update({
          where: { id },
          data: {
            position,
            numberInClass,
          },
        })
      )
    );

    res.status(200).json({
      message: `${level}${subLevel} ${session} Results Ranked Successfully`,
    });
  }
);

const generateBroadsheet = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validatedData = generatePositionsSchema.parse(req.body);
    const { level, subLevel, session, term } = validatedData;

    // Fetch results filtered by class criteria
    const results: StudentResult[] = await prisma.result.findMany({
      where: {
        session,
        term,
        level,
        subLevel,
      },
      include: {
        student: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!results || results.length === 0) {
      res.status(404);
      throw new Error(
        `No results found for ${level}${subLevel} ${session} session`
      );
    }

    // Transform to broadsheet format
    const broadsheet = results.map((result) => ({
      studentId: result.studentId,
      firstName: result.firstName || 'N/A',
      lastName: result.lastName || 'N/A',
      subjectResults: result.subjectResults.map((subject) => ({
        subject: subject.subject,
        testScore: subject.testScore,
        examScore: subject.examScore,
      })),
    }));

    res.status(200).json(broadsheet);
  }
);

const addSubjectToResults = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validateData = subjectResultSchema.parse(req.body);
    const { session, term, level, subjectName } = validateData;
    const newSubject = {
      subject: subjectName,
      testScore: 0,
      examScore: 0,
      totalScore: 0,
      grade: '-',
    };

    const results: StudentResult[] = await prisma.result.findMany({
      where: { session, term, level },
    });

    if (!results.length) {
      res.status(404);
      throw new Error('No results found.');
    }

    const updatedResults = await Promise.all(
      results.map(async (result) => {
        const exists = result.subjectResults.some(
          (s: any) => s.subject.toLowerCase() === subjectName.toLowerCase()
        );

        if (!exists) {
          const updatedSubjects = [...result.subjectResults, newSubject];
          const totalScore = updatedSubjects.reduce(
            (acc: number, s: any) => acc + (s.totalScore || 0),
            0
          );
          const averageScore =
            updatedSubjects.length > 0
              ? totalScore / updatedSubjects.length
              : 0;

          return prisma.result.update({
            where: { id: result.id },
            data: {
              subjectResults: updatedSubjects,
              totalScore,
              averageScore,
            },
          });
        }

        return result;
      })
    );

    res.json({
      message: `${subjectName} added to ${updatedResults.length} result(s) for ${level} - ${term} term.`,
    });
  }
);

const manualSubjectRemoval = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validateData = subjectResultSchema.parse(req.body);
    const { session, term, level, subjectName } = validateData;

    const results: StudentResult[] = await prisma.result.findMany({
      where: { session, term, level },
    });

    if (!results.length) {
      res.status(404);
      throw new Error('No results found.');
    }

    const updatedResults = await Promise.all(
      results.map(async (result) => {
        const updatedSubjects = result.subjectResults.filter(
          (s: any) => s.subject !== subjectName
        );

        const totalScore = updatedSubjects.reduce(
          (acc: number, s: any) => acc + (s.totalScore || 0),
          0
        );
        const averageScore =
          updatedSubjects.length > 0 ? totalScore / updatedSubjects.length : 0;

        return prisma.result.update({
          where: { id: result.id },
          data: {
            subjectResults: updatedSubjects,
            totalScore,
            averageScore,
          },
        });
      })
    );

    res
      .status(200)
      .json(
        `${subjectName} removed from ${updatedResults.length} result(s) successfully.`
      );
  }
);
const resultData = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const [results, totalResults, publishedResults, unpublishedResults] =
      await Promise.all([
        prisma.result.findMany(),
        prisma.result.count(),
        prisma.result.count({
          where: {
            isPublished: true,
          },
        }),
        prisma.result.count({
          where: {
            isPublished: false,
          },
        }),
      ]);

    res.status(200).json({
      results,
      totalResults,
      publishedResults,
      unpublishedResults,
    });
  }
);

const exportResult = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const result = await prisma.result.findFirst({
      where: {
        id: req.params.id,
      },
    });
    if (!result) {
      res.status(404);
      throw new Error('Not found');
    }

    if (!result.isPublished) {
      res.status(401);
      throw new Error('Result is not yet published');
    }

    const html = generateStudentResultHTML(result);
    const pdfBuffer = await generateStudentPdf(html);

    const fileName = `students-report-${
      new Date().toISOString().split('T')[0]
    }.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    res.send(pdfBuffer);
  }
);
const exportManyResults = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validateData = generatePositionsSchema.parse(req.query);
    const { session, level, subLevel, term } = validateData;

    const results = await prisma.result.findMany({
      where: {
        session,
        level,
        subLevel,
        term,
      },
      orderBy: {
        lastName: 'asc', // optional: sort by student name
      },
    });

    if (results.length === 0) {
      res.status(404);
      throw new Error('No published results found');
    }

    // Generate HTML for all results, separated by page breaks
    const html = results
      .map(generateStudentResultHTML)
      .join('<div style="page-break-after: always;"></div>');

    const pdfBuffer = await generateStudentPdf(html);

    const fileName = `all-students-results-${
      new Date().toISOString().split('T')[0]
    }.pdf`;

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });

    res.send(pdfBuffer);
  }
);

export {
  createResult,
  getResult,
  getResults,
  getStudentResults,
  updateResult,
  deleteResult,
  updateResultPayment,
  generatePositions,
  generateBroadsheet,
  addSubjectToResults,
  manualSubjectRemoval,
  resultData,
  exportResult,
  exportManyResults,
};
