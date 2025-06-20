import { z } from "zod";

export const bookZodSchema = z.object({
  title: z.string(),
  author: z.string(),
  genre: z.enum(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']),
  isbn: z.string(),
  description: z.string().optional(),
  copies: z.number().int().nonnegative(),
  available: z.boolean().optional(),
});

// Schema to validate user update (partial fields allowed)
export const updateBookSchema = bookZodSchema.partial();

// Zod inferred types for use in TypeScript
export type CreateUserInput = z.infer<typeof bookZodSchema>;
export type UpdateUserInput = z.infer<typeof updateBookSchema>;
