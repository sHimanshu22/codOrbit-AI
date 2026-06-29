const DSAProgress = require("../models/DSAProgress");
const DSAQuestion = require("../models/DSAQuestion");

const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];

const round = (value) => Math.round(value);

const formatTopicsList = (topics) => {
  if (topics.length === 0) return "";
  if (topics.length === 1) return topics[0];
  if (topics.length === 2) return `${topics[0]} and ${topics[1]}`;
  return `${topics.slice(0, -1).join(", ")} and ${topics[topics.length - 1]}`;
};

const getReadinessStage = (completion) => {
  if (completion >= 70) {
    return {
      title: "Placement Ready",
      readiness: "Placement Ready",
      description:
        "Start solving hard problems, contests and mock interviews regularly.",
    };
  }

  if (completion >= 30) {
    return {
      title: "Intermediate Stage",
      readiness: "Intermediate",
      description:
        "Focus on Trees, Graphs and Dynamic Programming. Improve problem solving speed.",
    };
  }

  return {
    title: "Beginner Stage",
    readiness: "Beginner",
    description: "Focus on fundamentals and build consistency.",
  };
};

const buildRecommendation = (weakestTopics, completion) => {
  if (weakestTopics.length === 0) {
    return "Keep solving problems consistently and focus on building strong fundamentals.";
  }

  const topicsText = formatTopicsList(weakestTopics);

  if (completion >= 70) {
    return `Maintain strength in ${topicsText} while solving harder problems regularly.`;
  }

  if (completion >= 30) {
    return `Focus on ${topicsText} this week before moving to advanced topics.`;
  }

  return `Focus on ${topicsText} this week while strengthening your fundamentals.`;
};

const initializeDifficultyStats = () => {
  const difficultyStats = {};

  DIFFICULTY_LEVELS.forEach((difficulty) => {
    difficultyStats[difficulty] = {
      total: 0,
      solved: 0,
      percentage: 0,
    };
  });

  return difficultyStats;
};

const getDSAAnalytics = async ({ userId, sheet = "Striver A2Z" }) => {
  const questions = await DSAQuestion.find({ sheetName: sheet });

  const progress = await DSAProgress.findOne({ userId });

  const solvedQuestionIds = new Set(
    progress?.questions
      .filter((q) => q.solved)
      .map((q) => q.questionId.toString()) || [],
  );

  const totalQuestions = questions.length;

  let solvedQuestions = 0;

  const moduleStats = {};
  const difficultyStats = initializeDifficultyStats();

  questions.forEach((question) => {
    const module = question.module || "Unknown";
    const difficulty = DIFFICULTY_LEVELS.includes(question.difficulty)
      ? question.difficulty
      : "Easy";

    const solved = solvedQuestionIds.has(question._id.toString());

    if (solved) {
      solvedQuestions += 1;
    }

    if (!moduleStats[module]) {
      moduleStats[module] = {
        total: 0,
        solved: 0,
        percentage: 0,
      };
    }

    moduleStats[module].total += 1;

    if (solved) {
      moduleStats[module].solved += 1;
    }

    difficultyStats[difficulty].total += 1;

    if (solved) {
      difficultyStats[difficulty].solved += 1;
    }
  });

  Object.entries(moduleStats).forEach(([module, stats]) => {
    stats.percentage =
      stats.total > 0 ? round((stats.solved / stats.total) * 100) : 0;
  });

  DIFFICULTY_LEVELS.forEach((difficulty) => {
    const stats = difficultyStats[difficulty];

    stats.percentage =
      stats.total > 0 ? round((stats.solved / stats.total) * 100) : 0;
  });

  const completion =
    totalQuestions > 0 ? round((solvedQuestions / totalQuestions) * 100) : 0;

  const performance = Object.entries(moduleStats).map(([module, stats]) => ({
    topic: module,
    module,
    percentage: stats.percentage,
  }));

  const strengths = performance
    .filter((item) => item.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3)
    .map((item) => ({
      ...item,
      topic: item.topic,
    }));

  const weaknesses = performance
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3)
    .map((item) => ({
      ...item,
      topic: item.topic,
    }));

  const weakestTopics = weaknesses.map((item) => item.topic);

  const readinessStage = getReadinessStage(completion);

  const recommendation = buildRecommendation(weakestTopics, completion);

  return {
    completion,
    totalSolved: solvedQuestions,
    totalQuestions,
    completionPercentage: completion,
    moduleStats,
    topicStats: moduleStats,
    difficultyStats,
    strengths,
    weaknesses,
    focusTopics: weakestTopics,
    recommendation,
    strongestTopics: strengths,
    weakestTopics,
    strongestTopic: strengths[0]?.topic || "",
    weakestTopic: weakestTopics[0] || "",
    readiness: readinessStage.readiness,
    title: readinessStage.title,
    readinessMessage: readinessStage.description,
  };
};

module.exports = {
  getDSAAnalytics,
};
