"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffSchema = exports.registerStaffSchema = void 0;
const zod_1 = require("zod");
exports.registerStaffSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    otherName: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.coerce.date(),
    qualification: zod_1.z.string(),
    category: zod_1.z.string(),
    role: zod_1.z.string(),
    gender: zod_1.z.string(),
    maritalStatus: zod_1.z.string(),
    yearAdmitted: zod_1.z.coerce.date(),
    stateOfOrigin: zod_1.z.string(),
    localGvt: zod_1.z.string(),
    homeTown: zod_1.z.string(),
    residence: zod_1.z.string(),
    phone: zod_1.z.string(),
    email: zod_1.z.string().email(),
    imageUrl: zod_1.z.string().optional(),
    imagePublicId: zod_1.z.string().optional(),
});
exports.staffSchema = zod_1.z.object({
    firstName: zod_1.z.string(),
    lastName: zod_1.z.string(),
    otherName: zod_1.z.string().optional(),
    dateOfBirth: zod_1.z.string(),
    qualification: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    role: zod_1.z.string().optional(),
    gender: zod_1.z.string(),
    maritalStatus: zod_1.z.string().optional(),
    yearAdmitted: zod_1.z.date().optional(),
    stateOfOrigin: zod_1.z.string().optional(),
    localGvt: zod_1.z.string().optional(),
    homeTown: zod_1.z.string().optional(),
    residence: zod_1.z.string().optional(),
    phone: zod_1.z.string(),
    email: zod_1.z.string().email(),
    image: zod_1.z.string().optional(), // base64 or URL
});
