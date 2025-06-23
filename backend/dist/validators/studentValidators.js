"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNextTermDetailsSchema = exports.nextTermDetailsSchema = exports.authStudentSchema = exports.updateStudentSchema = exports.forgetStudentPasswordSchema = exports.insertStudentSchema = void 0;
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
    homeTown: zod_1.z.string().min(1, 'Hometown is required').optional().nullable(),
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
exports.nextTermDetailsSchema = zod_1.z.object({
    nextTermFee: zod_1.z.coerce.number().min(-1, 'Amount cannot be less than 0'),
    session: zod_1.z.string().min(1, 'Session cannot be empty'),
    term: zod_1.z.string().min(3, 'Term cannot be empty'),
    level: zod_1.z.string().min(3, 'Level/Class cannot be empty'),
    reOpeningDate: zod_1.z.string().min(3, ' Re-opening date cannot be empty '),
    busFee: zod_1.z.coerce.number().min(-1, 'Bus fee cannot be less than 0').optional(),
    otherCharges: zod_1.z.coerce.number().optional(),
});
exports.getNextTermDetailsSchema = zod_1.z.object({
    session: zod_1.z.string().min(3, 'Session should be more than 3 characters'),
    term: zod_1.z.string().min(3, 'term should be more than 3 characters'),
    level: zod_1.z.string().min(3, 'level should be more than 3 characters'),
});
