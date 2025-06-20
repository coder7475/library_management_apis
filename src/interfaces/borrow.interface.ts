import type { Document, ObjectId } from "mongoose";

export interface IBorrow extends Document {
	_id: string;
	book: ObjectId; // reference to Book._id
	quantity: number;
	dueDate: Date;
	createdAt?: Date;
	updatedAt?: Date;
}
