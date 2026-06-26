const mongoose = require("mongoose");

const dsaSheetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
      min: 0,
    },

    moduleCount: {
      type: Number,
      required: true,
      min: 0,
    },

    difficulty: {
      type: String,
      required: true,
      trim: true,
    },

    bestFor: {
      type: String,
      required: true,
      trim: true,
    },

    roadmap: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("DSASheet", dsaSheetSchema);
