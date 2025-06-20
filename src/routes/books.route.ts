import { Router } from "express";
import { middlewares } from "@/middlewares";
import { bookZodSchema } from "@/schemas/book.schema";

const bookRouter = Router();

bookRouter.post("/", middlewares.validate(bookZodSchema))
// userRoute.post("/", middlewares.validate(), userController.createUser);
// userRoute.get("/", userController.getUsers);

export default bookRouter;
