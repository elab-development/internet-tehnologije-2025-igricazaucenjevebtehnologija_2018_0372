const express = require("express");
const router = express.Router();
const {getAllChallenges, getChallengeById} = require("../controllers/challengeController");
const { protect } = require("../middleweare/authMiddleweare");

// GET /api/challenges
router.get("/", protect, getAllChallenges);

// GET /api/challenges/id
router.get("/:id", protect, getChallengeById)

module.exports = router;