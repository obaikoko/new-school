"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authStudentSchema = exports.updateStudentSchema = exports.forgetStudentPasswordSchema = exports.insertStudentSchema = void 0;
const zod_1 = require("zod");
exports.insertStudentSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(3, 'First name must be at least 3 letters'),
    lastName: zod_1.z.string().min(3, 'Last name must be at least 3 letters'),
    otherName: zod_1.z.string().optional().nullable(),
    dateOfBirth: zod_1.z.coerce.date({ message: 'Invalid date of birth' }),
    level: zod_1.z.string().min(1, 'Student level cannot be empty'),
    subLevel: zod_1.z.string().min(1, 'Sub level category cannot be empty'),
    gender: zod_1.z.string().min(1, 'Gender is required'),
    yearAdmitted: zod_1.z.coerce.date({ message: 'Invalid admission year' }),
    stateOfOrigin: zod_1.z.string().min(1, 'State of origin is required'),
    localGvt: zod_1.z.string().min(1, 'Local government is required'),
    homeTown: zod_1.z.string().min(1, 'Hometown is required'),
    sponsorName: zod_1.z.string().optional().nullable(),
    sponsorRelationship: zod_1.z.string().optional().nullable(),
    sponsorPhoneNumber: zod_1.z.string().optional().nullable(),
    sponsorEmail: zod_1.z.string().email('Invalid email address').optional().nullable(),
    imageUrl: zod_1.z.string().optional().nullable(),
    imagePublicId: zod_1.z.string().optional().nullable(),
});
exports.forgetStudentPasswordSchema = zod_1.z.object({
    studentId: zod_1.z.string().min(3, 'StudentID is required!'),
});
exports.updateStudentSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .min(3, 'First name must be at least 3 letters')
        .optional()
        .nullable(),
    lastName: zod_1.z
        .string()
        .min(3, 'Last name must be at least 3 letters')
        .optional()
        .nullable(),
    otherName: zod_1.z.string().optional().nullable(),
    dateOfBirth: zod_1.z.coerce
        .date({ message: 'Invalid date of birth' })
        .optional()
        .nullable(),
    level: zod_1.z
        .string()
        .min(1, 'Student level cannot be empty')
        .optional()
        .nullable(),
    subLevel: zod_1.z
        .string()
        .min(1, 'Sub level category cannot be empty')
        .optional()
        .nullable(),
    gender: zod_1.z.string().min(1, 'Gender is required').optional().nullable(),
    yearAdmitted: zod_1.z.coerce
        .date({ message: 'Invalid admission year' })
        .optional()
        .nullable(),
    stateOfOrigin: zod_1.z
        .string()
        .min(1, 'State of origin is required')
        .optional()
        .nullable(),
    localGvt: zod_1.z
        .string()
        .min(1, 'Local government is required')
        .optional()
        .nullable(),
    homeTown: zod_1.z.string().min(1, 'Hometown is required').optional().nullable(),
    sponsorName: zod_1.z.string().optional().nullable(),
    sponsorRelationship: zod_1.z.string().optional().nullable(),
    sponsorPhoneNumber: zod_1.z.string().optional().nullable(),
    sponsorEmail: zod_1.z.string().email('Invalid email address').optional().nullable(),
    imageUrl: zod_1.z.string().optional().nullable(),
    imagePublicId: zod_1.z.string().optional().nullable(),
});
exports.authStudentSchema = zod_1.z.object({
    studentId: zod_1.z.string().min(3, 'StudentId must be at least 3 characters'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
