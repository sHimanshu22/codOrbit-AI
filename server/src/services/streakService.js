const CodingActivity = require("../models/CodingActivity");

const GitHubActivity = require("../models/GitHubActivity");

const calculateStreak = (dates) => {
  if (!dates.length) {
    return {
      current: 0,
      longest: 0,
    };
  }

  const sortedDates = dates.map((date) => new Date(date)).sort((a, b) => a - b);

  let longest = 1;
  let currentRun = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const diff = (sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24);

    if (Math.round(diff) === 1) {
      currentRun++;

      longest = Math.max(longest, currentRun);
    } else {
      currentRun = 1;
    }
  }

  // Current Streak
  let current = 0;

  const dateSet = new Set(dates);

  const today = new Date();

  const todayString = today.toISOString().split("T")[0];

  const yesterday = new Date();

  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayString = yesterday.toISOString().split("T")[0];

  if (!dateSet.has(todayString) && !dateSet.has(yesterdayString)) {
    current = 0;
  } else {
    const tempDate = dateSet.has(todayString)
      ? new Date(today)
      : new Date(yesterday);

    while (true) {
      const formatted = tempDate.toISOString().split("T")[0];

      if (dateSet.has(formatted)) {
        current++;

        tempDate.setDate(tempDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  console.log("Incoming Dates:");
  console.log(dates);

  console.log("Sorted Dates:");
  console.log(sortedDates);

  console.log("Today:");
  console.log(new Date());

  console.log("Today String:");
  console.log(new Date().toISOString().split("T")[0]);

  return {
    current,
    longest,
  };
};

const getUserStreaks = async (userId) => {
  const codingDocs = await CodingActivity.find({
    userId,

    totalActivities: {
      $gt: 0,
    },
  });

  const githubDocs = await GitHubActivity.find({
    userId,

    totalActivities: {
      $gt: 0,
    },
  });

  const codingDates = codingDocs.map((doc) => doc.date);

  const githubDates = githubDocs.map((doc) => doc.date);

  console.log("Coding Dates:");
  console.log(codingDates);

  console.log("GitHub Dates:");
  console.log(githubDates);

  return {
    coding: calculateStreak(codingDates),

    github: calculateStreak(githubDates),
  };
};

module.exports = {
  getUserStreaks,
};
