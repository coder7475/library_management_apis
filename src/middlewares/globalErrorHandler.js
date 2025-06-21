"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envConfig_1 = require("configs/envConfig");
const globalErrorHandler = (err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        message,
        stack: envConfig_1.env.NODE_ENV === "production" ? undefined : err.stack,
    });
};
exports.default = () => globalErrorHandler;
