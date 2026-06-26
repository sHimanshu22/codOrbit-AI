const User = require("../models/User");
const PlatformProfile = require("../models/PlatformProfile");

const {
  fetchCodeforcesProfile,
  fetchContestHistory,
  fetchUpcomingContests,
} = require("../services/codeforcesService");

/**
 * Sync Codeforces Profile API
 */
const syncCodeforcesProfile = async (req, res) => {
  try {
    const codeforcesData =
      await syncCodeforcesData(
        req.user._id
      );

    res.status(200).json({
      success: true,
      codeforces: codeforcesData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Get Codeforces Analytics API
 */
const getCodeforcesAnalytics =
  async (req, res) => {
    try {
      const profile =
        await PlatformProfile.findOne({
          userId: req.user._id,
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

      res.status(200).json({
        success: true,
        codeforces:
          profile.codeforces,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/**
 * Core Sync Logic
 */
const syncCodeforcesData =
  async (userId) => {
    const user =
      await User.findById(userId);

    if (!user) {
      throw new Error(
        "User not found"
      );
    }

    if (
      !user.codeforcesUsername
    ) {
      throw new Error(
        "Codeforces username not found"
      );
    }

    let profile =
      await PlatformProfile.findOne({
        userId,
      });

    if (!profile) {
      profile =
        new PlatformProfile({
          userId,
        });
    }

    try {
      console.log(
        "Syncing Codeforces:",
        user.codeforcesUsername
      );

      const cfData =
        await fetchCodeforcesProfile(
          user.codeforcesUsername
        );

      const contests =
        await fetchContestHistory(
          user.codeforcesUsername
        );

      profile.codeforces = {
        handle:
          cfData.handle,

        currentRating:
          cfData.rating || 0,

        maxRating:
          cfData.maxRating || 0,

        rank:
          cfData.rank ||
          "Unrated",

        maxRank:
          cfData.maxRank ||
          "Unrated",

        contestCount:
          contests.length,

        syncStatus:
          "success",

        lastError: null,

        syncedAt:
          new Date(),
      };

      await profile.save();

      return profile.codeforces;
    } catch (error) {
      console.error(
        "Codeforces Sync Failed:",
        error.message
      );

      profile.codeforces = {
        handle:
          user.codeforcesUsername,

        currentRating: 0,

        maxRating: 0,

        rank: "Unrated",

        maxRank: "Unrated",

        contestCount: 0,

        syncStatus:
          "failed",

        lastError:
          error.message,

        syncedAt:
          new Date(),
      };

      await profile.save();

      throw new Error(
        error.message
      );
    }
  };

  


module.exports = {
  syncCodeforcesProfile,
  getCodeforcesAnalytics,
  syncCodeforcesData,
};