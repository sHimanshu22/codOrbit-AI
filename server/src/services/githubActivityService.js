const User = require("../models/User");

const GitHubActivity = require("../models/GitHubActivity");

const { fetchGitHubEvents } = require("./githubService");

const syncGitHubActivity = async (userId) => {
  const user = await User.findById(userId);

  if (!user.githubUsername) {
    return;
  }

  const events = await fetchGitHubEvents(user.githubUsername);

  const activityMap = new Map();

  events.forEach((event) => {
    const date = event.created_at.split("T")[0];

    const weight =
      event.type === "PushEvent"
        ? 2
        : event.type === "PullRequestEvent"
          ? 3
          : event.type === "IssuesEvent"
            ? 1
            : 1;

    activityMap.set(date, (activityMap.get(date) || 0) + weight);
  });

  for (const [date, count] of activityMap) {
    await GitHubActivity.findOneAndUpdate(
      {
        userId,
        date,
      },

      {
        totalActivities: count,

        commits: count,
      },

      {
        upsert: true,
        new: true,
      },
    );
  }

  return {
    syncedDays: activityMap.size,
  };
};

module.exports = {
  syncGitHubActivity,
};
