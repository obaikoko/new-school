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
exports.getNextTermInfo = exports.addNextTermInfo = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const prisma_1 = require("../config/db/prisma");
const studentValidators_1 = require("../validators/studentValidators");
const addNextTermInfo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = studentValidators_1.nextTermDetailsSchema.parse(req.body);
    const { reOpeningDate, session, level, term, nextTermFee, busFee, otherCharges, } = validatedData;
    // Check if entry already exists
    const existingEntry = yield prisma_1.prisma.nextTerm.findFirst({
        where: {
            session,
            level,
            term,
        },
    });
    if (existingEntry) {
        const updatedEntry = yield prisma_1.prisma.nextTerm.update({
            where: { id: existingEntry.id },
            data: Object.assign(Object.assign({ reOpeningDate: new Date(reOpeningDate), nextTermFee }, (busFee !== undefined && { busFee })), (otherCharges !== undefined && { otherCharges })),
        });
        res.status(200).json({
            message: 'Next term details updated successfully',
            data: updatedEntry,
        });
    }
    else {
        const newEntry = yield prisma_1.prisma.nextTerm.create({
            data: Object.assign(Object.assign({ reOpeningDate: new Date(reOpeningDate), session,
                level,
                term,
                nextTermFee }, (busFee !== undefined && { busFee })), (otherCharges !== undefined && { otherCharges })),
        });
        res.status(201).json({
            message: 'Next term details created successfully',
            data: newEntry,
        });
    }
}));
exports.addNextTermInfo = addNextTermInfo;
// Get next term details by query
const getNextTermInfo = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateData = studentValidators_1.getNextTermDetailsSchema.parse(req.query);
    const { level, session, term } = validateData;
    const nextTermInfo = yield prisma_1.prisma.nextTerm.findFirst({
        where: {
            level,
            session,
            term,
        },
    });
    if (!nextTermInfo) {
        res.status(404);
        throw new Error('Next term info not found!');
    }
    res.status(200).json(nextTermInfo);
}));
exports.getNextTermInfo = getNextTermInfo;
