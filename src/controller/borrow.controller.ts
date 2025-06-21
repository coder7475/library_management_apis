import { Book } from "@/models/book.model";
import { Borrow } from "@/models/borrow.model";
import { CreateBorrowValidator } from "@/schemas/borrow.schema";
import { Request, Response } from "express";

const getAllBorrows = async (req: Request, res: Response): Promise<void> => {
	try {
		const summary = await Borrow.aggregate([
			{
				$group: {
					_id: "$book", // Group by book ID
					totalQuantity: { $sum: "$quantity" },
				},
			},
			{
				$lookup: {
					from: "books", // Match the name of your books collection (lowercase plural)
					localField: "_id",
					foreignField: "_id",
					as: "book",
				},
			},
			{
				$unwind: "$book", // Unwrap book array into object
			},
			{
				$project: {
					_id: 0,
					book: {
						title: "$book.title",
						isbn: "$book.isbn",
					},
					totalQuantity: 1
				},
			},
		]);

		res.status(200).json({
			success: true,
			message: "Borrowed books summary retrieved successfully",
			data: summary,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to get books summary",
			sucess: false,
			error: (error as Error).message,
		});
	}
};

const createBorrow = async (
	req: Request<Record<string, never>, Record<string, never>, CreateBorrowValidator>,
	res: Response,
): Promise<void> => {
	try {
		const { book: bookId, quantity, dueDate } = req.body;

		const book = await Book.findById(bookId);

		// business logic
		if (!book) {
			res.status(404).json({
				message: "Book Not Found",
				sucess: false,
				data: book,
			});
		} else if (book.copies < quantity) {
			res.status(400).json({
				message: "Not enough copies available",
				sucess: false,
				data: book,
			});
		} else {
			// Deduct the requested quantity from the book’s copies
			book.copies -= quantity;
			// use instance method make available to false for copies 0
			book.updateAvailability();
		}

		// use instance method to create borrow
		const borrow = new Borrow(req.body);
		await borrow.save();

		res.status(201).json({
			success: true,
			message: "Book borrowed successfully",
			data: borrow,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to borrow book",
			sucess: false,
			error: (error as Error).message,
		});
	}
};

export const borrowController = {
	getAllBorrows,
	createBorrow,
};
