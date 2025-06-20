import type { Request, Response } from "express";
import { User } from "@/models/book.model";
import type { CreateUserInput } from "@/schemas/book.schema";

const getUsers = async (_req: Request, res: Response): Promise<void> => {
	const allUsers = await User.find();
	res.json({
		status: 200,
		message: "Fetched Successfully",
		data: allUsers,
	});
};

const createUser = async (req: Request<Record<string, never>, Record<string, never>, CreateUserInput>, res: Response): Promise<void> => {
	try {
		const user = new User(req.body);
		await user.save();

		res.status(201).json({
			status: 201,
			message: "User created successfully",
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			status: 500,
			message: "Failed to create user",
			error: (error as Error).message,
		});
	}
};

export const userController = {
	getUsers,
	createUser,
};
