"use strict";
// src/controllers/studentController.ts
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
exports.registerStudent = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validators_1 = require("../validators");
const prisma_1 = require("../config/db/prisma"); // update with actual prisma instance path
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const validatedData = validators_1.insertStudentSchema.parse(req.body);
        const { firstName, lastName, otherName, dateOfBirth, level, subLevel, gender, yearAdmitted, stateOfOrigin, localGvt, homeTown, sponsorName, sponsorRelationship, sponsorPhoneNumber, sponsorEmail, } = validatedData;
        //   const { image } = req.body;
        //   if (!image) {
        //     res.status(400);
        //     throw new Error('Please attach an image');
        //   }
        // Check if student already exists
        const existingStudent = yield prisma_1.prisma.students.findFirst({
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
        const classCodeMapping = {
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
        const count = yield prisma_1.prisma.students.count({
            where: { level },
        });
        const studentId = `BDIS/${currentYear}/${classCode}/${(count + 1)
            .toString()
            .padStart(3, '0')}`;
        //   const uploadResult = await cloudinary.uploader.upload(image, {
        //     folder: 'Bendonald',
        //   });
        const hashedPassword = yield bcrypt_1.default.hash(process.env.DEFAULTPASSWORD, 10);
        const student = yield prisma_1.prisma.students.create({
            data: {
                userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
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
    }
    catch (error) {
        throw error;
    }
}));
exports.registerStudent = registerStudent;
