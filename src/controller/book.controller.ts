import { Book } from "@/models/book.model";
import { BookQueryParams, CreateBookValidator } from "@/schemas/book.schema";
import type { Request, Response } from "express";

const getBooks = async (req: Request<{}, {}, {}, BookQueryParams>, res: Response): Promise<void> => {
	try {
		const { filter, sortBy = "createdAt", sort = "asc", limit = 10 } = req.query;

		// query might have filter property
		const query: Partial<Pick<BookQueryParams, "filter">> = {};
		// if filter exits add the filter
		if (filter) query.filter = filter;

		const sortOrder = sort === "desc" ? -1 : 1;

		// retrive the books according to query
		const books = await Book.find(query)
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

export const bookController = {
	getBooks,
	createBook,
};
