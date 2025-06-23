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
exports.userData = exports.studentsData = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = require("../config/db/prisma");
const classUtils_1 = require("../utils/classUtils");
const studentsData = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(401);
        throw new Error('Unauthorized User');
    }
    const allStudents = yield prisma_1.prisma.student.findMany();
    const genderCounts = { Male: 0, Female: 0 };
    const levelGenderCounts = {};
    // Initialize levelGenderCounts
    for (const level of classUtils_1.levels) {
        levelGenderCounts[level] = { Male: 0, Female: 0 };
    }
    let paidFees = 0;
    for (const student of allStudents) {
        const gender = student.gender;
        const level = student.level;
        if (gender === 'Male' || gender === 'Female') {
            genderCounts[gender]++;
        }
        if (classUtils_1.levels.includes(level)) {
            levelGenderCounts[level][gender]++;
        }
        if (student.isPaid) {
            paidFees++;
        }
    }
    const response = {
        totalStudents: allStudents.length,
        paidFees,
        Male: genderCounts.Male,
        Female: genderCounts.Female,
    };
    // Append each level/gender count to the response
    for (const level of classUtils_1.levels) {
        const safeKey = level.replace(/\s+/g, '');
        response[`${safeKey}Males`] = levelGenderCounts[level].Male;
        response[`${safeKey}Females`] = levelGenderCounts[level].Female;
    }
    res.json(response);
}));
exports.studentsData = studentsData;
const userData = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [total, adminUsers, activeUsers, suspendedUsers] = yield Promise.all([
        prisma_1.prisma.user.count(),
        prisma_1.prisma.user.count({
            where: {
                isAdmin: true,
            },
        }),
        prisma_1.prisma.user.count({
            where: {
                status: 'active',
            },
        }),
        prisma_1.prisma.user.count({
            where: {
                status: 'suspended',
            },
        }),
    ]);
    res.status(200).json({
        totalUsers: total,
        adminUsers: adminUsers,
        activeUsers: activeUsers,
        suspendedUsers: suspendedUsers,
    });
}));
exports.userData = userData;
