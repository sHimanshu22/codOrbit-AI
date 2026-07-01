const User = require("../models/User");
const PlatformProfile = require("../models/PlatformProfile");
const CodingActivity = require("../models/CodingActivity");
const GitHubActivity = require("../models/GitHubActivity");
const ActivitySnapshot = require("../models/ActivitySnapshot");

const { fetchGitHubProfile, fetchGitHubRepos, fetchGitHubEvents } = require("./githubService");
const { fetchLeetCodeStats } = require("./leetcodeService");
const { fetchCodeforcesProfile, fetchContestHistory } = require("./codeforcesService");
const { fetchCodeChefProfile } = require("./codechefService");

const buildActivitySnapshotUpdate = (profile = {}) => ({
  leetcodeSolved: profile.leetcode?.totalSolved || 0,
  githubRepos: profile.github?.publicRepos || 0,
  githubStars: profile.github?.totalStars || 0,
  codeforcesContests: profile.codeforces?.contestCount || 0,
});

const getOrCreateProfile = async (userId) => {
  let profile = await PlatformProfile.findOne({ userId });

  if (!profile) {
    profile = new PlatformProfile({ userId });
  }

  return profile;
};

const resetHistoricalActivity = async (userId) => {
  await Promise.all([
    CodingActivity.deleteMany({ userId }),
    GitHubActivity.deleteMany({ userId }),
  ]);
};

const rebuildGitHubActivity = async (userId, githubUsername) => {
  if (!githubUsername) {
    return [];
  }

  const events = await fetchGitHubEvents(githubUsername);
  const activityMap = new Map();

  events.forEach((event) => {
    const date = event.created_at.split("T")[0];
    const weight = event.type === "PushEvent"
      ? 2
      : event.type === "PullRequestEvent"
        ? 3
        : event.type === "IssuesEvent"
          ? 1
          : 1;

    activityMap.set(date, (activityMap.get(date) || 0) + weight);
  });

  const docs = Array.from(activityMap.entries()).map(([date, count]) => ({
    userId,
    date,
    commits: count,
    pushes: count,
    pullRequests: count,
    totalActivities: count,
  }));

  if (docs.length > 0) {
    await GitHubActivity.insertMany(docs);
  }

  return docs;
};

const rebuildCodingActivity = async (userId, leetcodeUsername) => {
  if (!leetcodeUsername) {
    return [];
  }

  const data = await fetchLeetCodeStats(leetcodeUsername);
  const calendar = JSON.parse(data?.matchedUser?.submissionCalendar || "{}");

  const docs = Object.entries(calendar).map(([timestamp, count]) => {
    const date = new Date(Number(timestamp) * 1000).toISOString().split("T")[0];

    return {
      userId,
      date,
      leetcode: count,
      totalActivities: count,
    };
  });

  if (docs.length > 0) {
    await CodingActivity.insertMany(docs);
  }

  return docs;
};

const syncPlatformProfiles = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const profile = await getOrCreateProfile(userId);

  const githubResult = user.githubUsername
    ? await syncGitHubPlatform(profile, user.githubUsername)
    : { syncStatus: "failed", lastError: "GitHub username not found" };

  const leetcodeResult = user.leetcodeUsername
    ? await syncLeetCodePlatform(profile, user.leetcodeUsername)
    : { syncStatus: "failed", lastError: "LeetCode username not found" };

  const codeforcesResult = user.codeforcesUsername
    ? await syncCodeforcesPlatform(profile, user.codeforcesUsername)
    : { syncStatus: "failed", lastError: "Codeforces username not found" };

  const codechefResult = user.codechefUsername
    ? await syncCodeChefPlatform(profile, user.codechefUsername)
    : { syncStatus: "failed", lastError: "CodeChef username not found" };

  profile.github = githubResult;
  profile.leetcode = leetcodeResult;
  profile.codeforces = codeforcesResult;
  profile.codechef = codechefResult;

  await profile.save();

  return profile;
};

const syncGitHubPlatform = async (profile, githubUsername) => {
  try {
    const githubData = await fetchGitHubProfile(githubUsername);
    const repositories = await fetchGitHubRepos(githubUsername);

    let totalStars = 0;
    let totalForks = 0;

    repositories.forEach((repo) => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
    });

    const languageMap = {};
    repositories.forEach((repo) => {
      if (repo.language) {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
      }
    });

    const languagesUsed = Object.entries(languageMap).map(([language, count]) => ({ language, count }));
    const topRepositories = repositories
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((repo) => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        repoUrl: repo.html_url,
      }));

    return {
      username: githubData.login,
      followers: githubData.followers,
      following: githubData.following,
      publicRepos: githubData.public_repos,
      totalStars,
      totalForks,
      languagesUsed,
      topRepositories,
      syncStatus: "success",
      lastError: null,
      syncedAt: new Date(),
    };
  } catch (error) {
    return {
      username: githubUsername,
      syncStatus: "failed",
      syncedAt: new Date(),
      lastError: error.message,
    };
  }
};

