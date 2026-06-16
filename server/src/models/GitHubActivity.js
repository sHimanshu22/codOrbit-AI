const mongoose =
  require("mongoose");

const githubActivitySchema =
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

      commits: {
        type: Number,
        default: 0,
      },

      pushes: {
        type: Number,
        default: 0,
      },

      pullRequests: {
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

githubActivitySchema.index({
  userId: 1,
  date: 1,
});

module.exports =
  mongoose.model(
    "GitHubActivity",
    githubActivitySchema,
  );