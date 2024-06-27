"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookService = exports.updateBookService = exports.createBookService = exports.getSingleBookService = exports.limitBookService = exports.listBookService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../drizzle/schema");
const db_1 = require("../drizzle/db");
const listBookService = async (limit) => {
    if (limit) {
        return await db_1.default.query.Books.findMany({
            limit,
        });
    }
    return await db_1.default.query.Books.findMany();
};
exports.listBookService = listBookService;
const limitBookService = async (limit) => {
    return await db_1.default.select().from(schema_1.Books).limit(limit);
};
exports.limitBookService = limitBookService;
const getSingleBookService = async (id) => {
    return await db_1.default.query.Books.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.Books.id, id),
    });
};
exports.getSingleBookService = getSingleBookService;
const createBookService = async (book) => {
    await db_1.default.insert(schema_1.Books).values(book);
    return "Book created successfully";
};
exports.createBookService = createBookService;
const updateBookService = async (id, book) => {
    await db_1.default.update(schema_1.Books).set(book).where((0, drizzle_orm_1.eq)(schema_1.Books.id, id));
    return "Book updated successfully";
};
exports.updateBookService = updateBookService;
const deleteBookService = async (id) => {
    await db_1.default.delete(schema_1.Books).where((0, drizzle_orm_1.eq)(schema_1.Books.id, id));
    return "Book deleted successfully";
};
exports.deleteBookService = deleteBookService;
