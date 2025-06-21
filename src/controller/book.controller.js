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
exports.bookController = void 0;
const book_model_1 = require("models/book.model");
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "asc", limit = 10 } = req.query;
        const sortOrder = sort === "desc" ? -1 : 1;
        const books = yield book_model_1.Book.find(filter ? { genre: filter } : {})
            .sort({ [sortBy]: sortOrder })
            .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Books retrieved failed",
            error: error.message,
        });
    }
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findById(bookId);
        if (!book) {
            res.status(404).json({
                message: "Book Not Found",
                sucess: false,
                data: book,
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Book retrieved successfully",
                data: book,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to retrieve book",
            sucess: false,
            error: error.message,
        });
    }
});
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // use instance method to save
        const book = new book_model_1.Book(req.body);
        yield book.save();
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to create book",
            sucess: false,
            error: error.message,
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const updates = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate(bookId, updates, { new: true });
        if (!book) {
            res.status(404).json({
                message: "Book Not Found",
                sucess: false,
                data: book,
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to update book",
            sucess: false,
            error: error.message,
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const book = yield book_model_1.Book.findByIdAndDelete(bookId);
        if (!book) {
            res.status(404).json({
                message: "Book Not Found",
                sucess: false,
                data: book,
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Failed to delete book",
            sucess: false,
            error: error.message,
        });
    }
});
exports.bookController = {
    getBooks,
    createBook,
    getBookById,
    updateBook,
    deleteBook,
};
