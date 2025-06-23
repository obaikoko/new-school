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
exports.resetPassword = exports.forgetPassword = exports.sendMail = exports.deleteUser = exports.getUserById = exports.getUsers = exports.updateUser = exports.getUserProfile = exports.logoutUser = exports.authUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const usersValidators_1 = require("../validators/usersValidators");
const prisma_1 = require("../config/db/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const emailService_1 = require("../services/emailService");
const crypto_1 = __importDefault(require("crypto"));
// @desc Authenticate User
// @route POST /api/users/auth
// @access Public
const authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = usersValidators_1.authUserSchema.parse(req.body);
        const user = yield prisma_1.prisma.user.findUnique({
            where: { email: email },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                level: true,
                subLevel: true,
                isAdmin: true,
                role: true,
                status: true,
                password: true,
            },
        });
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            res.status(401);
            throw new Error('Invalid Email or Password');
        }
        if (user.status === 'suspended') {
            res.status(401);
            throw new Error('Account deactivated');
        }
        const authenticatedUser = yield prisma_1.prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                level: true,
                subLevel: true,
                isAdmin: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });
        (0, generateToken_1.default)(res, user.id);
        res.status(200).json(authenticatedUser);
    }
    catch (error) {
        throw error;
    }
}));
exports.authUser = authUser;
const logoutUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        res.status(200);
        res.json({ message: 'Logged out user' });
    }
    catch (error) {
        throw error;
    }
}));
exports.logoutUser = logoutUser;
// @desc Register new User
// @privacy Private Admin Only
// @route POST /api/users/register
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateData = usersValidators_1.insertUserSchema.parse(req.body);
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
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                level: true,
                subLevel: true,
                isAdmin: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });
        res.status(201);
        res.json(user);
    }
    catch (error) {
        throw error;
    }
}));
exports.registerUser = registerUser;
// @desc gets users profile
// @Route GET /api/users
// @privacy Private
const getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                level: true,
                subLevel: true,
                isAdmin: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        res.status(200);
        res.json(user);
    }
    catch (error) {
        throw error;
    }
}));
exports.getUserProfile = getUserProfile;
// @description This is to authenticate users
// @Route PUT /api/users/:id
// @privacy Private Admin
const updateUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateData = usersValidators_1.updateUserSchema.parse(req.body);
        const { userId, firstName, lastName, email, password, level, role, status, subLevel, isAdmin, } = validateData;
        const user = yield prisma_1.prisma.user.findFirst({
            where: { id: userId },
        });
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        // Update fields conditionally
        if (password) {
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            yield prisma_1.prisma.user.update({
                where: { id: user.id },
                data: {
                    password: hashedPassword,
                },
            });
        }
        const updateUser = yield prisma_1.prisma.user.update({
            where: { id: user.id },
            data: {
                firstName: firstName !== null && firstName !== void 0 ? firstName : user.firstName,
                lastName: lastName !== null && lastName !== void 0 ? lastName : user.lastName,
                email: email !== null && email !== void 0 ? email : user.email,
                level: level !== null && level !== void 0 ? level : user.level,
                role: role !== null && role !== void 0 ? role : user.role,
                status: status !== null && status !== void 0 ? status : user.status,
                subLevel: subLevel !== null && subLevel !== void 0 ? subLevel : user.subLevel,
                isAdmin: isAdmin !== null && isAdmin !== void 0 ? isAdmin : user.isAdmin,
            },
        });
        const updatedUser = yield prisma_1.prisma.user.findFirst({
            where: {
                id: updateUser.id,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                level: true,
                subLevel: true,
                isAdmin: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        throw error;
    }
}));
exports.updateUser = updateUser;
// @description This is to get all users
// @Route GET /api/users
// @privacy Private ADMIN
const getUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                level: true,
                subLevel: true,
                isAdmin: true,
                role: true,
                status: true,
                createdAt: true,
            },
        });
        res.json(users);
    }
    catch (error) {
        throw error;
    }
}));
exports.getUsers = getUsers;
// @description This is to get user by ID
// @Route POST /api/users/:id
// @privacy Private ADMIN
const getUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.prisma.user.findFirst({
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                level: true,
                subLevel: true,
                isAdmin: true,
                role: true,
                status: true,
                createdAt: true,
            },
            where: {
                id: req.params.id,
            },
        });
        if (!user) {
            res.status(404);
            throw new Error('User not found!');
        }
        res.status(200).json(user);
    }
    catch (error) {
        throw error;
    }
}));
exports.getUserById = getUserById;
// @description This is to delete a user
// @Route DELETE /api/users/:id
// @privacy Private ADMIN
const deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                id: req.params.id,
            },
        });
        if (user) {
            if (user.isAdmin) {
                res.status(400);
                throw new Error('Can not delete admin user');
            }
            yield prisma_1.prisma.user.delete({
                where: {
                    id: user.id,
                },
            });
            res.json({ message: 'User removed' });
        }
        else {
            res.status(404);
            throw new Error('User not found');
        }
    }
    catch (error) {
        throw error;
    }
}));
exports.deleteUser = deleteUser;
// @desc Send mail to single parent/sponsor
// @route POST /users/mails
// @privacy Private Admin
const sendMail = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validateData = usersValidators_1.sendSingleMailSchema.parse(req.body);
        const { email, subject, text } = validateData;
        const user = req.user;
        if (!user) {
            res.status(401);
            throw new Error('Unauthorized!');
        }
        if (!user.isAdmin) {
            res.status(401);
            throw new Error('Unauthorized Contact the adminitration');
        }
        (0, emailService_1.sendSingleMail)({ email, subject, text });
        res.status(200);
        res.json('Email sent successfully');
    }
    catch (error) {
        throw error;
    }
}));
exports.sendMail = sendMail;
// @desc Send reset password link
// @route POST api/users/forget-password
// @privacy Public
const forgetPassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validateData = usersValidators_1.forgetPasswordSchema.parse(req.body);
    const { email } = validateData;
    try {
        if (!email) {
            res.status(400);
            throw new Error('Email Required');
        }
        // Find user by email
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }
        // Generate reset token
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        // Hash the reset token before saving to the database
        const hashedToken = crypto_1.default
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        const newDate = new Date(Date.now() + 60 * 60 * 1000);
        const updateUser = yield prisma_1.prisma.user.update({
            where: { email: email },
            data: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: newDate,
            },
        });
        // Create reset URL to send in email
        const resetUrl = `${process.env.PUBLIC_DOMAIN}/reset-password?token=${resetToken}`;
        // Send the email
        (0, emailService_1.sendSingleMail)({
            email,
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
// @route PUT api/users/reset-password
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
        const user = yield prisma_1.prisma.user.findFirst({
            where: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: {
                    gt: new Date(),
                },
            },
        });
        if (!user) {
            res.status(400).json({ message: 'Invalid or expired reset token' });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        yield prisma_1.prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
            },
        });
        yield (0, emailService_1.sendSingleMail)({
            email: user.email,
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
