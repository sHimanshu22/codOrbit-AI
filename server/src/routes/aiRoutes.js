const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const { getDeveloperScore } = require("../controllers/aiController");

const { testAI, getAIInsights } = require("../controllers/aiController");

const router = express.Router();

router.get("/developer-score", protect, getDeveloperScore);

router.get("/test", protect, testAI);

router.get("/insights", protect, getAIInsights);

module.exports = router;
