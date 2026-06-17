const express =
  require("express");

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  getDeveloperScore,
} = require(
  "../controllers/aiController"
);

const router =
  express.Router();

router.get(
  "/developer-score",
  protect,
  getDeveloperScore
);

module.exports =
  router;