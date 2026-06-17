const PlatformProfile = require("../models/PlatformProfile");

const CodingActivity = require("../models/CodingActivity");

const GitHubActivity = require("../models/GitHubActivity");

const ActivitySnapshot = require("../models/ActivitySnapshot");

const User = require("../models/User");

const {
  fetchLeetCodeStats,
} = require("./leetcodeService");

const syncUserActivity = async (
  userId
) => {

  const profile =
    await PlatformProfile.findOne({
      userId,
    });

  if (!profile) {

    throw new Error(
      "Platform profile not found"
    );
  }

  const user =
    await User.findById(
      userId
    );

  let snapshot =
    await ActivitySnapshot.findOne({
      userId,
    });

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  // First Sync Ever

  if (!snapshot) {

    snapshot =
      await ActivitySnapshot.create({
        userId,

        leetcodeSolved:
          profile.leetcode
            ?.totalSolved || 0,

        githubRepos:
          profile.github
            ?.publicRepos || 0,

        githubStars:
          profile.github
            ?.totalStars || 0,

        codeforcesContests:
          profile.codeforces
            ?.contestCount || 0,
      });

    return {
      firstSync: true,
    };
  }

  // Fetch LeetCode Calendar

  if (
    user.leetcodeUsername
  ) {

    const leetcodeData =
      await fetchLeetCodeStats(
        user.leetcodeUsername
      );

    const calendar =
      JSON.parse(
        leetcodeData
          ?.matchedUser
          ?.submissionCalendar ||
          "{}"
      );

    console.log(
      "Latest Calendar Entries:"
    );

    console.log(
      Object.entries(
        calendar
      ).slice(-5)
    );

    // Rebuild from calendar

    for (
      const [
        timestamp,
        count,
      ] of Object.entries(
        calendar
      )
    ) {

      const date =
        new Date(
          Number(
            timestamp
          ) * 1000
        )
          .toISOString()
          .split("T")[0];

      await CodingActivity.findOneAndUpdate(
        {
          userId,
          date,
        },

        {
          leetcode:
            count,

          totalActivities:
            count,
        },

        {
          upsert: true,

          returnDocument:
            "after",
        }
      );
    }
  }

  // GitHub Deltas

  const githubRepoDelta =
    Math.max(
      0,
      (profile.github
        ?.publicRepos || 0)
        -
        snapshot.githubRepos
    );

  const githubStarDelta =
    Math.max(
      0,
      (profile.github
        ?.totalStars || 0)
        -
        snapshot.githubStars
    );

  const codeforcesDelta =
    Math.max(
      0,
      (profile.codeforces
        ?.contestCount || 0)
        -
        snapshot.codeforcesContests
    );

  // GitHub Activity

  let githubActivity =
    await GitHubActivity.findOne({
      userId,
      date: today,
    });

  if (!githubActivity) {

    githubActivity =
      new GitHubActivity({
        userId,
        date: today,
      });
  }

  githubActivity.pushes +=
    githubRepoDelta;

  githubActivity.commits +=
    githubStarDelta;

  githubActivity.totalActivities +=
    githubRepoDelta +
    githubStarDelta;

  await githubActivity.save();

  // Update Snapshot

  snapshot.leetcodeSolved =
    profile.leetcode
      ?.totalSolved || 0;

  snapshot.githubRepos =
    profile.github
      ?.publicRepos || 0;

  snapshot.githubStars =
    profile.github
      ?.totalStars || 0;

  snapshot.codeforcesContests =
    profile.codeforces
      ?.contestCount || 0;

  snapshot.capturedAt =
    new Date();

  await snapshot.save();

  return {
    success: true,

    codingActivity: {

      calendarDays:
        user.leetcodeUsername
          ? Object.keys(
              JSON.parse(
                (
                  await fetchLeetCodeStats(
                    user.leetcodeUsername
                  )
                )
                  ?.matchedUser
                  ?.submissionCalendar ||
                  "{}"
              )
            ).length
          : 0,

      codeforcesDelta,
    },

    githubActivity: {
      githubRepoDelta,
      githubStarDelta,
    },
  };
};

module.exports = {
  syncUserActivity,
};