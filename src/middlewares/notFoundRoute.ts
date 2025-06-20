import type { RequestHandler } from "express";

const notFoundRoute: RequestHandler = (_req, res) => {
	res.status(404).json({ sucess: false, message: "Route Not Found" });
};

export default notFoundRoute;
