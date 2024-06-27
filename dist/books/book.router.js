"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const hono_1 = require("hono");
const zod_validator_1 = require("@hono/zod-validator");
const validator_1 = require("../validator");
const book_controller_1 = require("./book.controller");
exports.bookRouter = new hono_1.Hono();
exports.bookRouter.get("/books", book_controller_1.listBook);
exports.bookRouter.get("/books/:id", book_controller_1.getSingleBook);
exports.bookRouter.post("/books", (0, zod_validator_1.zValidator)("json", validator_1.bookSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), book_controller_1.createBook);
exports.bookRouter.put("/books/:id", (0, zod_validator_1.zValidator)("json", validator_1.bookSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), book_controller_1.updateBook);
exports.bookRouter.delete("/books/:id", book_controller_1.deleteBook);
