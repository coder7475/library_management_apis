import { Book } from "@/models/book.model";
import type { BookQueryParams, CreateBookValidator, UpdateBookValidator } from "@/schemas/book.schema";
import type { Request, Response } from "express";

const getBooks = async (req: Request<unknown, unknown, unknown, BookQueryParams>, res: Response): Promise<void> => {
	try {
		const { filter, sortBy = "createdAt", sort = "asc", limit = 10 } = req.query;
		const sortOrder = sort === "desc" ? -1 : 1;

		const books = await Book.find(filter ? { genre: filter } : {})
			.sort({ [sortBy]: sortOrder })
			.limit(limit);

		res.status(200).json({
			success: true,
			message: "Books retrieved successfully",
			data: books,
		});
	} catch (error) {
		res.status(400).json({
			success: false,
			message: "Books retrieved failed",
			error: (error as Error).message,
		});
	}
};

const getBookById = async (req: Request<{ bookId: string }>, res: Response) => {
	try {
		const { bookId } = req.params;

		const book = await Book.findById(bookId);

		if (!book) {
			res.status(404).json({
				message: "Book Not Found",
				sucess: false,
				data: book,
			});
		} else {
			res.status(200).json({
				success: true,
				message: "Book retrieved successfully",
				data: book,
			});
		}
	} catch (error) {
		res.status(500).json({
			message: "Failed to retrieve book",
			sucess: false,
			error: (error as Error).message,
		});
	}
};

const createBook = async (
	req: Request<Record<string, never>, Record<string, never>, CreateBookValidator>,
	res: Response,
): Promise<void> => {
	try {
		// use instance method to save
		const book = new Book(req.body);
		await book.save();

		res.status(201).json({
			success: true,
			message: "Book created successfully",
			data: book,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to create book",
			sucess: false,
			error: (error as Error).message,
		});
	}
};

const updateBook = async (req: Request<{ bookId: string }, unknown, UpdateBookValidator>, res: Response) => {
	try {
		const { bookId } = req.params;
		const updates = req.body;

		const book = await Book.findByIdAndUpdate(bookId, updates, { new: true });

		if (!book) {
			res.status(404).json({
				message: "Book Not Found",
				sucess: false,
				data: book,
			});
		}

		res.status(200).json({
			success: true,
			message: "Book updated successfully",
			data: book,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to update book",
			sucess: false,
			error: (error as Error).message,
		});
	}
};

export const bookController = {
	getBooks,
	createBook,
	getBookById,
	updateBook,
};
