const express = require("express");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  syncLeetCodeProfile,
  getLeetCodeAnalytics,
} = require("../controllers/leetcodeController");

const router = express.Router();

router.post(
  "/sync",
  protect,
  syncLeetCodeProfile
);

router.get(
  "/analytics",
  protect,
  getLeetCodeAnalytics
);

module.exports = router;