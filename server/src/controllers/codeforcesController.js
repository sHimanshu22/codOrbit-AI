const User = require("../models/User");

const PlatformProfile = require("../models/PlatformProfile");

const {
  fetchCodeforcesProfile,
  fetchContestHistory,
} = require("../services/codeforcesService");

const syncCodeforcesProfile = async (req, res) => {
  try {
    const codeforcesData = await syncCodeforcesData(req.user._id);

    res.status(200).json({
      success: true,
      codeforces: codeforcesData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCodeforcesAnalytics = async (req, res) => {
  try {
    const profile = await PlatformProfile.findOne({
      userId: req.user._id,
    });

    if (!profile || !profile.codeforces) {
      return res.status(404).json({
        success: false,
        message: "Codeforces profile not synced",
      });
    }

    res.status(200).json({
      success: true,
      codeforces: profile.codeforces,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const syncCodeforcesData = async (userId) => {
  const user = await User.findById(userId);

  if (!user.codeforcesUsername) {
    throw new Error("Codeforces username not found");
  }

  const cfData = await fetchCodeforcesProfile(user.codeforcesUsername);

  const contests = await fetchContestHistory(user.codeforcesUsername);

  let profile = await PlatformProfile.findOne({
    userId,
  });

  if (!profile) {
    profile = new PlatformProfile({
      userId,
    });
  }

  profile.codeforces = {
    handle: cfData.handle,

    currentRating: cfData.rating || 0,

    maxRating: cfData.maxRating || 0,

    rank: cfData.rank || "Unrated",

    maxRank: cfData.maxRank || "Unrated",

    contestCount: contests.length,

    syncedAt: new Date(),
  };

  await profile.save();

  return profile.codeforces;
};

module.exports = {
  syncCodeforcesProfile,
  getCodeforcesAnalytics,
  syncCodeforcesData,
};
