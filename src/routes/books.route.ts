import { Router } from "express";
import { userController } from "@/controller/book.controller";
import { middlewares } from "@/middlewares";
import { createUserSchema } from "@/schemas/user.schema";


const bookRouter = Router();

// userRoute.post("/", middlewares.validate(createUserSchema), userController.createUser);
userRoute.get("/", userController.getUsers);

export default bookRouter;
