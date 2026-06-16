const express =
  require("express");

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  getContestHistory,
  getContestAnalytics,
  getUpcomingContests,
  getRatingHistory, 
  getPerformance
} = require(
  "../controllers/contestController"
);

const router =
  express.Router();

router.get(
  "/history",
  protect,
  getContestHistory
);

router.get(
  "/analytics",
  protect,
  getContestAnalytics
);

router.get(
  "/upcoming",
  protect,
  getUpcomingContests
);

router.get(
  "/rating-history",
  protect,
  getRatingHistory
);

router.get(
  "/performance",
  protect,
  getPerformance
);

module.exports =
  router;