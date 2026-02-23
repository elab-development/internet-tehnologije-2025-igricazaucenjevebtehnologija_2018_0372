const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { users } = require("../db/schema");
const { eq } = require("drizzle-orm");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Insert into DB
    const [newUser] = await db.insert(users).values({
      username,
      email,
      password: hashedPassword,
    }).returning(); // Returning gives us back the user object without the password if we filter it

    res.status(201).json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: "Server error during registration" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    
    if (!user) return res.status(404).json({ error: "User not found" });

    // Verify Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // Create Token
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRE || "school_project_secret", 
      { expiresIn: "1d" }
    );

    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Login failed" });
  }
};

module.exports = { register, login };