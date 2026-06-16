const PlatformProfile =
  require("../models/PlatformProfile");

const CodingActivity =
  require("../models/CodingActivity");

const GitHubActivity =
  require("../models/GitHubActivity");

const ActivitySnapshot =
  require("../models/ActivitySnapshot");

const syncUserActivity =
  async (userId) => {

    const profile =
      await PlatformProfile.findOne({
        userId,
      });

    if (!profile) {
      throw new Error(
        "Platform profile not found"
      );
    }

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

    // Calculate Deltas

    const leetcodeDelta =
      Math.max(
        0,
        (profile.leetcode
          ?.totalSolved || 0)
          -
          snapshot.leetcodeSolved
      );

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

    // Coding Activity

    let codingActivity =
      await CodingActivity.findOne({
        userId,
        date: today,
      });

    if (!codingActivity) {

      codingActivity =
        new CodingActivity({
          userId,
          date: today,
        });
    }

    codingActivity.leetcode +=
      leetcodeDelta;

    codingActivity.codeforces +=
      codeforcesDelta;

    codingActivity.totalActivities +=
      leetcodeDelta +
      codeforcesDelta;

    await codingActivity.save();

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
        leetcodeDelta,
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