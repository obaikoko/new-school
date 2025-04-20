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
exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validators_1 = require("../validators");
const prisma_1 = require("../db/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = __importDefault(require("zod"));
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateData = validators_1.insertUserSchema.parse(req.body);
        const { firstName, lastName, email, password } = validateData;
        // check if user already exist
        const userExit = yield prisma_1.prisma.user.findFirst({
            where: {
                email: email,
            },
        });
        if (userExit) {
            res.status(400);
            throw new Error('User already exist');
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // register new user
        const user = yield prisma_1.prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        });
        res.status(201);
        res.json({
            message: 'User registered successfully',
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    }
    catch (error) {
        if (error instanceof zod_1.default.ZodError) {
            res.status(400).json({
                message: 'Validation failed',
                errors: error.errors,
            });
        }
        else {
            throw error;
        }
    }
}));
exports.registerUser = registerUser;
