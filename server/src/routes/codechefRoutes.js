const express = require("express");

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  syncCodeChefProfile,
  getCodeChefAnalytics,
} = require(
  "../controllers/codechefController"
);

const router =
  express.Router();

router.post(
  "/sync",
  protect,
  syncCodeChefProfile
);

router.get(
  "/analytics",
  protect,
  getCodeChefAnalytics
);

module.exports = router;