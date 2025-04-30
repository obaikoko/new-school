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
exports.updateUserProfile = exports.getUserProfile = exports.authUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validators_1 = require("../validators");
const prisma_1 = require("../config/db/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// @desc Register new User
// @privacy Private Admin Only
// @route POST /api/users/register
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
        // hash password before saving
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
        throw error;
    }
}));
exports.registerUser = registerUser;
// @desc Authenticate User
// @route POST /api/users/auth
// @access Public
const authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = validators_1.authUserSchema.parse(req.body);
        const user = yield prisma_1.prisma.user.findUnique({ where: { email } });
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            res.status(401);
            throw new Error('Invalid Email or Password');
        }
        (0, generateToken_1.default)(res, user.id);
        res.status(200).json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    catch (error) {
        throw error;
    }
}));
exports.authUser = authUser;
// @des gets users profile
// @Route GET /api/users
// @privacy Private
const getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            },
        });
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.status(200);
        res.json({
            _id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({
                message: 'Validation failed',
                errors: error.errors,
            });
            return;
        }
        throw error;
    }
}));
exports.getUserProfile = getUserProfile;
// @description This is to authenticate users
// @Route PUT /api/users/
// @privacy Private
const updateUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateData = validators_1.updateUserSchema.parse(req.body);
    const { firstName, lastName, email } = validateData;
    const user = yield prisma_1.prisma.user.findUnique({
        where: { id: req.params.id },
    });
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    // Update fields conditionally
    const updatedUser = yield prisma_1.prisma.user.update({
        where: { id: user.id },
        data: {
            firstName: firstName !== null && firstName !== void 0 ? firstName : user.firstName,
            lastName: lastName !== null && lastName !== void 0 ? lastName : user.lastName,
            email: email !== null && email !== void 0 ? email : user.email,
        },
    });
    res.status(200).json({
        _id: updatedUser.id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
    });
}));
exports.updateUserProfile = updateUserProfile;
