const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const { getStreaks, getHeatmap , getInsights } = require("../controllers/activityController");

const router = express.Router();

router.get("/streaks", protect, getStreaks);
router.get("/heatmap", protect, getHeatmap);
router.get("/insights", protect, getInsights);
    
module.exports = router;
