const GitHubActivity = require("../models/GitHubActivity");
const CodingActivity = require("../models/CodingActivity");

const calculateDeveloperScore = async (profile, userId) => {
  // =========================
  // DSA Score (45 Marks)
  // =========================

  const easy = profile.leetcode?.easySolved || 0;
  const medium = profile.leetcode?.mediumSolved || 0;
  const hard = profile.leetcode?.hardSolved || 0;

  const weightedDSA = easy * 1 + medium * 2 + hard * 4;

  const dsaScore = Math.min(Math.round((weightedDSA / 800) * 45), 45);

  // =========================
  // Development Score (25 Marks)
  // =========================

  const publicRepos = profile.github?.publicRepos || 0;

  const totalStars = profile.github?.totalStars || 0;

  const followers = profile.github?.followers || 0;

  const languagesUsed = profile.github?.languagesUsed || [];

  const repoScore = Math.min(publicRepos / 3, 10);

  const starScore = Math.min(totalStars / 25, 8);

  const followerScore = Math.min(followers / 20, 3);

  const languageScore = Math.min(languagesUsed.length, 4);

  const developmentScore = Math.round(
    repoScore + starScore + followerScore + languageScore,
  );

  // =========================
  // Competitive Programming Score (20 Marks)
  // =========================

  const codeforcesRating = profile.codeforces?.currentRating || 0;

  const codechefRating = profile.codechef?.currentRating || 0;

  const bestRating = Math.max(codeforcesRating, codechefRating);

  let competitiveScore = 0;

  if (bestRating >= 2000) {
    competitiveScore = 20;
  } else if (bestRating >= 1800) {
    competitiveScore = 18;
  } else if (bestRating >= 1600) {
    competitiveScore = 16;
  } else if (bestRating >= 1400) {
    competitiveScore = 12;
  } else if (bestRating >= 1200) {
    competitiveScore = 8;
  } else if (bestRating >= 1000) {
    competitiveScore = 5;
  } else if (bestRating > 0) {
    competitiveScore = 2;
  }

  // =========================
  // Consistency Score (10 Marks)
  // =========================

  const last30Days = new Date();
  last30Days.setDate(last30Days.getDate() - 30);
  // Fetch GitHub activity
  const githubActivities = await GitHubActivity.find({
    userId,
    totalActivities: { $gt: 0 },
    date: {
      $gte: last30Days.toISOString().split("T")[0],
    },
  }).select("date");

  // Fetch LeetCode activity
  const codingActivities = await CodingActivity.find({
    userId,
    totalActivities: { $gt: 0 },
    date: {
      $gte: last30Days.toISOString().split("T")[0],
    },
  }).select("date");

  // Unique active days
  const uniqueDays = new Set();

  // GitHub dates
  githubActivities.forEach((activity) => {
    uniqueDays.add(activity.date);
  });

  // LeetCode dates
  codingActivities.forEach((activity) => {
    uniqueDays.add(activity.date);
  });

  const totalActiveDays = Math.min(uniqueDays.size, 30);

  let consistencyScore = 0;

  if (totalActiveDays >= 25) {
    consistencyScore = 10;
  } else if (totalActiveDays >= 20) {
    consistencyScore = 8;
  } else if (totalActiveDays >= 15) {
    consistencyScore = 6;
  } else if (totalActiveDays >= 10) {
    consistencyScore = 4;
  } else if (totalActiveDays >= 5) {
    consistencyScore = 2;
  }

  // =========================
  // Overall Score
  // =========================

  const overallScore = Math.round(
    dsaScore + developmentScore + competitiveScore + consistencyScore,
  );

  // =========================
  // Grade
  // =========================

  // =========================
// Developer Level
// =========================

let grade = "";
let description = "";

if (overallScore >= 95) {
  grade = "Orbit Master";
  description = "Top-tier CodOrbit profile";
} else if (overallScore >= 80) {
  grade = "Expert";
  description = "High-performing developer";
} else if (overallScore >= 60) {
  grade = "Advanced";
  description = "Strong all-around developer";
} else if (overallScore >= 40) {
  grade = "Builder";
  description = "Developing real skills";
} else if (overallScore >= 20) {
  grade = "Learner";
  description = "Building fundamentals";
} else {
  grade = "Explorer";
  description = "Just getting started";
}

  return {
    developmentScore,
    dsaScore,
    competitiveScore,
    consistencyScore,
    overallScore,
    grade,
    description,
  };
};

module.exports = {
  calculateDeveloperScore,
};
