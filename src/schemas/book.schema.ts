import { z } from "zod";

// create book schema
export const bookZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.enum(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number().int().nonnegative(),
  available: z.boolean().optional(),
});

// book update schema (partial fields allowed)
export const updateBookSchema = bookZodSchema.partial();

// validators
export type CreateBookValidator = z.infer<typeof bookZodSchema>;
export type UpdateBookValidator = z.infer<typeof updateBookSchema>;