const syncLeetCodePlatform = async (profile, leetcodeUsername) => {
  try {
    const data = await fetchLeetCodeStats(leetcodeUsername);
    const stats = data.matchedUser.submitStats.acSubmissionNum;

    const totalSolved = stats.find((item) => item.difficulty === "All")?.count || 0;
    const easySolved = stats.find((item) => item.difficulty === "Easy")?.count || 0;
    const mediumSolved = stats.find((item) => item.difficulty === "Medium")?.count || 0;
    const hardSolved = stats.find((item) => item.difficulty === "Hard")?.count || 0;

    return {
      username: leetcodeUsername,
      totalSolved,
      easySolved,
      mediumSolved,
      hardSolved,
      syncStatus: "success",
      syncedAt: new Date(),
    };
  } catch (error) {
    return {
      username: leetcodeUsername,
      syncStatus: "failed",
      syncedAt: new Date(),
      lastError: error.message,
    };
  }
};

const syncCodeforcesPlatform = async (profile, codeforcesUsername) => {
  try {
    const cfData = await fetchCodeforcesProfile(codeforcesUsername);
    const contests = await fetchContestHistory(codeforcesUsername);

    return {
      handle: cfData.handle,
      currentRating: cfData.rating || 0,
      maxRating: cfData.maxRating || 0,
      rank: cfData.rank || "Unrated",
      maxRank: cfData.maxRank || "Unrated",
      contestCount: contests.length,
      syncStatus: "success",
      lastError: null,
      syncedAt: new Date(),
    };
  } catch (error) {
    return {
      handle: codeforcesUsername,
      currentRating: 0,
      maxRating: 0,
      rank: "Unrated",
      maxRank: "Unrated",
      contestCount: 0,
      syncStatus: "failed",
      lastError: error.message,
      syncedAt: new Date(),
    };
  }
};

const syncCodeChefPlatform = async (profile, codechefUsername) => {
  try {
    const codechefData = await fetchCodeChefProfile(codechefUsername);

    return {
      username: codechefData.username,
      currentRating: codechefData.currentRating,
      highestRating: codechefData.highestRating,
      stars: codechefData.stars,
      globalRank: codechefData.globalRank,
      countryRank: codechefData.countryRank,
      syncStatus: "success",
      lastError: null,
      syncedAt: new Date(),
    };
  } catch (error) {
    return {
      username: codechefUsername,
      syncStatus: "failed",
      syncedAt: new Date(),
      lastError: error.message,
    };
  }
};

const rebuildPlatformData = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const profile = await getOrCreateProfile(userId);

  await resetHistoricalActivity(userId);

  const [githubProfile, leetcodeProfile, codeforcesProfile, codechefProfile] = await Promise.all([
    user.githubUsername ? syncGitHubPlatform(profile, user.githubUsername) : Promise.resolve({ syncStatus: "failed", lastError: "GitHub username not found" }),
    user.leetcodeUsername ? syncLeetCodePlatform(profile, user.leetcodeUsername) : Promise.resolve({ syncStatus: "failed", lastError: "LeetCode username not found" }),
    user.codeforcesUsername ? syncCodeforcesPlatform(profile, user.codeforcesUsername) : Promise.resolve({ syncStatus: "failed", lastError: "Codeforces username not found" }),
    user.codechefUsername ? syncCodeChefPlatform(profile, user.codechefUsername) : Promise.resolve({ syncStatus: "failed", lastError: "CodeChef username not found" }),
  ]);

  profile.github = githubProfile;
  profile.leetcode = leetcodeProfile;
  profile.codeforces = codeforcesProfile;
  profile.codechef = codechefProfile;
  await profile.save();

  await Promise.all([
    rebuildGitHubActivity(userId, user.githubUsername),
    rebuildCodingActivity(userId, user.leetcodeUsername),
  ]);

  let snapshot = await ActivitySnapshot.findOne({ userId });

  const snapshotUpdate = buildActivitySnapshotUpdate(profile);

  if (!snapshot) {
    snapshot = new ActivitySnapshot({ userId, ...snapshotUpdate });
  } else {
    Object.assign(snapshot, snapshotUpdate);
  }

  snapshot.capturedAt = new Date();
  await snapshot.save();

  return profile;
};

module.exports = {
  buildActivitySnapshotUpdate,
  rebuildPlatformData,
  syncPlatformProfiles,
  resetHistoricalActivity,
  rebuildGitHubActivity,
  rebuildCodingActivity,
};
