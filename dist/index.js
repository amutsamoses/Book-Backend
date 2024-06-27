"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
require("dotenv/config");
const http_exception_1 = require("hono/http-exception");
const logger_1 = require("hono/logger");
const csrf_1 = require("hono/csrf");
const trailing_slash_1 = require("hono/trailing-slash");
const book_router_1 = require("./books/book.router");
const app = new hono_1.Hono().basePath("/api");
const customTimeoutException = () => new http_exception_1.HTTPException(408, {
    message: "Request Timeout",
});
app.use((0, logger_1.logger)());
app.use((0, csrf_1.csrf)());
app.use((0, trailing_slash_1.trimTrailingSlash)());
app.get("/ok", (c) => {
    return c.text("The Server is running!");
});
app.get("/timeout", async (c) => {
    await new Promise((resolve) => setTimeout(resolve, 11000));
    return c.text("data after 5 second", 200);
});
app.route("/", book_router_1.bookRouter);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT),
});
console.log(`Server is running on port ${process.env.PORT}`);
