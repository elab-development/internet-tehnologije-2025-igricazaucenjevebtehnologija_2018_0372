/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/schema/index.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL || "postgres://bughunt:bughunt123@localhost:5432/bughunt_db",
  },
};