const mongoose =
  require("mongoose");

const dsaQuestionSchema =
  new mongoose.Schema(
    {
      sheetName: {
        type: String,
        required: true,
      },

      title: {
        type: String,
        required: true,
      },

      topic: {
        type: String,
        required: true,
      },

      pattern: {
        type: String,
      },

      difficulty: {
        type: String,
        enum: [
          "Easy",
          "Medium",
          "Hard",
        ],
      },

      platform: {
        type: String,
      },

      problemUrl: {
        type: String,
      },

      solutionUrl: {
        type: String,
      },

      order: {
        type: Number,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "DSAQuestion",
    dsaQuestionSchema
  );