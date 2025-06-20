import { Router } from "express";
import { middlewares } from "@/middlewares";
import { bookQuerySchema, bookZodSchema } from "@/schemas/book.schema";
import { bookController } from "@/controller/book.controller";

const bookRouter = Router();

bookRouter.post("/", middlewares.validate(bookZodSchema), bookController.createBook)
bookRouter.get("/", middlewares.validate(bookQuerySchema), bookController.getBooks)

export default bookRouter;
