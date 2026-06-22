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
  toggleBookmark,
  getBookmarkedQuestions,
  updateNotes,
  getAvailableSheets
} = require("../controllers/dsaController");

const router = express.Router();

router.get("/questions", protect, getQuestions);

router.post("/toggle", protect, toggleQuestion);

router.get("/progress", protect, getProgress);

// router.get("/overview", protect, getOverallProgress);

router.get("/overview", protect, getActiveSheetsOverview);

router.get("/ai-coach", protect, getAICoach);

router.get("/skill-analysis", protect, getSkillAnalysis);

router.get("/bookmarks", protect, getBookmarkedQuestions);

router.patch("/bookmark", protect, toggleBookmark);

router.patch("/notes", protect, updateNotes);

router.get(
  "/sheets",
  protect,
  getAvailableSheets
);

module.exports = router;
