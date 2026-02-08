import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dialect: "postgresql", // This is the magic line that replaces the ':pg' suffix
  dbCredentials: {
    url: process.env.DB_URL || "postgres://bughunt:bughunt123@localhost:5432/bughunt_db",
  },
});