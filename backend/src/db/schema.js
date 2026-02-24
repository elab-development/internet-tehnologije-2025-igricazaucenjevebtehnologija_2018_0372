const { pgTable, serial, text, varchar, integer, timestamp, boolean, pgEnum } = require("drizzle-orm/pg-core");

const roleEnum = pgEnum("role", ["student","professor","admin"]);
const statusEnum = pgEnum("status", ["active","baned"]);
const challengeStatusEnum = pgEnum("challeng_status", ["pending","approved"]);

//USERS
const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username", {length: 255}).notNull().unique(),
    email: varchar("email", {length: 100}).notNull().unique(),
    password: text("password").notNull(),
    role: roleEnum("role").default("student"),
    status: statusEnum("status").default("active"),
});

//PROFILE
const  profiles = pgTable("profiles", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(()=> users.id, {onDelete: "cascade"}),
    bio: text("bio"),
    points: integer("points").default(0),
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
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description"),
    difficulty: varchar("difficulty", {length: 50}),
    status: challengeStatusEnum("status").default("pending"),
    createdBy: integer("created_by").references(()=> users.id),
    buggyCode: text("buggy_code").notNull(),
    solution: text("solution").notNull(),
});

//SUBMISION
const submissions = pgTable("submissions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  challengeId: integer("challenge_id").references(() => challenges.id),
  isCorrect: boolean("is_correct").default(false),
  submittedAt: timestamp("submitted_at").defaultNow(),
});


module.exports = {
    users,
    roleEnum,
    statusEnum,
    challengeStatusEnum,
    profiles,
    categories,
    challenges,
    submissions
};
