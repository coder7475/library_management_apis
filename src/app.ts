import express from "express";
import indexRouter from "@/routes";
import userRoute from "@/routes/books.route";
import { middlewares } from "@/middlewares";
import helmet from "helmet";
import cors from "cors";
import bookRouter from "@/routes/books.route";

// Initialize the express app
const app = express();

// middlewares
app.use(express.json());
app.use(cors()); // allows to control cors policies
app.use(express.json()); // parse json requests
app.use(express.urlencoded({ extended: true })); // parse incoming form data
app.use(helmet()); // add security http headers: csp

// routes
app.use("/", indexRouter);
app.use("/books", bookRouter);
// app.use("/borrow",)

// not found routes
app.use(middlewares.notFoundRoute);
// global error handler
app.use(middlewares.globalErrorHandler);

export default app;
