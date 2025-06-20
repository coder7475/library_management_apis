import { Book } from "@/models/book.model";
import { Borrow } from "@/models/borrow.model";
import { CreateBorrowValidator } from "@/schemas/borrow.schema";
import { Request, Response } from "express";

const getAllBorrows = async (req: Request, res: Response): Promise<void> => {
	const borrows = await Borrow.find();
	res.status(200).json({
		success: true,
		message: "Retreived all borrows successfully",
		data: borrows,
	});
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
		}
		else if (book.copies < quantity) {
			res.status(400).json({
				message: "Not enough copie available",
				sucess: false,
				data: book,
			});
		} else {
			book.copies -= quantity;

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
	createBorrow
};
