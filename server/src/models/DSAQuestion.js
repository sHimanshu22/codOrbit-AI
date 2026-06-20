const mongoose = require("mongoose");

const dsaQuestionSchema = new mongoose.Schema(
  {
    // Sheet Name
    // Examples:
    // Striver A2Z
    // Blind 75
    // NeetCode 150
    sheetName: {
      type: String,
      required: true,
      trim: true,
    },

    // Main roadmap module
    // Examples:
    // Arrays
    // Binary Search
    // Graphs
    // Dynamic Programming
    module: {
      type: String,
      required: true,
      trim: true,
    },

    // Sub-group inside a module
    // Examples:
    // Easy
    // Medium
    // Hard
    // Traversal
    // Search Space
    section: {
      type: String,
      trim: true,
      default: "General",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    // Concept or Problem
    // Examples:
    // Vector
    // Map
    // Functions
    // Input / Output
    isConcept: {
      type: Boolean,
      default: false,
    },

    // Problem solving pattern
    // Examples:
    // Two Pointer
    // Sliding Window
    // DFS
    // BFS
    // Greedy
    pattern: {
      type: String,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },

    platform: {
      type: String,
      trim: true,
    },

    problemUrl: {
      type: String,
      trim: true,
    },

    solutionUrl: {
      type: String,
      trim: true,
    },

    // Universal concepts used for analytics
    // Examples:
    // ["Array"]
    // ["Array", "HashMap"]
    // ["Graph", "DFS"]
    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Queries by sheet -> module
dsaQuestionSchema.index({
  sheetName: 1,
  module: 1,
});

// Queries by module -> section
dsaQuestionSchema.index({
  module: 1,
  section: 1,
});

// Analytics queries
dsaQuestionSchema.index({
  tags: 1,
});

// Fast filtering of concepts/problems
dsaQuestionSchema.index({
  isConcept: 1,
});

module.exports = mongoose.model(
  "DSAQuestion",
  dsaQuestionSchema
);