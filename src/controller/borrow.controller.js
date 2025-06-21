"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowController = void 0;
const book_model_1 = require("models/book.model");
const borrow_model_1 = require("models/borrow.model");
const getAllBorrows = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
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
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to get books summary",
            sucess: false,
            error: error.message,
        });
    }
});
const createBorrow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity } = req.body;
        const book = yield book_model_1.Book.findById(bookId);
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
                message: "Not enough copies available",
                sucess: false,
                data: book,
            });
        }
        else {
            // Deduct the requested quantity from the book’s copies
            book.copies -= quantity;
            // use instance method make available to false for copies 0
            book.updateAvailability();
        }
        // use instance method to create borrow
        const borrow = new borrow_model_1.Borrow(req.body);
        yield borrow.save();
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to borrow book",
            sucess: false,
            error: error.message,
        });
    }
});
exports.borrowController = {
    getAllBorrows,
    createBorrow,
};
