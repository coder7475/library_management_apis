"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const globalErrorHandler_1 = __importDefault(require("./globalErrorHandler"));
const notFoundRoute_1 = __importDefault(require("./notFoundRoute"));
const validate_1 = require("./validate");
exports.middlewares = {
    notFoundRoute: notFoundRoute_1.default,
    globalErrorHandler: globalErrorHandler_1.default,
    validate: validate_1.validate,
};
