"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertStudentSchema = exports.updateUserSchema = exports.authUserSchema = exports.insertUserSchema = void 0;
const zod_1 = require("zod");
exports.insertUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    firstName: zod_1.z.string().min(3, 'First name must be at least 3 letters'),
    lastName: zod_1.z.string().min(3, 'Last name must be at least 3 letters'),
    level: zod_1.z.string().optional().nullable(),
    subLevel: zod_1.z.string().optional().nullable(),
    password: zod_1.z.string().min(6, 'password must be at least 6 characters'),
});
exports.authUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'password must be at least 6 characters'),
});
exports.updateUserSchema = zod_1.z.object({
    firstName: zod_1.z.string().optional(),
    lastName: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
});
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
