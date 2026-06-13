const express = require("express");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  syncGitHubProfile,
  getGitHubAnalytics,
} = require("../controllers/githubController");

const router = express.Router();

router.post(
  "/sync",
  protect,
  syncGitHubProfile
);

router.get(
  "/analytics",
  protect,
  getGitHubAnalytics
);

module.exports = router;