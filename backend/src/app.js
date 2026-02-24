const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutrs");
const challengeRoute = require("./routes/challengeRoute");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoute);

module.exports = app;