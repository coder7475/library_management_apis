import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (_req, res) => {
	res.send("Welcome to Library Management APIS!");
});

export default indexRouter;
