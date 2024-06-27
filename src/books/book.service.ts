import { eq } from "drizzle-orm";
import { TIBook, TSBook, Books } from "../drizzle/schema";
import db from "../drizzle/db";

export const listBookService = async (
  limit?: number
): Promise<TSBook[] | null> => {
  if (limit) {
    return await db.query.Books.findMany({
      limit,
    });
  }
  return await db.query.Books.findMany();
};

export const limitBookService = async (
  limit: number
): Promise<TSBook[] | null> => {
  return await db.select().from(Books).limit(limit);
};

export const getSingleBookService = async (
  id: number
): Promise<TSBook | undefined> => {
  return await db.query.Books.findFirst({
    where: eq(Books.id, id),
  });
};

export const createBookService = async (book: TIBook) => {
  await db.insert(Books).values(book);
  return "Book created successfully";
};

export const updateBookService = async (id: number, book: TIBook) => {
  await db.update(Books).set(book).where(eq(Books.id, id));
  return "Book updated successfully";
};

export const deleteBookService = async (id: number) => {
  await db.delete(Books).where(eq(Books.id, id));
  return "Book deleted successfully";
};
