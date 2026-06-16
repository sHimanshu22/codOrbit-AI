const mongoose = require("mongoose");

const activitySnapshotSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },

      leetcodeSolved: {
        type: Number,
        default: 0,
      },

      githubRepos: {
        type: Number,
        default: 0,
      },

      githubStars: {
        type: Number,
        default: 0,
      },

      codeforcesContests: {
        type: Number,
        default: 0,
      },

      capturedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    },
  );

module.exports =
  mongoose.model(
    "ActivitySnapshot",
    activitySnapshotSchema
  );