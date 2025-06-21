"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowZodSchema = void 0;
const zod_1 = require("zod");
exports.borrowZodSchema = zod_1.z.object({
    book: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive(),
    dueDate: zod_1.z.coerce.date(),
});
