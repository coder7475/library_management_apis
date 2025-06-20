import { Borrow } from "@/models/borrow.model";
import { Request, Response } from "express";

const getAllBorrows = async (req: Request, res: Response): Promise<void> => {
	const borrows = await Borrow.find();
	res.status(200).json({
		success: true,
		message: "Retreived all borrows successfully",
		data: borrows,
	});
};

export const borrowController = {
	getAllBorrows,
};
