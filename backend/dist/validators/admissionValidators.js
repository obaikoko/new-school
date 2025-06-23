"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admissionSchema = void 0;
const zod_1 = require("zod");
exports.admissionSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string().min(7),
    childName: zod_1.z.string().min(1),
    dateOfBirth: zod_1.z.string().transform((val) => new Date(val)),
    gender: zod_1.z.string(),
    level: zod_1.z.string(),
});
