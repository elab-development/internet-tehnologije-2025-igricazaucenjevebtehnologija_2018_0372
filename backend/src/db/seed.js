const { db } = require("./index"); // Ensure this points to your Drizzle db instance
const { users, profiles, categories, challenges } = require("./schema");
const bcrypt = require("bcryptjs");

async function seed() {
  console.log("🌱 Starting Seeding...");

  try {
    const hashedAdminPassword = await bcrypt.hash("admin123", 10);
    const hashedProfPassword = await bcrypt.hash("prof123", 10);

    console.log("Inserting users...");
    const [adminUser] = await db.insert(users).values({
      username: "admin",
      email: "admin@test.com",
      password: hashedAdminPassword,
      role: "admin",
    }).returning();

    const [profUser] = await db.insert(users).values({
      username: "prof",
      email: "prof@test.com",
      password: hashedProfPassword,
      role: "professor",
    }).returning();

    await db.insert(profiles).values([
      { userId: adminUser.id, bio: "System Administrator.", points: 999 },
      { userId: profUser.id, bio: "Lead Instructor.", points: 500 }
    ]);

    //////////////////////////////////////////////////////////////////////////////
    console.log("Inserting categories...");
    const [syntaxCat] = await db.insert(categories).values({
      name: "Syntax Errors",
      description: "Broken code that won't even compile."
    }).returning();

    const [logicCat] = await db.insert(categories).values({
      name: "Logic Bombs",
      description: "Code that runs, but gives the wrong output."
    }).returning();

    console.log("Inserting challenges...");
    await db.insert(challenges).values([
      {
        title: "The TDZ Trap",
        description: "Fix the order!",
        difficulty: "Easy",
        categoryId: syntaxCat.id,
        status: "approved",
        createdBy: profUser.id,
        buggyCode: "function check() {\n  console.log(x);\n  let x = 10;\n}",
        solution: "function check() {\n  let x = 10;\n  console.log(x);\n}"
      },
      {
        title: "The Infinite Loop",
        description: "This loop never ends.",
        difficulty: "Medium",
        categoryId: logicCat.id,
        status: "approved",
        createdBy: profUser.id,
        buggyCode: "for (let i = 0; i < 10; i--) {\n  console.log(i);\n}",
        solution: "for (let i = 0; i < 10; i++) {\n  console.log(i);\n}"
      },
      {
        title: "The Assignment Mistake",
        description: "We are trying to compare the ID!",
        difficulty: "Hard",
        categoryId: logicCat.id,
        status: "approved",
        createdBy: profUser.id,
        buggyCode: "if (user.id = '123') {\n  return true;\n}",
        solution: "if (user.id === '123') {\n  return true;\n}"
      }
    ]);

    console.log("✅ Seeding complete! You can now login with:");
    console.log("Admin: admin@bughunt.io | admin123");
    console.log("Professor: prof@bughunt.io | prof123");

  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    process.exit();
  }
}

seed();