"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const migrator_1 = require("drizzle-orm/node-postgres/migrator");
const db_1 = require("./db");
async function migration() {
    console.log("Running migration...");
    await (0, migrator_1.migrate)(db_1.default, {
        migrationsFolder: __dirname + "/migrations",
    });
    await db_1.client.end();
    console.log("==================Migration complete!=====================");
    process.exit(0);
}
migration().catch((err) => {
    console.error(err);
    process.exit(0);
});
