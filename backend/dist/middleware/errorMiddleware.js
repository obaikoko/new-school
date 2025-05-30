"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const zod_1 = require("zod");
const notFound = (req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
exports.notFound = notFound;
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    // ✅ Handle Zod validation errors
    if (err instanceof zod_1.ZodError) {
        const formattedErrors = err.errors.reduce((acc, curr) => {
            const path = curr.path.join('.');
            acc[path] = curr.message;
            return acc;
        }, {});
        res.status(400).json({
            message: 'Validation failed',
            errors: formattedErrors,
        });
        return;
    }
    // ✅ Mongoose bad ObjectId
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }
    // ✅ Default fallback
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};
exports.errorHandler = errorHandler;
