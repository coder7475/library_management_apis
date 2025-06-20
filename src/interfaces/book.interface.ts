import type { Document } from "mongoose";

export interface IBook extends Document {
	_id: string;
	title: string;
	author: string;
	genre: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY";
	isbn: string;
	description?: string;
	copies: number;
	available: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
