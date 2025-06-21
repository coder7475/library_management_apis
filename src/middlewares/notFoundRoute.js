"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundRoute = (_req, res) => {
    res.status(404).json({ sucess: false, message: "Route Not Found" });
};
exports.default = notFoundRoute;
