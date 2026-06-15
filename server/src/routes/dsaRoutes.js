const express =
  require("express");

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  getQuestions,
  toggleQuestion,
  getProgress,
} = require(
  "../controllers/dsaController"
);

const router =
  express.Router();

router.get(
  "/questions",
  protect,
  getQuestions
);

router.post(
  "/toggle",
  protect,
  toggleQuestion
);

router.get(
  "/progress",
  protect,
  getProgress
);

module.exports =
  router;