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
exports.graduateStudent = exports.exportStudentsCSV = exports.updateStudent = exports.resetPassword = exports.forgetPassword = exports.deleteStudent = exports.getStudent = exports.getStudentsRegisteredByUser = exports.getAllStudents = exports.registerStudent = exports.authStudent = void 0;
// src/controllers/studentController.ts
const json2csv_1 = require("json2csv");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const studentValidators_1 = require("../validators/studentValidators");
const prisma_1 = require("../config/db/prisma"); // update with actual prisma instance path
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const emailService_1 = require("../services/emailService");
const crypto_1 = __importDefault(require("crypto"));
const usersValidators_1 = require("../validators/usersValidators");
const classUtils_1 = require("../utils/classUtils");
// Authenticate Student
// @route POST api/student/auth
// privacy Public
const authStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = studentValidators_1.authStudentSchema.parse(req.body);
        const { studentId, password } = validatedData;
        const student = yield prisma_1.prisma.student.findFirst({
            where: {
                studentId,
            },
            select: {
                id: true,
                studentId: true,
                firstName: true,
                lastName: true,
                otherName: true,
                password: true,
            },
        });
        if (!student) {
            res.status(400);
            throw new Error('Student does not exist');
        }
        if (!student || !(yield bcrypt_1.default.compare(password, student.password))) {
            res.status(401);
            throw new Error('Invalid Email or Password');
        }
        const authenticatedStudent = yield prisma_1.prisma.student.findFirst({
            where: {
                studentId,
            },
            select: {
                id: true,
                studentId: true,
                firstName: true,
                lastName: true,
                otherName: true,
                dateOfBirth: true,
                level: true,
                subLevel: true,
                isStudent: true,
                isPaid: true,
                gender: true,
                yearAdmitted: true,
                stateOfOrigin: true,
                localGvt: true,
                homeTown: true,
                sponsorEmail: true,
                sponsorName: true,
                sponsorPhoneNumber: true,
                sponsorRelationship: true,
                imageUrl: true,
                createdAt: true,
            },
        });
        res.status(200);
        (0, generateToken_1.default)(res, student.id);
        res.json(authenticatedStudent);
    }
    catch (error) {
        throw error;
    }
}));
exports.authStudent = authStudent;
// ADD  STUDENT
// @route POST api/students/
// @privacy Private ADMIN
const registerStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = studentValidators_1.insertStudentSchema.parse(req.body);
        const { firstName, lastName, otherName, dateOfBirth, level, subLevel, gender, yearAdmitted, stateOfOrigin, localGvt, homeTown, sponsorName, sponsorRelationship, sponsorPhoneNumber, sponsorEmail, } = validatedData;
        // Check if student already exists
        const existingStudent = yield prisma_1.prisma.student.findFirst({
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
        const currentYear = new Date().getFullYear();
        const classCode = classUtils_1.classCodeMapping[level];
        // Step 1: Try to find the tracker
        let tracker = yield prisma_1.prisma.studentIdTracker.findFirst({
            where: {
                year: currentYear,
                level,
            },
        });
        // Step 2: Create or increment
        if (!tracker) {
            tracker = yield prisma_1.prisma.studentIdTracker.create({
                data: {
                    year: currentYear,
                    level,
                    lastNumber: 1,
                },
            });
        }
        else {
            tracker = yield prisma_1.prisma.studentIdTracker.update({
                where: {
                    id: tracker.id,
                },
                data: {
                    lastNumber: tracker.lastNumber + 1,
                },
            });
        }
        const studentId = `BDIS/${currentYear}/${classCode}/${tracker.lastNumber
            .toString()
            .padStart(3, '0')}`;
        const hashedPassword = yield bcrypt_1.default.hash(process.env.DEFAULTPASSWORD, 10);
        const student = yield prisma_1.prisma.student.create({
            data: {
                userId: req.user.id,
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
            },
            select: {
                id: true,
                studentId: true,
                firstName: true,
                lastName: true,
                otherName: true,
                dateOfBirth: true,
                level: true,
                subLevel: true,
                isStudent: true,
                isPaid: true,
                gender: true,
                yearAdmitted: true,
                stateOfOrigin: true,
                localGvt: true,
                homeTown: true,
                sponsorEmail: true,
                sponsorName: true,
                sponsorPhoneNumber: true,
                sponsorRelationship: true,
                imageUrl: true,
                createdAt: true,
            },
        });
        res.status(201).json(student);
    }
    catch (error) {
        throw error;
    }
}));
exports.registerStudent = registerStudent;
// @route   GET /api/students
// @access  Private (Admin or Owner)
const getAllStudents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const [students, totalCount] = yield Promise.all([
        prisma_1.prisma.student.findMany({
            select: {
                id: true,
                studentId: true,
                firstName: true,
                lastName: true,
                otherName: true,
                dateOfBirth: true,
                level: true,
                subLevel: true,
                isStudent: true,
                isPaid: true,
                gender: true,
                yearAdmitted: true,
                stateOfOrigin: true,
                localGvt: true,
                homeTown: true,
                sponsorEmail: true,
                sponsorName: true,
                sponsorPhoneNumber: true,
                sponsorRelationship: true,
                imageUrl: true,
                createdAt: true,
                updatedAt: true,
            },
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            skip: pageSize * (page - 1),
            take: pageSize,
        }),
        prisma_1.prisma.student.count({ where: whereClause }),
    ]);
    res.status(200).json({
        students,
        page,
        totalPages: Math.ceil(totalCount / pageSize),
    });
}));
exports.getAllStudents = getAllStudents;
// GET /api/students/registered-by-me
const getStudentsRegisteredByUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized');
    }
    const userId = req.user.id;
    const page = parseInt(req.query.pageNumber) || 1;
    const pageSize = 30;
    const totalCount = yield prisma_1.prisma.student.count({
        where: {
            userId: userId,
        },
    });
    const students = yield prisma_1.prisma.student.findMany({
        select: {
            id: true,
            studentId: true,
            firstName: true,
            lastName: true,
            otherName: true,
            dateOfBirth: true,
            level: true,
            subLevel: true,
            isStudent: true,
            isPaid: true,
            gender: true,
            yearAdmitted: true,
            stateOfOrigin: true,
            localGvt: true,
            homeTown: true,
            sponsorEmail: true,
            sponsorName: true,
            sponsorPhoneNumber: true,
            sponsorRelationship: true,
            imageUrl: true,
            createdAt: true,
        },
        where: {
            userId: userId,
        },
        orderBy: { createdAt: 'desc' },
        skip: pageSize * (page - 1),
        take: pageSize,
    });
    res.status(200).json({
        students,
        page,
        totalPages: Math.ceil(totalCount / pageSize),
    });
}));
exports.getStudentsRegisteredByUser = getStudentsRegisteredByUser;
// GET /api/students/export
const exportStudentsCSV = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user.isAdmin) {
        res.status(401);
        throw new Error('Unauthorized');
    }
    const students = yield prisma_1.prisma.student.findMany({
        select: {
            studentId: true,
            firstName: true,
            lastName: true,
            otherName: true,
            gender: true,
            level: true,
            subLevel: true,
            yearAdmitted: true,
            stateOfOrigin: true,
            localGvt: true,
        },
    });
    if (!students.length) {
        res.status(404);
        throw new Error('No student data to export');
    }
    // Format current date
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0]; // e.g., '2025-05-25'
    const filename = `students_${formattedDate}.csv`;
    // Convert to CSV
    const parser = new json2csv_1.Parser();
    const csv = parser.parse(students);
    // Set headers to trigger download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.status(200).send(csv);
}));
exports.exportStudentsCSV = exportStudentsCSV;
// GET  STUDENT
// @route GET api/students/:id
// @privacy Private ADMIN
const getStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized User');
    }
    const student = yield prisma_1.prisma.student.findFirst({
        select: {
            id: true,
            studentId: true,
            firstName: true,
            lastName: true,
            otherName: true,
            dateOfBirth: true,
            level: true,
            subLevel: true,
            isStudent: true,
            isPaid: true,
            gender: true,
            yearAdmitted: true,
            stateOfOrigin: true,
            localGvt: true,
            homeTown: true,
            sponsorEmail: true,
            sponsorName: true,
            sponsorPhoneNumber: true,
            sponsorRelationship: true,
            imageUrl: true,
            createdAt: true,
            updatedAt: true,
        },
        where: {
            id: req.params.id,
        },
    });
    if (!student) {
        res.status(400);
        throw new Error('Student not found!');
    }
    res.status(200);
    res.json(student);
}));
exports.getStudent = getStudent;
// @desc Update student
// @route PUT api/students/:id
// @privacy Private ADMIN
const updateStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateData = studentValidators_1.updateStudentSchema.parse(req.body);
    const { firstName, lastName, otherName, dateOfBirth, level, subLevel, gender, yearAdmitted, stateOfOrigin, localGvt, homeTown, sponsorName, sponsorRelationship, sponsorPhoneNumber, sponsorEmail, } = validateData;
    if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized User');
    }
    const student = yield prisma_1.prisma.student.findFirst({
        where: {
            id: req.params.id,
        },
    });
    if (!student) {
        res.status(404);
        throw new Error('No Student Found!');
    }
    const updateStudent = yield prisma_1.prisma.student.update({
        select: {
            id: true,
            studentId: true,
            firstName: true,
            lastName: true,
            otherName: true,
            dateOfBirth: true,
            level: true,
            subLevel: true,
            isStudent: true,
            isPaid: true,
            gender: true,
            yearAdmitted: true,
            stateOfOrigin: true,
            localGvt: true,
            homeTown: true,
            sponsorEmail: true,
            sponsorName: true,
            sponsorPhoneNumber: true,
            sponsorRelationship: true,
            imageUrl: true,
            createdAt: true,
        },
        where: {
            id: req.params.id,
        },
        data: {
            firstName: firstName !== null && firstName !== void 0 ? firstName : student.firstName,
            lastName: lastName !== null && lastName !== void 0 ? lastName : student.lastName,
            otherName: otherName !== null && otherName !== void 0 ? otherName : student.otherName,
            dateOfBirth: dateOfBirth !== null && dateOfBirth !== void 0 ? dateOfBirth : student.dateOfBirth,
            level: level !== null && level !== void 0 ? level : student.level,
            subLevel: subLevel !== null && subLevel !== void 0 ? subLevel : student.subLevel,
            gender: gender !== null && gender !== void 0 ? gender : student.gender,
            yearAdmitted: yearAdmitted !== null && yearAdmitted !== void 0 ? yearAdmitted : student.yearAdmitted,
            stateOfOrigin: stateOfOrigin !== null && stateOfOrigin !== void 0 ? stateOfOrigin : student.stateOfOrigin,
            localGvt: localGvt !== null && localGvt !== void 0 ? localGvt : student.localGvt,
            homeTown: homeTown !== null && homeTown !== void 0 ? homeTown : student.homeTown,
            sponsorName: sponsorName !== null && sponsorName !== void 0 ? sponsorName : student.sponsorName,
            sponsorRelationship: sponsorRelationship !== null && sponsorRelationship !== void 0 ? sponsorRelationship : student.sponsorRelationship,
            sponsorEmail: sponsorEmail !== null && sponsorEmail !== void 0 ? sponsorEmail : student.sponsorEmail,
            sponsorPhoneNumber: sponsorPhoneNumber !== null && sponsorPhoneNumber !== void 0 ? sponsorPhoneNumber : student.sponsorPhoneNumber,
        },
    });
    // Return the updated student details
    res.status(200).json(updateStudent);
}));
exports.updateStudent = updateStudent;
// @desc Delete student
// @route DELETE api/students/:id
// @privacy Private ADMIN
const deleteStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401);
            throw new Error('Unauthorized User');
        }
        const student = yield prisma_1.prisma.student.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!student) {
            res.status(404);
            throw new Error('Student Not Found!');
        }
        const deleteStudent = yield prisma_1.prisma.student.delete({
            where: {
                id: student.id,
            },
        });
        res.status(200).json('Student data deleted');
    }
    catch (error) {
        throw error;
    }
}));
exports.deleteStudent = deleteStudent;
// @desc Send reset password link student
// @route POST api/students/forget-password
// @privacy Public
const forgetPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateData = studentValidators_1.forgetStudentPasswordSchema.parse(req.body);
    const { studentId } = validateData;
    try {
        // Find user by studentId
        const student = yield prisma_1.prisma.student.findFirst({
            where: {
                studentId,
            },
        });
        if (!student) {
            res.status(404);
            throw new Error('Student not found');
        }
        // Generate reset token
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        // Hash the reset token before saving to the database
        const hashedToken = crypto_1.default
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        const newDate = new Date(Date.now() + 60 * 60 * 1000);
        const updateStudent = yield prisma_1.prisma.student.update({
            where: { id: student.id },
            data: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: newDate,
            },
        });
        // Create reset URL to send in email
        const resetUrl = `${process.env.PUBLIC_DOMAIN}/students/reset-password?token=${resetToken}`;
        // Send the email
        (0, emailService_1.sendSingleMail)({
            email: student.sponsorEmail,
            subject: 'Password Reset',
            text: `You requested a password reset. Please go to this link to reset your password: ${resetUrl}`,
        });
        res.status(200);
        res.json('Password reset link has been sent to your email');
    }
    catch (error) {
        throw error;
    }
}));
exports.forgetPassword = forgetPassword;
// @desc Reset password
// @route PUT api/students/reset-password
// @privacy Public
const resetPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        if (!token || typeof token !== 'string') {
            res.status(400).json({ message: 'No token provided' });
            return;
        }
        const { password } = usersValidators_1.resetPasswordSchema.parse(req.body);
        const hashedToken = crypto_1.default
            .createHash('sha256')
            .update(token)
            .digest('hex');
        const student = yield prisma_1.prisma.student.findFirst({
            where: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: {
                    gt: new Date(),
                },
            },
        });
        console.log({ student: student });
        if (!student) {
            res.status(400).json({ message: 'Invalid or expired reset token' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        yield prisma_1.prisma.student.update({
            where: { id: student.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
        });
        yield (0, emailService_1.sendSingleMail)({
            email: student.sponsorEmail,
            subject: `Password Reset Successful`,
            text: `You have successfully reset your password. </br> NOTE: If you did not initiate this process, please change your password or contact the admin immediately.`,
        });
        res.status(200).json({ message: 'Password has been reset successfully' });
    }
    catch (error) {
        throw error;
    }
}));
exports.resetPassword = resetPassword;
const graduateStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Step 1: Fetch all students
    const students = yield prisma_1.prisma.student.findMany();
    const unmappedLevels = [];
    let updatedCount = 0;
    // Step 2: Loop through and update each student
    for (const student of students) {
        const currentLevel = student.level;
        const nextLevel = classUtils_1.classProgression[currentLevel];
        if (nextLevel) {
            yield prisma_1.prisma.student.update({
                where: { id: student.id },
                data: { level: nextLevel },
            });
            updatedCount++;
        }
        else {
            unmappedLevels.push(currentLevel);
        }
    }
    res.status(200).json(Object.assign({ message: `Successfully promoted ${updatedCount} students.` }, (unmappedLevels.length > 0 && {
        warning: `Some levels did not match class progression: ${[
            ...new Set(unmappedLevels),
        ].join(', ')}`,
    })));
}));
exports.graduateStudent = graduateStudent;
