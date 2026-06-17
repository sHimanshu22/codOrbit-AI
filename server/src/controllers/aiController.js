const PlatformProfile =
  require("../models/PlatformProfile");

const DSAProgress =
  require("../models/DSAProgress");

const CodingActivity =
  require("../models/CodingActivity");

const GitHubActivity =
  require("../models/GitHubActivity");

const getDeveloperScore =
  async (req, res) => {

    try {

      const profile =
        await PlatformProfile.findOne({
          userId:
            req.user._id,
        });

      const dsa =
        await DSAProgress.findOne({
          userId:
            req.user._id,
        });

      const coding =
        await CodingActivity.find({
          userId:
            req.user._id,
        });

      const github =
        await GitHubActivity.find({
          userId:
            req.user._id,
        });

      let score = 0;

      // DSA

      const solvedCount =
        dsa
          ? dsa.questions.filter(
              (q) =>
                q.solved
            ).length
          : 0;

      score += Math.min(
        25,
        solvedCount / 4
      );

      // LeetCode

      score += Math.min(
        20,
        (
          profile?.leetcode
            ?.totalSolved ||
          0
        ) / 5
      );

      // GitHub Repos

      score += Math.min(
        10,
        (
          profile?.github
            ?.publicRepos ||
          0
        ) / 2
      );

      // GitHub Activity

      const githubActivity =
        github.reduce(
          (
            sum,
            item
          ) =>
            sum +
            item.totalActivities,
          0
        );

      score += Math.min(
        15,
        githubActivity
      );

      // Codeforces

      score += Math.min(
        15,
        (
          profile?.codeforces
            ?.currentRating ||
          0
        ) / 100
      );

      // Coding Streak

      score += Math.min(
        10,
        coding.length
      );

      // Development Streak

      score += Math.min(
        5,
        github.length
      );

      score =
        Math.round(score);

      let level =
        "Beginner";

      if (score >= 40)
        level =
          "Growing Developer";

      if (score >= 70)
        level =
          "Placement Ready";

      if (score >= 90)
        level =
          "Elite Developer";

      res.status(200).json({
        success: true,

        developerScore:
          score,

        level,
      });

    } catch (error) {

      res.status(500).json({
        success: false,

        message:
          error.message,
      });

    }
  };

module.exports = {
  getDeveloperScore,
};