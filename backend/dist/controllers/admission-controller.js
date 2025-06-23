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
exports.sendMail = exports.deleteAdmission = exports.getSingleRequest = exports.getAllRequest = exports.createAdmission = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = require("../config/db/prisma");
const admissionValidators_1 = require("../validators/admissionValidators");
const emailService_1 = require("../services/emailService");
const createAdmission = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateData = admissionValidators_1.admissionSchema.parse(req.body);
    const { firstName, lastName, email, phone, childName, dateOfBirth, gender, level, } = validateData;
    const admission = yield prisma_1.prisma.admission.create({
        data: {
            firstName,
            lastName,
            email,
            phone,
            childName,
            dateOfBirth,
            gender,
            level,
        },
    });
    if (admission) {
        yield (0, emailService_1.sendSingleMail)({
            email: 'jesseobinna7@gmail.com',
            subject: 'Admission Request',
            text: `${firstName} ${lastName} has requested ${childName} to be enrolled into ${level}`,
        });
        yield (0, emailService_1.sendSingleMail)({
            email,
            subject: 'Admission Request',
            text: `Dear ${firstName}, your request to enroll ${childName} into BENDONALD INTERNATIONAL SCHOOL has been received and is being processed.`,
        });
        res.status(200).json('Form submitted successfully');
    }
}));
exports.createAdmission = createAdmission;
const getAllRequest = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admission = yield prisma_1.prisma.admission.findMany({
        orderBy: { createdAt: 'desc' },
    });
    res.status(200).json({ admission, totalAdmission: admission.length });
}));
exports.getAllRequest = getAllRequest;
const getSingleRequest = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admission = yield prisma_1.prisma.admission.findUnique({
        where: { id: req.params.id },
    });
    if (!admission) {
        res.status(404);
        throw new Error('Not Found!');
    }
    res.status(200).json(admission);
}));
exports.getSingleRequest = getSingleRequest;
const sendMail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, text } = req.body;
    const admission = yield prisma_1.prisma.admission.findUnique({
        where: { id: req.params.id },
    });
    if (!admission) {
        res.status(404);
        throw new Error('Not found!');
    }
    yield (0, emailService_1.sendSingleMail)({
        email: admission.email,
        subject,
        text,
    });
    res.status(200).json('Email sent successfully');
}));
exports.sendMail = sendMail;
const deleteAdmission = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.prisma.admission.delete({
        where: { id: req.params.id },
    });
    res.status(200).json('Admission request deleted successfully');
}));
exports.deleteAdmission = deleteAdmission;
