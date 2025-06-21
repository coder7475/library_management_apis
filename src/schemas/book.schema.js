"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookQuerySchema = exports.updateBookSchema = exports.bookZodSchema = void 0;
const zod_1 = require("zod");
// for post books route
// create book schema
exports.bookZodSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    genre: zod_1.z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]),
    isbn: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z.number().int().nonnegative(),
    available: zod_1.z.boolean().optional(),
});
// book update schema (partial fields allowed)
exports.updateBookSchema = exports.bookZodSchema.partial();
// for get books route
// book query schema
exports.bookQuerySchema = zod_1.z.object({
    filter: zod_1.z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]).optional(),
    sortBy: zod_1.z.string().optional(),
    sort: zod_1.z.enum(["asc", "desc"]).optional(),
    limit: zod_1.z.coerce.number().optional(),
});
