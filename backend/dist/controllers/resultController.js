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
exports.exportManyResults = exports.exportResult = exports.resultData = exports.manualSubjectRemoval = exports.addSubjectToResults = exports.generateBroadsheet = exports.generatePositions = exports.updateResultPayment = exports.deleteResult = exports.updateResult = exports.getStudentResults = exports.getResults = exports.getResult = exports.createResult = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = require("../config/db/prisma");
const subjectResults_1 = require("../utils/subjectResults"); // adjust the import path
const resultValidator_1 = require("../validators/resultValidator");
const getGrade_1 = __importDefault(require("../utils/getGrade"));
const getOrdinalSuffix_1 = __importDefault(require("../utils/getOrdinalSuffix"));
const generateStudentResult_1 = require("../utils/generateStudentResult");
const generateStudentPdf_1 = require("../utils/generateStudentPdf");
// @desc Creates New Result
// @route POST /results/:id
// privacy PRIVATE Users
const createResult = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const validateData = resultValidator_1.createResultSchema.parse(req.body);
    const { session, term, level } = validateData;
    const id = req.params.id;
    const user = req.user;
    if (!user) {
        res.status(401);
        throw new Error('Unauthorized User');
    }
    const student = yield prisma_1.prisma.student.findUnique({
        where: { id },
    });
    if (!student) {
        res.status(400);
        throw new Error('Student does not exist');
    }
    const resultExist = yield prisma_1.prisma.result.findFirst({
        where: {
            studentId: id,
            session,
            term,
            level,
        },
    });
    if (resultExist) {
        res.status(400);
        throw new Error('Result already generated!');
    }
    const addSubjects = (0, subjectResults_1.subjectResults)({ level });
    const baseData = {
        userId: user.id,
        studentId: id,
        level,
        subLevel: student.subLevel,
        firstName: student.firstName,
        lastName: student.lastName,
        otherName: (_a = student.otherName) !== null && _a !== void 0 ? _a : '',
        image: (_b = student.imageUrl) !== null && _b !== void 0 ? _b : '',
        session,
        term,
        subjectResults: addSubjects,
        teacherRemark: '',
        principalRemark: '',
    };
    let result;
    if (level === 'Lower Reception' || level === 'Upper Reception') {
        result = yield prisma_1.prisma.result.create({
            data: baseData,
        });
    }
    else {
        result = yield prisma_1.prisma.result.create({
            data: Object.assign(Object.assign({}, baseData), { position: '', totalScore: 0, averageScore: 0, affectiveAssessment: [
                    { aCategory: 'Attendance', grade: '-' },
                    { aCategory: 'Carefulness', grade: '-' },
                    { aCategory: 'Responsibility', grade: '-' },
                    { aCategory: 'Honesty', grade: '-' },
                    { aCategory: 'Neatness', grade: '-' },
                    { aCategory: 'Obedience', grade: '-' },
                    { aCategory: 'Politeness', grade: '-' },
                    { aCategory: 'Punctuality', grade: '-' },
                ], psychomotor: [
                    { pCategory: 'Handwriting', grade: '-' },
                    { pCategory: 'Drawing', grade: '-' },
                    { pCategory: 'Sport', grade: '-' },
                    { pCategory: 'Speaking', grade: '-' },
                    { pCategory: 'Music', grade: '-' },
                    { pCategory: 'Craft', grade: '-' },
                    { pCategory: 'ComputerPractice', grade: '-' },
                ] }),
        });
    }
    res.status(200).json(result);
}));
exports.createResult = createResult;
// @GET ALL RESULT
// @route GET api/results
// @privacy Private
const getResults = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        res.status(401);
        throw new Error('Unauthorized User');
    }
    const level = req.query.level;
    const keyword = req.query.keyword;
    const page = parseInt(req.query.pageNumber) || 1;
    const pageSize = 30;
    // Prisma filter
    const whereClause = Object.assign(Object.assign({}, (keyword && {
        OR: [
            { firstName: { contains: keyword, mode: 'insensitive' } },
            { lastName: { contains: keyword, mode: 'insensitive' } },
            { otherName: { contains: keyword, mode: 'insensitive' } },
        ],
    })), (level &&
        level !== 'All' && {
        level: { contains: level, mode: 'insensitive' },
    }));
    // If not admin, filter by their level/subLevel
    if (!user.isAdmin) {
        whereClause.level = user.level;
        whereClause.subLevel = user.subLevel;
    }
    const [results, totalCount] = yield Promise.all([
        prisma_1.prisma.result.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            skip: pageSize * (page - 1),
            take: pageSize,
        }),
        prisma_1.prisma.result.count({
            where: whereClause,
        }),
    ]);
    res.status(200).json({
        results,
        page,
        totalPages: Math.ceil(totalCount / pageSize),
    });
}));
exports.getResults = getResults;
// @GET STUDENT RESULT
// @route GET api/results/:id
// @privacy Private
const getResult = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.result.findFirst({
        where: {
            id: req.params.id,
        },
    });
    if (!result) {
        res.status(404);
        throw new Error('Result does not exist');
    }
    // If a student is making the request
    if (req.student) {
        const isOwner = req.student.id.toString() === result.studentId.toString();
        if (!isOwner) {
            res.status(401);
            throw new Error('Unauthorized Access!');
        }
        if (!result.isPaid) {
            res.status(401);
            throw new Error('Unable to access result, Please contact the admin');
        }
    }
    // If a teacher (user) is making the request, allow access regardless of isPaid
    // No additional checks needed unless you want to restrict teachers to only certain results
    res.status(200).json(result);
}));
exports.getResult = getResult;
const getStudentResults = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.params.id;
        const user = req.user;
        if (!studentId) {
            res.status(400);
            throw new Error('invalid studentId');
        }
        const results = yield prisma_1.prisma.result.findMany({
            where: {
                studentId,
            },
        });
        if (!results) {
            res.status(404);
            throw new Error('Results not found!');
        }
        // If a student is making the request
        if (req.student) {
            const isOwner = req.student.id.toString() === studentId.toString();
            if (!isOwner) {
                res.status(401);
                throw new Error('Unauthorized Access!');
            }
        }
        res.status(200).json(results);
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}));
exports.getStudentResults = getStudentResults;
const updateResult = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized User');
    }
    const validatedData = resultValidator_1.updateResultSchema.parse(req.body);
    const { subject, test, exam, grade, affectiveAssessments, psychomotorAssessments, teacherRemark, principalRemark, } = validatedData;
    const result = yield prisma_1.prisma.result.findUnique({
        where: { id: req.params.id },
    });
    if (!result) {
        res.status(404);
        throw new Error('Result not found');
    }
    if (result.level !== req.user.level ||
        result.subLevel !== req.user.subLevel) {
        res.status(401);
        throw new Error('Unable to update this result, Please contact the class teacher');
    }
    // --- Update subjectResults array ---
    let updatedSubjectResults = result.subjectResults;
    if (subject) {
        const index = updatedSubjectResults.findIndex((s) => s.subject === subject);
        if (index === -1) {
            res.status(404);
            throw new Error('Subject not found in results');
        }
        const subjectToUpdate = updatedSubjectResults[index];
        if (result.level === 'Lower Reception' ||
            result.level === 'Upper Reception') {
            subjectToUpdate.grade = grade || subjectToUpdate.grade;
        }
        else {
            subjectToUpdate.testScore = test || subjectToUpdate.testScore;
            subjectToUpdate.examScore = exam || subjectToUpdate.examScore;
            subjectToUpdate.totalScore =
                subjectToUpdate.testScore + subjectToUpdate.examScore;
            subjectToUpdate.grade = (0, getGrade_1.default)(subjectToUpdate.totalScore);
        }
        updatedSubjectResults[index] = subjectToUpdate;
    }
    // --- Update affectiveAssessment array ---
    let updatedAffective = result.affectiveAssessment;
    if (affectiveAssessments === null || affectiveAssessments === void 0 ? void 0 : affectiveAssessments.length) {
        updatedAffective = updatedAffective.map((a) => {
            const incoming = affectiveAssessments.find((x) => x.aCategory === a.aCategory);
            return incoming ? Object.assign(Object.assign({}, a), { grade: incoming.grade }) : a;
        });
    }
    // --- Update psychomotor array ---
    let updatedPsychomotor = result.psychomotor;
    if (psychomotorAssessments === null || psychomotorAssessments === void 0 ? void 0 : psychomotorAssessments.length) {
        updatedPsychomotor = updatedPsychomotor.map((p) => {
            const incoming = psychomotorAssessments.find((x) => x.pCategory === p.pCategory);
            return incoming ? Object.assign(Object.assign({}, p), { grade: incoming.grade }) : p;
        });
    }
    // --- Recalculate total and average ---
    const totalScore = updatedSubjectResults.reduce((acc, s) => acc + s.totalScore, 0);
    const averageScore = totalScore / updatedSubjectResults.length;
    const updatedResult = yield prisma_1.prisma.result.update({
        where: { id: result.id },
        data: {
            subjectResults: updatedSubjectResults,
            affectiveAssessment: updatedAffective,
            psychomotor: updatedPsychomotor,
            totalScore,
            averageScore,
            teacherRemark: teacherRemark || result.teacherRemark,
            principalRemark: principalRemark || result.principalRemark,
        },
    });
    res.status(200).json(updatedResult);
}));
exports.updateResult = updateResult;
const deleteResult = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.result.findFirst({
        where: {
            id: req.params.id,
        },
    });
    if (!result) {
        res.status(404);
        throw new Error('Result not found!');
    }
    yield prisma_1.prisma.result.delete({
        where: {
            id: result.id,
        },
    });
    res.status(200).json({ message: 'Result Deleted successfully' });
}));
exports.deleteResult = deleteResult;
// @desc updates result to paid and makes it visible to student
// @privacy private
const updateResultPayment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateData = resultValidator_1.updateResultPaymentSchema.parse(req.body);
        const { resultId, resultFee } = validateData;
        const result = yield prisma_1.prisma.result.findFirst({
            where: {
                id: resultId,
            },
        });
        if (!result) {
            res.status(404);
            throw new Error('Result not found!');
        }
        yield prisma_1.prisma.result.update({
            where: {
                id: result.id,
            },
            data: {
                isPaid: resultFee,
            },
        });
        res.status(200);
        res.json('Payment status updated successfully');
    }
    catch (error) {
        throw error;
    }
}));
exports.updateResultPayment = updateResultPayment;
const generatePositions = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized User');
    }
    const validatedData = resultValidator_1.generatePositionsSchema.parse(req.body);
    const { level, subLevel, session, term } = validatedData;
    // Fetch all results for the specified class
    const results = yield prisma_1.prisma.result.findMany({
        where: {
            level,
            subLevel,
            session,
            term,
        },
    });
    if (!results || results.length === 0) {
        res.status(404);
        throw new Error(`No results found for ${level}${subLevel} ${session} session`);
    }
    // Sort results by averageScore in descending order
    const sortedResults = results.sort((a, b) => {
        var _a, _b;
        const aAvg = (_a = a.averageScore) !== null && _a !== void 0 ? _a : 0;
        const bAvg = (_b = b.averageScore) !== null && _b !== void 0 ? _b : 0;
        return bAvg - aAvg;
    });
    // Assign positions
    const updatedResults = sortedResults.map((result, index) => ({
        id: result.id,
        position: `${index + 1}${(0, getOrdinalSuffix_1.default)(index + 1)}`,
        numberInClass: results.length,
    }));
    // Batch update using Prisma's `updateMany` alternative: multiple update calls
    yield Promise.all(updatedResults.map(({ id, position, numberInClass }) => prisma_1.prisma.result.update({
        where: { id },
        data: {
            position,
            numberInClass,
        },
    })));
    res.status(200).json({
        message: `${level}${subLevel} ${session} Results Ranked Successfully`,
    });
}));
exports.generatePositions = generatePositions;
const generateBroadsheet = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = resultValidator_1.generatePositionsSchema.parse(req.body);
    const { level, subLevel, session, term } = validatedData;
    // Fetch results filtered by class criteria
    const results = yield prisma_1.prisma.result.findMany({
        where: {
            session,
            term,
            level,
            subLevel,
        },
        include: {
            student: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });
    if (!results || results.length === 0) {
        res.status(404);
        throw new Error(`No results found for ${level}${subLevel} ${session} session`);
    }
    // Transform to broadsheet format
    const broadsheet = results.map((result) => ({
        studentId: result.studentId,
        firstName: result.firstName || 'N/A',
        lastName: result.lastName || 'N/A',
        subjectResults: result.subjectResults.map((subject) => ({
            subject: subject.subject,
            testScore: subject.testScore,
            examScore: subject.examScore,
        })),
    }));
    res.status(200).json(broadsheet);
}));
exports.generateBroadsheet = generateBroadsheet;
const addSubjectToResults = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateData = resultValidator_1.subjectResultSchema.parse(req.body);
    const { session, term, level, subjectName } = validateData;
    const newSubject = {
        subject: subjectName,
        testScore: 0,
        examScore: 0,
        totalScore: 0,
        grade: '-',
    };
    const results = yield prisma_1.prisma.result.findMany({
        where: { session, term, level },
    });
    if (!results.length) {
        res.status(404);
        throw new Error('No results found.');
    }
    const updatedResults = yield Promise.all(results.map((result) => __awaiter(void 0, void 0, void 0, function* () {
        const exists = result.subjectResults.some((s) => s.subject.toLowerCase() === subjectName.toLowerCase());
        if (!exists) {
            const updatedSubjects = [...result.subjectResults, newSubject];
            const totalScore = updatedSubjects.reduce((acc, s) => acc + (s.totalScore || 0), 0);
            const averageScore = updatedSubjects.length > 0
                ? totalScore / updatedSubjects.length
                : 0;
            return prisma_1.prisma.result.update({
                where: { id: result.id },
                data: {
                    subjectResults: updatedSubjects,
                    totalScore,
                    averageScore,
                },
            });
        }
        return result;
    })));
    res.json({
        message: `${subjectName} added to ${updatedResults.length} result(s) for ${level} - ${term} term.`,
    });
}));
exports.addSubjectToResults = addSubjectToResults;
const manualSubjectRemoval = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateData = resultValidator_1.subjectResultSchema.parse(req.body);
    const { session, term, level, subjectName } = validateData;
    const results = yield prisma_1.prisma.result.findMany({
        where: { session, term, level },
    });
    if (!results.length) {
        res.status(404);
        throw new Error('No results found.');
    }
    const updatedResults = yield Promise.all(results.map((result) => __awaiter(void 0, void 0, void 0, function* () {
        const updatedSubjects = result.subjectResults.filter((s) => s.subject !== subjectName);
        const totalScore = updatedSubjects.reduce((acc, s) => acc + (s.totalScore || 0), 0);
        const averageScore = updatedSubjects.length > 0 ? totalScore / updatedSubjects.length : 0;
        return prisma_1.prisma.result.update({
            where: { id: result.id },
            data: {
                subjectResults: updatedSubjects,
                totalScore,
                averageScore,
            },
        });
    })));
    res
        .status(200)
        .json(`${subjectName} removed from ${updatedResults.length} result(s) successfully.`);
}));
exports.manualSubjectRemoval = manualSubjectRemoval;
const resultData = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [results, totalResults, publishedResults, unpublishedResults] = yield Promise.all([
        prisma_1.prisma.result.findMany(),
        prisma_1.prisma.result.count(),
        prisma_1.prisma.result.count({
            where: {
                isPublished: true,
            },
        }),
        prisma_1.prisma.result.count({
            where: {
                isPublished: false,
            },
        }),
    ]);
    res.status(200).json({
        results,
        totalResults,
        publishedResults,
        unpublishedResults,
    });
}));
exports.resultData = resultData;
const exportResult = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.prisma.result.findFirst({
        where: {
            id: req.params.id,
        },
    });
    if (!result) {
        res.status(404);
        throw new Error('Not found');
    }
    if (!result.isPublished) {
        res.status(401);
        throw new Error('Result is not yet published');
    }
    const html = (0, generateStudentResult_1.generateStudentResultHTML)(result);
    const pdfBuffer = yield (0, generateStudentPdf_1.generateStudentPdf)(html);
    const fileName = `students-report-${new Date().toISOString().split('T')[0]}.pdf`;
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
    });
    res.send(pdfBuffer);
}));
exports.exportResult = exportResult;
const exportManyResults = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateData = resultValidator_1.generatePositionsSchema.parse(req.query);
    const { session, level, subLevel, term } = validateData;
    const results = yield prisma_1.prisma.result.findMany({
        where: {
            session,
            level,
            subLevel,
            term,
        },
        orderBy: {
            lastName: 'asc', // optional: sort by student name
        },
    });
    if (results.length === 0) {
        res.status(404);
        throw new Error('No published results found');
    }
    // Generate HTML for all results, separated by page breaks
    const html = results
        .map(generateStudentResult_1.generateStudentResultHTML)
        .join('<div style="page-break-after: always;"></div>');
    const pdfBuffer = yield (0, generateStudentPdf_1.generateStudentPdf)(html);
    const fileName = `all-students-results-${new Date().toISOString().split('T')[0]}.pdf`;
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
    });
    res.send(pdfBuffer);
}));
exports.exportManyResults = exportManyResults;
