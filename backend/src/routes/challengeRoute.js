const express = require("express");
const router = express.Router();
const {getAllChallenges, getChallengeById, getSolvedChallenges, submitSolution} = require("../controllers/challengeController");
const { protect } = require("../middleweare/authMiddleweare");


/**
 * @swagger
 * /api/challenges:
 *   get:
 *     summary: Dohvatanje svih izazova
 *     tags: [Challenges]
 *     responses:
 *       200:
 *         description: Lista svih izazova
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Prvi izazov"
 *                   description:
 *                     type: string
 *                     example: "Opis izazova"
 */
router.get("/",protect, getAllChallenges);

/**
 * @swagger
 * /api/challenges/solved:
 *   get:
 *     summary: Dohvatanje svih rešenih izazova trenutnog korisnika (zaštićeno)
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista rešenih izazova
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: "Prvi izazov"
 *                   solvedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-02-24T17:00:00.000Z"
 */
router.get("/solved",protect, getSolvedChallenges);

/**
 * @swagger
 * /api/challenges/{id}:
 *   get:
 *     summary: Dohvatanje izazova po ID-u
 *     tags: [Challenges]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID izazova
 *     responses:
 *       200:
 *         description: Detalji izazova
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Prvi izazov"
 *                 description:
 *                   type: string
 *                   example: "Opis izazova"
 *       404:
 *         description: Izazov nije pronađen
 */
router.get("/:id",protect, getChallengeById);


/**
 * @swagger
 * /api/challenges/{id}/submit:
 *   post:
 *     summary: Slanje rešenja za izazov (zaštićeno)
 *     tags: [Challenges]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID izazova
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               solution:
 *                 type: string
 *                 example: "return a + b;"
 *     responses:
 *       200:
 *         description: Rešenje uspešno poslato
 *       400:
 *         description: Nevalidno rešenje
 */
router.post("/:id/submit", protect, submitSolution);



module.exports = router;