const User = require("../models/User");
const PlatformProfile = require("../models/PlatformProfile");

const {
  fetchGitHubProfile,
  fetchGitHubRepos,
} = require("../services/githubService");

const syncGitHubProfile = async (req, res) => {
  try {
    const githubData = await syncGitHubData(req.user._id);

    res.status(200).json({
      success: true,
      github: githubData,
    });
  } catch (error) {
    let profile = await PlatformProfile.findOne({
      userId: user._id,
    });

    if (profile) {
      profile.github = null;

      await profile.save();
    }

    return res.status(404).json({
      success: false,
      message: "GitHub profile not found",
    });
  }
};
const getGitHubAnalytics = async (req, res) => {
  try {
    const profile = await PlatformProfile.findOne({
      userId: req.user._id,
    });

    if (!profile || !profile.github) {
      return res.status(404).json({
        success: false,
        message: "GitHub profile not synced",
      });
    }

    res.status(200).json({
      success: true,
      github: profile.github,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const syncGitHubData = async (userId) => {
  const user = await User.findById(userId);

  console.log("GitHub Username From User Collection:", user.githubUsername);

  if (!user.githubUsername) {
    throw new Error("GitHub username not found");
  }

  let profile = await PlatformProfile.findOne({
    userId,
  });

  if (!profile) {
    profile = new PlatformProfile({
      userId,
    });
  }

  try {
    const githubData = await fetchGitHubProfile(user.githubUsername);

    const repositories = await fetchGitHubRepos(user.githubUsername);

    let totalStars = 0;
    let totalForks = 0;

    repositories.forEach((repo) => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
    });

    // language logic

    // topRepositories logic

    profile.github = {
      username: githubData.login,

      followers: githubData.followers,

      following: githubData.following,

      publicRepos: githubData.public_repos,

      totalStars,

      totalForks,

      syncStatus: "success",

      syncedAt: new Date(),
    };

    await profile.save();
  } catch (error) {
    profile.github = {
      syncStatus: "failed",
      syncedAt: new Date(),
      lastError: error.message,
    };

    await profile.save();

    throw error;
  }
};

module.exports = {
  syncGitHubProfile,
  getGitHubAnalytics,
  syncGitHubData,
};
