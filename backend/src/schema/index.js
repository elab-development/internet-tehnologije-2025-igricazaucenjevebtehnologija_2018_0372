const {pgTable, serial, text, varchar} = require("drizzle-orm/pg-core");

const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", {length: 100}).notNull().unique(),
    password: text("password").notNull(),
    role: varchar("role", {length:20}).default("user")
});

const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 100 }).notNull(),
    description: text("description"),
    buggyCode: text("buggy_code").notNull(),
    solution: text("solution").notNull(),
});

module.exports = {users, challenges };
