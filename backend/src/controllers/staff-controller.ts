import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { prisma } from '../config/db/prisma';
import {
  registerStaffSchema,
  staffSchema,
} from '../validators/staffValidators';

const registerStaff = asyncHandler(async (req: Request, res: Response) => {
  const validateData = registerStaffSchema.parse(req.body);

  const {
    firstName,
    lastName,
    otherName,
    dateOfBirth,
    qualification,
    category,
    role,
    gender,
    maritalStatus,
    yearAdmitted,
    stateOfOrigin,
    localGvt,
    homeTown,
    residence,
    phone,
    email,
    imageUrl,
    imagePublicId,
  } = validateData;

  console.log('Models:', Object.keys(prisma));

  const staffExist = await prisma.staff.findFirst({
    where: {
      firstName: { equals: firstName, mode: 'insensitive' },
      lastName: { equals: lastName, mode: 'insensitive' },
    },
  });

  if (staffExist) {
    res.status(400);
    throw new Error('Staff already exists');
  }

  const staff = await prisma.staff.create({
    data: {
      firstName,
      lastName,
      otherName,
      dateOfBirth: new Date(dateOfBirth),
      qualification,
      category,
      role,
      gender,
      maritalStatus,
      yearAdmitted,
      stateOfOrigin,
      localGvt,
      homeTown,
      residence,
      phone,
      email,
      imageUrl,
      imagePublicId,
    },
  });

  res.status(201).json(staff);
});

const getAllStaff = asyncHandler(async (req: Request, res: Response) => {
  const pageSize = 20;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = (req.query.keyword as string)?.trim() || '';

  let whereClause = {};

  if (keyword) {
    whereClause = {
      OR: ['firstName', 'lastName', 'otherName'].map((field) => ({
        [field]: {
          contains: keyword,
          mode: 'insensitive',
        },
      })),
    };
  }

  const [staff, total] = await Promise.all([
    prisma.staff.findMany({
      where: whereClause,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.staff.count({ where: whereClause }),
  ]);

  res.status(200).json({
    staff,
    page,
    totalPages: Math.ceil(total / pageSize),
  });
});

const getStaff = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const staff = await prisma.staff.findUnique({
      where: {
        id,
      },
    });

    if (!staff) {
      res.status(404);
      throw new Error('Staff not found!');
    }

    res.status(200).json(staff);
  } catch (error) {
    res.status(400);
    throw new Error('Invalid staff ID');
  }
});

const updateStaff = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;
  const parsed = staffSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    res.status(400);
    throw new Error(parsed.error.errors[0].message);
  }

  const staff = await prisma.staff.findUnique({ where: { id } });
  if (!staff) {
    res.status(404);
    throw new Error('Staff not found');
  }

  //   let imageData = {};
  //   if (parsed.data.image) {
  //     if (staff.imagePublicId) {
  //       await cloudinary.uploader.destroy(staff.imagePublicId);
  //     }
  //     const uploaded = await cloudinary.uploader.upload(parsed.data.image, {
  //       folder: 'Bendonalds',
  //     });

  //     imageData = {
  //       imageUrl: uploaded.secure_url,
  //       imagePublicId: uploaded.public_id,
  //     };
  //   }

  const updated = await prisma.staff.update({
    where: { id },
    data: {
      ...parsed.data,
      //   ...imageData,
      dateOfBirth: parsed.data.dateOfBirth
        ? new Date(parsed.data.dateOfBirth)
        : undefined,
    },
  });

  res.status(200).json(updated);
});

const deleteStaff = asyncHandler(async (req: Request, res: Response) => {
  const id = req.params.id;

  const staff = await prisma.staff.findUnique({ where: { id } });
  if (!staff) {
    res.status(404);
    throw new Error('Staff not found');
  }

  //   if (staff.imagePublicId) {
  //     await cloudinary.uploader.destroy(staff.imagePublicId);
  //   }

  await prisma.staff.delete({ where: { id } });

  res.status(200).json({ message: 'Staff deleted successfully' });
});

const staffData = asyncHandler(async (req: Request, res: Response) => {
  const [total, males, females] = await Promise.all([
    prisma.staff.count(),
    prisma.staff.count({ where: { gender: 'Male' } }),
    prisma.staff.count({ where: { gender: 'Female' } }),
  ]);

  res.json({
    totalStaff: total,
    Males: males,
    Females: females,
  });
});

export {
  registerStaff,
  getAllStaff,
  getStaff,
  updateStaff,
  deleteStaff,
  staffData,
};
