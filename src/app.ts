import express, { type Express } from "express";
import helmet from "helmet";
import cors from "cors";
import bookRouter from "./routes/books.route";
import borrowRouter from "./routes/borrow.route";
import indexRouter from "./routes";
import { middlewares } from "./middlewares";
import { env } from "./configs/envConfig";
import mongoose from "mongoose";

// Initialize the express app
const app: Express = express();

// connect to database
async function connectToMongoDB() {
	try {
		await mongoose.connect(env.MONGODB_URI, {
			connectTimeoutMS: 1000000000,
		});
		console.log("✅ Connected to MongoDB");
	} catch (error) {
		console.error("❌ MongoDB connection error:", error);
		process.exit(1); // Exit if DB connection fails
	}
}

connectToMongoDB().catch((err) => console.error(err));

// app.enable("trust proxy"); // trust the first proxy
// middlewares
app.use(express.json());
app.use(cors()); // allows to control cors policies
app.use(express.json()); // parse json requests
app.use(express.urlencoded({ extended: true })); // parse incoming form data
app.use(helmet()); // add security http headers: csp

// routes
app.use("/", indexRouter);
app.use("/api/books", bookRouter);
app.use("/api/borrow", borrowRouter);

// not found routes
app.use(middlewares.notFoundRoute);
// global error handler
app.use(middlewares.globalErrorHandler);

export default app;
