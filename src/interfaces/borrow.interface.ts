import { Document } from "mongoose";

export interface IBorrow extends Document {
    _id: string;
    bookId: string; // reference to Book._id
    quantity: number;
    dueDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }
  