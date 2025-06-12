"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResultSchema = void 0;
const zod_1 = require("zod");
exports.createResultSchema = zod_1.z.object({
    session: zod_1.z.string().min(3, 'session cannot be less than 3 characters'),
    level: zod_1.z.string().min(3, 'level cannot be less than 3 characters'),
    term: zod_1.z.string().min(3, 'term cannot be less than 3 characters'),
});
