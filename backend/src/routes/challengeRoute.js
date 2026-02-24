const express = require("express");
const router = express.Router();
const {getAllChallenges, getChallengeById, getSolvedChallenges, submitSolution} = require("../controllers/challengeController");
const { protect } = require("../middleweare/authMiddleweare");

// GET
router.get("/",protect, getAllChallenges);

// GET
router.get("/solved",protect, getSolvedChallenges);

//GET
router.get("/:id",protect, getChallengeById)

//POST
router.post("/:id/submit", protect, submitSolution);



module.exports = router;