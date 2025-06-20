import { borrowController } from "@/controller/borrow.controller";
import { Router } from "express";

const borrowRouter = Router();

borrowRouter.get("/", borrowController.getAllBorrows);

export default borrowRouter;