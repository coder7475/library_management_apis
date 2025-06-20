import type { BookMethods, IBook } from "@/interfaces/book.interface";
import { Model, Schema, model } from "mongoose";

const bookSchema = new Schema<IBook, Model<IBook, unknown, BookMethods>, BookMethods>(
	{
		title: { type: String, required: true },
		author: { type: String, required: true },
		genre: {
			type: String,
			required: true,
			enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
		},
		isbn: { type: String, required: true, unique: true },
		description: { type: String },
		copies: { type: Number, required: true, min: 0 },
		available: { type: Boolean, default: true },
	},
	{ timestamps: true },
);

// Instance method to update availability
bookSchema.method('updateAvailability', function updateAvailability() {
	this.available = this.copies > 0;
	return this.save();
});  

export const Book = model<IBook, Model<IBook, {}, BookMethods>>("Book", bookSchema);

