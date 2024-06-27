"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limitBook = exports.deleteBook = exports.updateBook = exports.createBook = exports.getSingleBook = exports.listBook = void 0;
const book_service_1 = require("./book.service");
const listBook = async (c) => {
    try {
        const limit = Number(c.req.query("limit"));
        const books = await (0, book_service_1.listBookService)();
        if (books == null || books.length == 0) {
            return c.text("No books found", 404);
        }
        return c.json(books, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.listBook = listBook;
const getSingleBook = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid book ID", 400);
        }
        const book = await (0, book_service_1.getSingleBookService)(id);
        if (book == null) {
            return c.text("Book not found", 404);
        }
        return c.json(book, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.getSingleBook = getSingleBook;
const createBook = async (c) => {
    try {
        const book = await c.req.json();
        const result = await (0, book_service_1.createBookService)(book);
        if (!result) {
            return c.text("Book not created", 500);
        }
        return c.json({ message: result }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.createBook = createBook;
const updateBook = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        if (isNaN(id)) {
            return c.text("Invalid book ID", 400);
        }
        const book = await c.req.json();
        const bookExists = await (0, book_service_1.getSingleBookService)(id);
        if (bookExists == null) {
            return c.text("Book not found", 404);
        }
        const result = await (0, book_service_1.updateBookService)(id, book);
        if (!result) {
            return c.text("Book not updated", 500);
        }
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.updateBook = updateBook;
const deleteBook = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) {
        return c.text("Invalid book ID", 400);
    }
    try {
        const bookExists = await (0, book_service_1.getSingleBookService)(id);
        if (bookExists == null) {
            return c.text("Book not found", 404);
        }
        const result = await (0, book_service_1.deleteBookService)(id);
        if (!result) {
            return c.text("Book not deleted", 500);
        }
        return c.json({ message: result }, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.deleteBook = deleteBook;
const limitBook = async (c) => {
    try {
        const limit = Number(c.req.query("limit"));
        if (isNaN(limit)) {
            return c.text("Invalid limit", 400);
        }
        const books = await (0, book_service_1.limitBookService)(limit);
        if (books == null || books.length == 0) {
            return c.text("No books found", 404);
        }
        return c.json(books, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 500);
    }
};
exports.limitBook = limitBook;
