import { Router } from "express";
import { bookQuerySchema, bookZodSchema, updateBookSchema } from "../schemas/book.schema";
import { bookController } from "./../controller/book.controller";
import { validate } from "./../middlewares/validate";

const bookRouter: Router = Router();

bookRouter.post("/", validate(bookZodSchema), bookController.createBook);
bookRouter.get("/", validate(bookQuerySchema), bookController.getBooks);
bookRouter.get("/:bookId", bookController.getBookById);
bookRouter.put("/:bookId", validate(updateBookSchema), bookController.updateBook);
bookRouter.delete("/:bookId", bookController.deleteBook);

export default bookRouter;
