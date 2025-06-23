import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../config/db/prisma';
import { admissionSchema } from '../validators/admissionValidators';
import { sendSingleMail } from '../services/emailService';

const createAdmission = asyncHandler(async (req: Request, res: Response) => {
  const validateData = admissionSchema.parse(req.body);

  const {
    firstName,
    lastName,
    email,
    phone,
    childName,
    dateOfBirth,
    gender,
    level,
  } = validateData;

  
  const admission = await prisma.admission.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      childName,
      dateOfBirth,
      gender,
      level,
    },
  });

  if (admission) {
    await sendSingleMail({
      email: 'jesseobinna7@gmail.com',
      subject: 'Admission Request',
      text: `${firstName} ${lastName} has requested ${childName} to be enrolled into ${level}`,
    });

    await sendSingleMail({
      email,
      subject: 'Admission Request',
      text: `Dear ${firstName}, your request to enroll ${childName} into BENDONALD INTERNATIONAL SCHOOL has been received and is being processed.`,
    });

    res.status(200).json('Form submitted successfully');
  }
});

const getAllRequest = asyncHandler(async (req: Request, res: Response) => {
  const admission = await prisma.admission.findMany({
    orderBy: { createdAt: 'desc' },
  });

  res.status(200).json({ admission, totalAdmission: admission.length });
});

const getSingleRequest = asyncHandler(async (req: Request, res: Response) => {
  const admission = await prisma.admission.findUnique({
    where: { id: req.params.id },
  });

  if (!admission) {
    res.status(404);
    throw new Error('Not Found!');
  }

  res.status(200).json(admission);
});

const sendMail = asyncHandler(async (req: Request, res: Response) => {
  const { subject, text } = req.body;
  const admission = await prisma.admission.findUnique({
    where: { id: req.params.id },
  });

  if (!admission) {
    res.status(404);
    throw new Error('Not found!');
  }

  await sendSingleMail({
    email: admission.email,
    subject,
    text,
  });

  res.status(200).json('Email sent successfully');
});

const deleteAdmission = asyncHandler(async (req: Request, res: Response) => {
  await prisma.admission.delete({
    where: { id: req.params.id },
  });

  res.status(200).json('Admission request deleted successfully');
});

export {
  createAdmission,
  getAllRequest,
  getSingleRequest,
  deleteAdmission,
  sendMail,
};
