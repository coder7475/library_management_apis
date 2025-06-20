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

export interface BookQueryParams {
	filter?: "FICTION" | "NON_FICTION" | "SCIENCE" | "HISTORY" | "BIOGRAPHY" | "FANTASY"; // genre filter
	sortBy?: string; // field to sort by, e.g., 'createdAt'
	sort?: "asc" | "desc"; // sort direction
	limit?: number; // number of results
}
