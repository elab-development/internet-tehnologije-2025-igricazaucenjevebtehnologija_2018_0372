const { db } = require("../db/index");
const { challenges } = require("../db/schema");
const { eq } = require("drizzle-orm");

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

module.exports = {
  getAllChallenges,
  getChallengeById
};