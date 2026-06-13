const User = require("../models/User");
const PlatformProfile = require("../models/PlatformProfile");

const { fetchLeetCodeStats } = require("../services/leetcodeService");

// Sync LeetCode Data
const syncLeetCodeProfile =
  async (req, res) => {
    try {

      const leetcodeData =
        await syncLeetCodeData(
          req.user._id
        );

      res.status(200).json({
        success: true,
        leetcode:
          leetcodeData,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
};

// Get LeetCode Analytics
const getLeetCodeAnalytics = async (req, res) => {
  try {
    const profile = await PlatformProfile.findOne({
      userId: req.user._id,
    });

    if (!profile || !profile.leetcode) {
      return res.status(404).json({
        success: false,
        message: "LeetCode profile not synced",
      });
    }

    res.status(200).json({
      success: true,
      leetcode: profile.leetcode,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const syncLeetCodeData = async (
  userId
) => {

  const user =
    await User.findById(userId);

  if (!user.leetcodeUsername) {
    throw new Error(
      "LeetCode username not found"
    );
  }

  const data =
    await fetchLeetCodeStats(
      user.leetcodeUsername
    );

  const stats =
    data.matchedUser.submitStats
      .acSubmissionNum;

  const totalSolved =
    stats.find(
      (item) =>
        item.difficulty === "All"
    )?.count || 0;

  const easySolved =
    stats.find(
      (item) =>
        item.difficulty === "Easy"
    )?.count || 0;

  const mediumSolved =
    stats.find(
      (item) =>
        item.difficulty === "Medium"
    )?.count || 0;

  const hardSolved =
    stats.find(
      (item) =>
        item.difficulty === "Hard"
    )?.count || 0;

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

  profile.leetcode = {
    username:
      user.leetcodeUsername,

    totalSolved,

    easySolved,

    mediumSolved,

    hardSolved,

    syncedAt: new Date(),
  };

  await profile.save();

  return profile.leetcode;
};

module.exports = {
  syncLeetCodeProfile,
  getLeetCodeAnalytics,
  syncLeetCodeData,
};
