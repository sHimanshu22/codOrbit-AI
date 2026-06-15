const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  getQuestions,
  toggleQuestion,
  getProgress,
  getOverallProgress,
  getActiveSheetsOverview,
} = require("../controllers/dsaController");

const router = express.Router();

router.get("/questions", protect, getQuestions);

router.post("/toggle", protect, toggleQuestion);

router.get("/progress", protect, getProgress);

// router.get("/overview", protect, getOverallProgress);

router.get("/overview", protect, getActiveSheetsOverview);


module.exports = router;
