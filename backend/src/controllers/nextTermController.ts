import asyncHandler from 'express-async-handler';
import { prisma } from '../config/db/prisma';
import { Request, Response } from 'express';
import {
  getNextTermDetailsSchema,
  nextTermDetailsSchema,
} from '../validators/studentValidators';
const addNextTermInfo = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const validatedData = nextTermDetailsSchema.parse(req.body);
    const {
      reOpeningDate,
      session,
      level,
      term,
      nextTermFee,
      busFee,
      otherCharges,
    } = validatedData;

    // Check if entry already exists
    const existingEntry = await prisma.nextTerm.findFirst({
      where: {
        session,
        level,
        term,
      },
    });

    if (existingEntry) {
      const updatedEntry = await prisma.nextTerm.update({
        where: { id: existingEntry.id },
        data: {
          reOpeningDate: new Date(reOpeningDate),
          nextTermFee,
          ...(busFee !== undefined && { busFee }),
          ...(otherCharges !== undefined && { otherCharges }),
        },
      });

      res.status(200).json({
        message: 'Next term details updated successfully',
        data: updatedEntry,
      });
    } else {
      const newEntry = await prisma.nextTerm.create({
        data: {
          reOpeningDate: new Date(reOpeningDate),
          session,
          level,
          term,
          nextTermFee,
          ...(busFee !== undefined && { busFee }),
          ...(otherCharges !== undefined && { otherCharges }),
        },
      });

      res.status(201).json({
        message: 'Next term details created successfully',
        data: newEntry,
      });
    }
  }
);

// Get next term details by query
const getNextTermInfo = asyncHandler(async (req: Request, res: Response) => {
  const validateData = getNextTermDetailsSchema.parse(req.query);

  const { level, session, term } = validateData;

  const nextTermInfo = await prisma.nextTerm.findFirst({
    where: {
      level,
      session,
      term,
    },
  });

  if (!nextTermInfo) {
    res.status(404);
    throw new Error('Next term info not found!');
  }

  res.status(200).json(nextTermInfo);
});

export { addNextTermInfo, getNextTermInfo };
