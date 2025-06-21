"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexRouter = (0, express_1.Router)();
indexRouter.get("/", (_req, res) => {
    res.send("Welcome to Library Management APIS!");
});
exports.default = indexRouter;
