"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffData = exports.deleteStaff = exports.updateStaff = exports.getStaff = exports.getAllStaff = exports.registerStaff = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = require("../config/db/prisma");
const staffValidators_1 = require("../validators/staffValidators");
const registerStaff = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateData = staffValidators_1.registerStaffSchema.parse(req.body);
    const { firstName, lastName, otherName, dateOfBirth, qualification, category, role, gender, maritalStatus, yearAdmitted, stateOfOrigin, localGvt, homeTown, residence, phone, email, imageUrl, imagePublicId, } = validateData;
    console.log('Models:', Object.keys(prisma_1.prisma));
    const staffExist = yield prisma_1.prisma.staff.findFirst({
        where: {
            firstName: { equals: firstName, mode: 'insensitive' },
            lastName: { equals: lastName, mode: 'insensitive' },
        },
    });
    if (staffExist) {
        res.status(400);
        throw new Error('Staff already exists');
    }
    const staff = yield prisma_1.prisma.staff.create({
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
}));
exports.registerStaff = registerStaff;
const getAllStaff = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const pageSize = 20;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = ((_a = req.query.keyword) === null || _a === void 0 ? void 0 : _a.trim()) || '';
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
    const [staff, total] = yield Promise.all([
        prisma_1.prisma.staff.findMany({
            where: whereClause,
            skip: (page - 1) * pageSize,
            take: pageSize,
            orderBy: { createdAt: 'desc' },
        }),
        prisma_1.prisma.staff.count({ where: whereClause }),
    ]);
    res.status(200).json({
        staff,
        page,
        totalPages: Math.ceil(total / pageSize),
    });
}));
exports.getAllStaff = getAllStaff;
const getStaff = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const staff = yield prisma_1.prisma.staff.findUnique({
            where: {
                id,
            },
        });
        if (!staff) {
            res.status(404);
            throw new Error('Staff not found!');
        }
        res.status(200).json(staff);
    }
    catch (error) {
        res.status(400);
        throw new Error('Invalid staff ID');
    }
}));
exports.getStaff = getStaff;
const updateStaff = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const parsed = staffValidators_1.staffSchema.partial().safeParse(req.body);
    if (!parsed.success) {
        res.status(400);
        throw new Error(parsed.error.errors[0].message);
    }
    const staff = yield prisma_1.prisma.staff.findUnique({ where: { id } });
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
    const updated = yield prisma_1.prisma.staff.update({
        where: { id },
        data: Object.assign(Object.assign({}, parsed.data), { 
            //   ...imageData,
            dateOfBirth: parsed.data.dateOfBirth
                ? new Date(parsed.data.dateOfBirth)
                : undefined }),
    });
    res.status(200).json(updated);
}));
exports.updateStaff = updateStaff;
const deleteStaff = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const staff = yield prisma_1.prisma.staff.findUnique({ where: { id } });
    if (!staff) {
        res.status(404);
        throw new Error('Staff not found');
    }
    //   if (staff.imagePublicId) {
    //     await cloudinary.uploader.destroy(staff.imagePublicId);
    //   }
    yield prisma_1.prisma.staff.delete({ where: { id } });
    res.status(200).json({ message: 'Staff deleted successfully' });
}));
exports.deleteStaff = deleteStaff;
const staffData = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [total, males, females] = yield Promise.all([
        prisma_1.prisma.staff.count(),
        prisma_1.prisma.staff.count({ where: { gender: 'Male' } }),
        prisma_1.prisma.staff.count({ where: { gender: 'Female' } }),
    ]);
    res.json({
        totalStaff: total,
        Males: males,
        Females: females,
    });
}));
exports.staffData = staffData;
