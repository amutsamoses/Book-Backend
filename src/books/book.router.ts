import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { bookSchema } from "../validator";

import {
  listBook,
  getSingleBook,
  createBook,
  updateBook,
  deleteBook,
  limitBook,
} from "./book.controller";

export const bookRouter = new Hono();

bookRouter.get("/books", listBook);

bookRouter.get("/books/:id", getSingleBook);

bookRouter.post(
  "/books",
  zValidator("json", bookSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  createBook
);

bookRouter.put(
  "/books/:id",
  zValidator("json", bookSchema, (results, c) => {
    if (!results.success) {
      return c.json(results.error, 400);
    }
  }),
  updateBook
);

bookRouter.delete("/books/:id", deleteBook);
