import { Book } from "@/models/book.model";
import { CreateBookValidator } from "@/schemas/book.schema";
import type { Request, Response } from "express";

const getBooks = async (_req: Request, res: Response): Promise<void> => {
	const allBooks = await Book.find();
	res.json({
		status: 200,
		message: "Fetched Successfully",
		data: allBooks
	});
};

const createBook = async (req: Request<Record<string, never>, Record<string, never>, CreateBookValidator>, res: Response): Promise<void> => {
	try {
		// use instance method to save
		const book = new Book(req.body);
		await book.save();

		res.status(201).json({
			success: true,
			message: "Book created successfully",
			data: book,
		});

	}
	catch (error) {

		res.status(500).json({
			message: "Failed to create book",
			sucess: false,
			error: (error as Error).message,
		});

	}
};

export const bookController = {
	getBooks,
	createBook,
};
