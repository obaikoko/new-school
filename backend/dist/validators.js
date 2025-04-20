"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUserSchema = void 0;
const zod_1 = require("zod");
exports.insertUserSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    firstName: zod_1.z.string().min(3, 'First name must be at least 3 letters'),
    lastName: zod_1.z.string().min(3, 'Last name must be at least 3 letters'),
    level: zod_1.z.string().optional().nullable(),
    subLevel: zod_1.z.string().optional().nullable(),
    password: zod_1.z.string(),
});
