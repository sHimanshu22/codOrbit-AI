const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  getQuestions,
  toggleQuestion,
  getProgress,
  getOverallProgress,
  getActiveSheetsOverview,
  getAICoach,
  getSkillAnalysis,
} = require("../controllers/dsaController");

const router = express.Router();

router.get("/questions", protect, getQuestions);

router.post("/toggle", protect, toggleQuestion);

router.get("/progress", protect, getProgress);

// router.get("/overview", protect, getOverallProgress);

router.get("/overview", protect, getActiveSheetsOverview);

router.get("/ai-coach", protect, getAICoach);

router.get("/skill-analysis", protect, getSkillAnalysis);

module.exports = router;
