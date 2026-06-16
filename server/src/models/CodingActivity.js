const mongoose =
  require("mongoose");

const codingActivitySchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      date: {
        type: String,
        required: true,
      },

      leetcode: {
        type: Number,
        default: 0,
      },

      codeforces: {
        type: Number,
        default: 0,
      },

      gfg: {
        type: Number,
        default: 0,
      },

      hackerrank: {
        type: Number,
        default: 0,
      },

      totalActivities: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    },
  );

codingActivitySchema.index({
  userId: 1,
  date: 1,
});

module.exports =
  mongoose.model(
    "CodingActivity",
    codingActivitySchema,
  );