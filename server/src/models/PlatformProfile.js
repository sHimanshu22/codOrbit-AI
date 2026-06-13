const mongoose = require("mongoose");

const platformProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    github: {
      username: String,
      followers: Number,
      following: Number,
      publicRepos: Number,
      totalStars: Number,
      totalForks: Number,

      languagesUsed: [
        {
          language: String,
          count: Number,
        },
      ],

      topRepositories: [
        {
          name: String,
          stars: Number,
          forks: Number,
          language: String,
          repoUrl: String,
        },
      ],

      syncedAt: Date,
    },

    leetcode: {
      username: String,

      totalSolved: Number,

      easySolved: Number,

      mediumSolved: Number,

      hardSolved: Number,

      syncedAt: Date,
    },

    codeforces: {
      handle: String,

      currentRating: Number,

      maxRating: Number,

      rank: String,

      maxRank: String,

      contestCount: Number,

      syncedAt: Date,
    },

    gfg: {},

    hackerrank: {},
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("PlatformProfile", platformProfileSchema);
