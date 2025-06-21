"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const books_route_1 = __importDefault(require("./routes/books.route"));
const borrow_route_1 = __importDefault(require("./routes/borrow.route"));
const routes_1 = __importDefault(require("routes"));
const middlewares_1 = require("middlewares");
// Initialize the express app
const app = (0, express_1.default)();
// middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)()); // allows to control cors policies
app.use(express_1.default.json()); // parse json requests
app.use(express_1.default.urlencoded({ extended: true })); // parse incoming form data
app.use((0, helmet_1.default)()); // add security http headers: csp
// routes
app.use("/", routes_1.default);
app.use("/api/books", books_route_1.default);
app.use("/api/borrow", borrow_route_1.default);
// not found routes
app.use(middlewares_1.middlewares.notFoundRoute);
// global error handler
app.use(middlewares_1.middlewares.globalErrorHandler);
exports.default = app;
