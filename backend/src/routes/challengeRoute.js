const express = require("express");
const router = express.Router();
const {db} = require("../db");
const { challenges } = require("../schema/index");
const { eq } = require("drizzle-orm");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  const data = await db.select().from(challenges);
  res.json(data.map(({ solution, ...rest }) => rest));
});

router.get("/:id", authMiddleware, async (req, res) => {
  const result = await db.select().from(challenges).where(eq(challenges.id, req.params.id));
  res.json(result[0]);
});

router.post("/:id/submit", authMiddleware, async (req, res) => {
  const { code } = req.body;
  const result = await db.select().from(challenges).where(eq(challenges.id, req.params.id));
  const correct = code.trim() === result[0].solution.trim();
  res.json({ correct });
});

module.exports = router;