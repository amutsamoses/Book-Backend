import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";
import { cors } from "hono/cors";
import { html, raw } from "hono/html";
import { trimTrailingSlash } from "hono/trailing-slash";

import { bookRouter } from "./books/book.router";

const app = new Hono().basePath("/api");

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
    allowHeaders: ["Content-Type"],
  })
);

const customTimeoutException = () =>
  new HTTPException(408, {
    message: "Request Timeout",
  });

app.use(logger());
app.use(csrf());
app.use(trimTrailingSlash());

app.get("/ok", (c) => {
  return c.text("The Server is running!");
});

app.get("/timeout", async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000));
  return c.text("data after 5 second", 200);
});

app.route("/", bookRouter);

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT),
});

console.log(`Server is running on port ${process.env.PORT}`);
