import { Router } from "express";
import { middlewares } from "@/middlewares";
import { bookQuerySchema, bookZodSchema, updateBookSchema } from "@/schemas/book.schema";
import { bookController } from "@/controller/book.controller";

const bookRouter = Router();

bookRouter.post("/", middlewares.validate(bookZodSchema), bookController.createBook);
bookRouter.get("/", middlewares.validate(bookQuerySchema), bookController.getBooks);
bookRouter.get("/:bookId", bookController.getBookById);
bookRouter.put("/:bookId", middlewares.validate(updateBookSchema), bookController.updateBook);

export default bookRouter;
