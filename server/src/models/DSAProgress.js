const mongoose = require("mongoose");

const questionProgressSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DSAQuestion",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    sheetName: {
      type: String,
    },

    module: {
      type: String,
    },

    section: {
      type: String,
    },

    difficulty: {
      type: String,
    },

    isConcept: {
      type: Boolean,
      default: false,
    },

    solved: {
      type: Boolean,
      default: false,
    },

    solvedAt: Date,

    bookmarked: {
      type: Boolean,
      default: false,
    },

    notes: {
      type: String,
      default: "",
    },

    revisionCount: {
      type: Number,
      default: 0,
    },

    lastRevisedAt: Date,
  },
  {
    _id: false,
  }
);

const dsaProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    questions: [questionProgressSchema],
  },
  {
    timestamps: true,
  }
);

dsaProgressSchema.index({
  userId: 1,
});

module.exports = mongoose.model(
  "DSAProgress",
  dsaProgressSchema
);