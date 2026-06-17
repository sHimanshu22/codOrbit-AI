const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const {
  getStreaks,
  getHeatmap,
  getInsights,
  getActivityCoach,
} = require("../controllers/activityController");

const router = express.Router();

router.get("/streaks", protect, getStreaks);
router.get("/heatmap", protect, getHeatmap);
router.get("/insights", protect, getInsights);
router.get("/ai-coach", protect, getActivityCoach);

module.exports = router;
