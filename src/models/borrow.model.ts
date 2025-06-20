import type { IBorrow } from "@/interfaces/borrow.interface";
import mongoose, { Schema } from "mongoose";

const borrowSchema = new Schema<IBorrow>(
	{
		bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
		quantity: { type: Number, required: true, min: 1 },
		dueDate: { type: Date, required: true },
	},
	{ timestamps: true },
);

export const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);
