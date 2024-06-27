"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.Books = (0, pg_core_1.pgTable)("books", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.varchar)("title", { length: 255 }),
    author: (0, pg_core_1.varchar)("author", { length: 255 }),
    year: (0, pg_core_1.varchar)("year", { length: 255 }),
});
