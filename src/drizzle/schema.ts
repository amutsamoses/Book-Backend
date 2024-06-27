import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const Books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }),
  author: varchar("author", { length: 255 }),
  year: varchar("year", { length: 255 }),
});

export type TIBook = typeof Books.$inferInsert;
export type TSBook = typeof Books.$inferSelect;
