const User = require("../models/User");

const {
  fetchContestHistory,
  fetchUpcomingContests,
} = require("../services/codeforcesService");

const PlatformProfile = require("../models/PlatformProfile");

const getContestHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.codeforcesUsername) {
      return res.status(404).json({
        success: false,

        message: "Codeforces username not found",
      });
    }

    const contests = await fetchContestHistory(user.codeforcesUsername);

    const history = contests.map((contest) => ({
      contestName: contest.contestName,

      rank: contest.rank,

      oldRating: contest.oldRating,

      newRating: contest.newRating,

      ratingChange: contest.newRating - contest.oldRating,

      date: new Date(contest.ratingUpdateTimeSeconds * 1000)
        .toISOString()
        .split("T")[0],
    }));

    res.status(200).json({
      success: true,

      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getContestAnalytics = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const contests = await fetchContestHistory(user.codeforcesUsername);

    if (contests.length === 0) {
      return res.status(200).json({
        success: true,

        analytics: {
          totalContests: 0,

          bestRank: null,

          averageRank: null,

          highestRatingGain: null,
        },
      });
    }

    const totalContests = contests.length;

    const bestRank = Math.min(...contests.map((c) => c.rank));

    const averageRank = Math.round(
      contests.reduce((sum, contest) => sum + contest.rank, 0) / totalContests,
    );

    const highestRatingGain = Math.max(
      ...contests.map((contest) => contest.newRating - contest.oldRating),
    );

    res.status(200).json({
      success: true,

      analytics: {
        totalContests,

        bestRank,

        averageRank,

        highestRatingGain,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getUpcomingContests = async (req, res) => {
  try {
    const contests = await fetchUpcomingContests();

    const upcoming = contests
      .filter((contest) => contest.phase === "BEFORE")
      .slice(0, 10)
      .map((contest) => ({
        platform: "Codeforces",

        name: contest.name,

        startTime: new Date(contest.startTimeSeconds * 1000),

        duration: contest.durationSeconds,
      }));

    res.status(200).json({
      success: true,

      contests: upcoming,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getRatingHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user.codeforcesUsername) {
      return res.status(404).json({
        success: false,
        message: "Codeforces username not found",
      });
    }

    const contests = await fetchContestHistory(user.codeforcesUsername);

    const history = contests.map((contest) => ({
      contest: contest.contestName,

      rating: contest.newRating,

      date: new Date(contest.ratingUpdateTimeSeconds * 1000)
        .toISOString()
        .split("T")[0],
    }));

    res.status(200).json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPerformance =
  async (req, res) => {

    try {

      const profile =
        await PlatformProfile.findOne({
          userId:
            req.user._id,
        });

      if (
        !profile ||
        !profile.codeforces
      ) {

        return res.status(404).json({
          success: false,
          message:
            "Codeforces profile not synced",
        });
      }

      const performance = {

        currentRating:
          profile.codeforces
            .currentRating || 0,

        highestRating:
          profile.codeforces
            .maxRating || 0,

        currentRank:
          profile.codeforces
            .rank || "Unrated",

        highestRank:
          profile.codeforces
            .maxRank || "Unrated",

        totalContests:
          profile.codeforces
            .contestCount || 0,
      };

      res.status(200).json({
        success: true,
        performance,
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
  getContestHistory,
  getContestAnalytics,
  getUpcomingContests,
  getRatingHistory,
  getPerformance,
};
