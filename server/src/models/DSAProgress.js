const mongoose = require("mongoose");

const questionProgressSchema =
  new mongoose.Schema({
    questionId: {
      type: String,
      required: true,
    },

    title: String,

    topic: String,

    sheet: String,

    difficulty: String,

    solved: {
      type: Boolean,
      default: false,
    },

    solvedAt: Date,
  });

const dsaProgressSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

        unique: true,
      },

      questions: [
        questionProgressSchema,
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "DSAProgress",
    dsaProgressSchema
  );