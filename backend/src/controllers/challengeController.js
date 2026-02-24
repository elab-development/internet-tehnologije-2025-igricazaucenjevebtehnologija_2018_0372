const { db } = require("../db/index");
const { challenges, submissions } = require("../db/schema");
const { eq, and } = require("drizzle-orm");

const getAllChallenges = async (req, res) => {
  try {
    
    const allChallenges = await db
      .select()
      .from(challenges)
      .where(eq(challenges.status, "approved"));

    res.json(allChallenges);
  } catch (error) {
    console.error("Fetch Challenges Error:", error);
    res.status(500).json({ error: "SYSTEM_FAILURE: UNABLE_TO_RETRIEVE_DATA" });
  }
};

const getChallengeById = async (req, res) => {
  const { id } = req.params;
  try {
    const [challenge] = await db
      .select()
      .from(challenges)
      .where(eq(challenges.id, id));

    if (!challenge) return res.status(404).json({ error: "CHALLENGE_NOT_FOUND" });

    res.json(challenge);
  } catch (error) {
    res.status(500).json({ error: "SERVER_ERROR" });
  }
};

const submitSolution = async (req, res) => {
  const { id } = req.params;
  const { code } = req.body;
  console.log("DEBUG: Current User from Middleware:", req.user);
  console.log("DEBUG: Full Request Body:", req.body);
  console.log("DEBUG: Extracted Code:", code);
  
  const userId = req.user.id;

  try {
    const [challenge] = await db.select().from(challenges).where(eq(challenges.id, id));
    if (!challenge) return res.status(404).json({ error: "CHALLENGE_NOT_FOUND" });

    const normalize = (str) => str.replace(/\s+/g, "").trim();
    const isCorrect = normalize(code) === normalize(challenge.solution);

    await db.insert(submissions).values({
      userId,
      challengeId: parseInt(id),
      isCorrect,
    });

    res.json({ 
      isCorrect, 
      message: isCorrect ? "SUCCESS: BUG_SQUASHED" : "FAILURE: LOGIC_ERROR" 
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "SUBMISSION_PROCESSING_FAILED" });
  }
};

const getSolvedChallenges = async (req, res) => {
  try {
    // Ensure req.user exists (from authMiddleware)
    const userId = req.user.id;

    const solved = await db
      .select({
        // Be explicit: table.column
        id: challenges.id,
        title: challenges.title,
        difficulty: challenges.difficulty,
      })
      .from(challenges)
      .innerJoin(submissions, eq(challenges.id, submissions.challengeId))
      .where(
        and(
          eq(submissions.userId, userId),
          eq(submissions.isCorrect, true)
        )
      );
    const solvedIdArray = solved.map(s => s.id); 
    res.json(solvedIdArray);
  } catch (error) {
    // Log the actual error to your terminal so you can see what failed!
    console.error("DETAILED_DB_ERROR:", error);
    res.status(500).json({ error: "INTERNAL_SERVER_ERROR", details: error.message });
  }
};

module.exports = {
  getAllChallenges,
  getChallengeById,
  submitSolution,
  getSolvedChallenges
};