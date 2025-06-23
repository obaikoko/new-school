"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectResultSchema = exports.generatePositionsSchema = exports.updateResultPaymentSchema = exports.updateResultSchema = exports.createResultSchema = void 0;
const zod_1 = require("zod");
exports.createResultSchema = zod_1.z.object({
    session: zod_1.z.string().min(3, 'session cannot be less than 3 characters'),
    level: zod_1.z.string().min(3, 'level cannot be less than 3 characters'),
    term: zod_1.z.string().min(3, 'term cannot be less than 3 characters'),
});
exports.updateResultSchema = zod_1.z.object({
    subject: zod_1.z.string().optional(),
    test: zod_1.z.coerce
        .number()
        .max(30, 'test score cannot be more than 30')
        .optional()
        .nullable(),
    exam: zod_1.z.coerce
        .number()
        .max(70, 'exam score cannot be more than 30')
        .optional()
        .nullable(),
    grade: zod_1.z.string().optional(),
    affectiveAssessments: zod_1.z
        .array(zod_1.z.object({
        aCategory: zod_1.z.string(),
        grade: zod_1.z.string(),
    }))
        .optional(),
    psychomotorAssessments: zod_1.z
        .array(zod_1.z.object({
        pCategory: zod_1.z.string(),
        grade: zod_1.z.string(),
    }))
        .optional(),
    teacherRemark: zod_1.z.string().optional(),
    principalRemark: zod_1.z.string().optional(),
});
exports.updateResultPaymentSchema = zod_1.z.object({
    resultId: zod_1.z.string().min(5, 'ResultID should be at least 5 characters'),
    resultFee: (0, zod_1.boolean)(),
});
exports.generatePositionsSchema = zod_1.z.object({
    level: zod_1.z.string().min(3, 'level should be at least 3 characters'),
    subLevel: zod_1.z.string().min(1, 'sub level should be at least 1 character'),
    session: zod_1.z.string().min(3, 'level should be at least 3 characters'),
    term: zod_1.z.string().min(3, 'level should be at least 3 characters'),
});
exports.subjectResultSchema = zod_1.z.object({
    level: zod_1.z.string().min(3, 'level should be at least 3 characters'),
    subjectName: zod_1.z.string().min(3, 'subject should be at least 3 characters'),
    session: zod_1.z.string().min(3, 'level should be at least 3 characters'),
    term: zod_1.z.string().min(3, 'level should be at least 3 characters'),
});
