const { pgTable, serial, text, varchar, integer, timestamp, boolean } = require("drizzle-orm/pg-core");

//USERS
const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", {length: 50}).notNull().unique(),
    email: varchar("email", {length: 100}).notNull().unique(),
    password: text("password").notNull(),
});

//PROFILE
const  profiles = pgTable("profiles", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(()=> users.id).notNull(),
    bio: text("bio"),
    avatarUrl: text("avatar_url"),
});

//CATEGORIES
const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 50}).notNull(),
});

//CHALLENGES
const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id").references(() => categories.id),
    title: varchar("title", { length: 100 }).notNull(),
    description: text("description"),
    buggyCode: text("buggy_code").notNull(),
    solution: text("solution").notNull(),
});

//SUBMISION
export const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  challengeId: integer("challenge_id").references(() => challenges.id).notNull(),
  isCorrect: boolean("is_correct").default(false),
  submittedAt: timestamp("submitted_at").defaultNow(),
});


module.exports = {users, challenges };
