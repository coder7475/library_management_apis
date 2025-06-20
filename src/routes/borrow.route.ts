import { borrowController } from "./../controller/borrow.controller";
import { Router } from "express";
import { validate } from "./../middlewares/validate";
import { borrowZodSchema } from "./../schemas/borrow.schema";

const borrowRouter: Router = Router();

borrowRouter.get("/", borrowController.getAllBorrows);
borrowRouter.post("/", validate(borrowZodSchema), borrowController.createBorrow);

export default borrowRouter;
