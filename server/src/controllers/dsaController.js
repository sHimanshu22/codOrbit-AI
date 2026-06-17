const DSAProgress = require("../models/DSAProgress");
const dsaSheets = require("../data/dsaSheets");
const User = require("../models/User");

const getQuestions = async (req, res) => {
  try {
    const progress = await DSAProgress.findOne({
      userId: req.user._id,
    });

    const sheet = req.query.sheet || "Striver A2Z";

    const questionsData = dsaSheets[sheet] || [];

    const questions = questionsData.map((question) => {
      const solvedQuestion = progress?.questions.find(
        (q) => q.questionId === question.id,
      );

      return {
        ...question,

        solved: solvedQuestion?.solved || false,
      };
    });

    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const toggleQuestion = async (req, res) => {
  try {
    const { questionId, title, topic, difficulty, sheet } = req.body;

    let progress = await DSAProgress.findOne({
      userId: req.user._id,
    });

    if (!progress) {
      progress = new DSAProgress({
        userId: req.user._id,
        questions: [],
      });
    }

    const existingQuestion = progress.questions.find(
      (q) => q.questionId === questionId,
    );

    if (existingQuestion) {
      existingQuestion.solved = !existingQuestion.solved;

      existingQuestion.solvedAt = existingQuestion.solved ? new Date() : null;
    } else {
      progress.questions.push({
        questionId,
        title,
        topic,
        difficulty,
        sheet: sheet || "Striver A2Z",
        solved: true,
        solvedAt: new Date(),
      });
    }

    await progress.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProgress = async (req, res) => {
  const sheet = req.query.sheet || "Striver A2Z";

  const questionsData = dsaSheets[sheet] || [];
  try {
    const progress = await DSAProgress.findOne({
      userId: req.user._id,
    });

    const solvedQuestions =
      progress?.questions.filter((q) => q.solved && q.sheet === sheet) || [];

    const totalQuestions = questionsData.length;

    const solvedCount = solvedQuestions.length;

    const percentage =
      totalQuestions > 0 ? Math.round((solvedCount / totalQuestions) * 100) : 0;

    // Topic Stats
    const topicStats = {};

    questionsData.forEach((question) => {
      if (!topicStats[question.topic]) {
        topicStats[question.topic] = {
          total: 0,
          solved: 0,
        };
      }

      topicStats[question.topic].total++;
    });

    solvedQuestions.forEach((question) => {
      if (topicStats[question.topic]) {
        topicStats[question.topic].solved++;
      }
    });

    // Difficulty Stats
    const difficultyStats = {
      Easy: {
        total: 0,
        solved: 0,
      },
      Medium: {
        total: 0,
        solved: 0,
      },
      Hard: {
        total: 0,
        solved: 0,
      },
    };

    questionsData.forEach((question) => {
      if (difficultyStats[question.difficulty]) {
        difficultyStats[question.difficulty].total++;
      }
    });

    solvedQuestions.forEach((question) => {
      if (difficultyStats[question.difficulty]) {
        difficultyStats[question.difficulty].solved++;
      }
    });

    // Strongest & Weakest Topic
    let strongestTopic = null;
    let weakestTopic = null;

    let highestPercentage = -1;
    let lowestPercentage = 101;

    Object.entries(topicStats).forEach(([topic, stats]) => {
      const topicPercentage =
        stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0;

      if (topicPercentage > highestPercentage) {
        highestPercentage = topicPercentage;

        strongestTopic = topic;
      }

      if (topicPercentage < lowestPercentage) {
        lowestPercentage = topicPercentage;

        weakestTopic = topic;
      }
    });

    const pendingQuestions = totalQuestions - solvedCount;

    let readiness = "Beginner";

    if (percentage >= 30) {
      readiness = "Intermediate";
    }

    if (percentage >= 70) {
      readiness = "Placement Ready";
    }

    res.status(200).json({
      success: true,

      progress: {
        totalQuestions,
        solvedCount,
        pendingQuestions,
        percentage,

        strongestTopic,
        weakestTopic,
        readiness,

        topicStats,
        difficultyStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOverallProgress = async (req, res) => {
  try {
    const progress = await DSAProgress.findOne({
      userId: req.user._id,
    });

    const solvedQuestions = progress?.questions.filter((q) => q.solved) || [];

    const sheetStats = [];

    let totalQuestions = 0;
    let totalSolved = 0;

    Object.entries(dsaSheets).forEach(([sheetName, questions]) => {
      const sheetTotal = questions.length;

      const sheetSolved = solvedQuestions.filter(
        (q) => q.sheet === sheetName,
      ).length;

      const percentage =
        sheetTotal > 0 ? Math.round((sheetSolved / sheetTotal) * 100) : 0;

      sheetStats.push({
        sheet: sheetName,

        total: sheetTotal,

        solved: sheetSolved,

        percentage,
      });

      totalQuestions += sheetTotal;

      totalSolved += sheetSolved;
    });

    const overallPercentage =
      totalQuestions > 0 ? Math.round((totalSolved / totalQuestions) * 100) : 0;

    res.status(200).json({
      success: true,

      overview: {
        totalQuestions,

        totalSolved,

        overallPercentage,

        sheetStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getActiveSheetsOverview = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const progress = await DSAProgress.findOne({
      userId: req.user._id,
    });

    const solvedQuestions = progress?.questions.filter((q) => q.solved) || [];

    const sheetStats = [];

    let totalQuestions = 0;
    let totalSolved = 0;

    for (const sheetName of user.activeSheets) {
      const questions = dsaSheets[sheetName] || [];

      const sheetTotal = questions.length;

      const sheetSolved = solvedQuestions.filter(
        (q) => q.sheet === sheetName,
      ).length;

      const percentage =
        sheetTotal > 0 ? Math.round((sheetSolved / sheetTotal) * 100) : 0;

      sheetStats.push({
        sheet: sheetName,

        total: sheetTotal,

        solved: sheetSolved,

        percentage,
      });

      totalQuestions += sheetTotal;

      totalSolved += sheetSolved;
    }

    const overallPercentage =
      totalQuestions > 0 ? Math.round((totalSolved / totalQuestions) * 100) : 0;

    res.status(200).json({
      success: true,

      overview: {
        activeSheets: user.activeSheets,

        totalQuestions,

        totalSolved,

        overallPercentage,

        sheetStats,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

const getAICoach = async (req, res) => {
  try {

    const sheet =
      req.query.sheet ||
      "Striver A2Z";

    const questionsData =
      dsaSheets[sheet] || [];

    const progress =
      await DSAProgress.findOne({
        userId: req.user._id,
      });

    if (!progress) {

      return res.status(200).json({
        success: true,

        coach: {
          title:
            "Getting Started",

          recommendation:
            "Start solving your first DSA problem to unlock AI insights.",

          focusTopics: [],

          readiness:
            "Beginner",
        },
      });
    }

    const solvedQuestions =
      progress.questions.filter(
        (q) =>
          q.solved &&
          q.sheet === sheet
      );

    const totalQuestions =
      questionsData.length;

    const solvedCount =
      solvedQuestions.length;

    const percentage =
      totalQuestions > 0
        ? Math.round(
            (solvedCount /
              totalQuestions) *
              100
          )
        : 0;

    const topicStats = {};

    questionsData.forEach(
      (question) => {

        if (
          !topicStats[
            question.topic
          ]
        ) {

          topicStats[
            question.topic
          ] = {
            total: 0,
            solved: 0,
          };
        }

        topicStats[
          question.topic
        ].total++;
      }
    );

    solvedQuestions.forEach(
      (question) => {

        if (
          topicStats[
            question.topic
          ]
        ) {

          topicStats[
            question.topic
          ].solved++;
        }
      }
    );

    const weakTopics =
      Object.entries(
        topicStats
      )
        .map(
          ([topic, stats]) => ({
            topic,

            percentage:
              stats.total > 0
                ? Math.round(
                    (stats.solved /
                      stats.total) *
                      100
                  )
                : 0,
          })
        )
        .sort(
          (a, b) =>
            a.percentage -
            b.percentage
        )
        .slice(0, 3)
        .map(
          (item) =>
            item.topic
        );

    let title =
      "Beginner Stage";

    let recommendation =
      "";

    let readiness =
      "Beginner";

    if (percentage < 30) {

      recommendation =
        "Focus on Arrays, Hashing and Basic Recursion before moving to advanced topics.";

    } else if (
      percentage < 70
    ) {

      title =
        "Intermediate Stage";

      readiness =
        "Intermediate";

      recommendation =
        "Focus on Graphs, Trees and Dynamic Programming. Improve problem solving speed.";

    } else {

      title =
        "Placement Ready";

      readiness =
        "Placement Ready";

      recommendation =
        "Start solving Hard problems, mock interviews and contest questions regularly.";
    }

    res.status(200).json({
      success: true,

      coach: {

        title,

        completion:
          percentage,

        readiness,

        weakTopics,

        recommendation,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

const getSkillAnalysis =
  async (req, res) => {

    try {

      const sheet =
        req.query.sheet ||
        "Striver A2Z";

      const questionsData =
        dsaSheets[sheet] || [];

      const progress =
        await DSAProgress.findOne({
          userId: req.user._id,
        });

      if (!progress) {

        return res.status(200).json({
          success: true,

          analysis: {

            strengths: [],

            weaknesses: [],

            focusTopics: [],

            recommendation:
              "Start solving problems to unlock analysis.",
          },
        });
      }

      const solvedQuestions =
        progress.questions.filter(
          (q) =>
            q.solved &&
            q.sheet === sheet
        );

      const topicStats = {};

      questionsData.forEach(
        (question) => {

          if (
            !topicStats[
              question.topic
            ]
          ) {

            topicStats[
              question.topic
            ] = {
              total: 0,
              solved: 0,
            };
          }

          topicStats[
            question.topic
          ].total++;
        }
      );

      solvedQuestions.forEach(
        (question) => {

          if (
            topicStats[
              question.topic
            ]
          ) {

            topicStats[
              question.topic
            ].solved++;
          }
        }
      );

      const topicPerformance =
        Object.entries(topicStats)
          .map(
            ([topic, stats]) => ({
              topic,

              percentage:
                stats.total > 0
                  ? Math.round(
                      (stats.solved /
                        stats.total) *
                        100
                    )
                  : 0,
            })
          )
          .sort(
            (a, b) =>
              b.percentage -
              a.percentage
          );

      const strengths =
        topicPerformance
          .slice(0, 3);

      const weaknesses =
        [...topicPerformance]
          .reverse()
          .slice(0, 3);

      const focusTopics =
        weaknesses.map(
          (item) =>
            item.topic
        );

      const recommendation =
        focusTopics.length
          ? `Focus on ${focusTopics.join(", ")} over the next week.`
          : "Keep solving consistently.";

      res.status(200).json({

        success: true,

        analysis: {

          strengths,

          weaknesses,

          focusTopics,

          recommendation,
        },
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
  getQuestions,
  toggleQuestion,
  getProgress,
  getOverallProgress,
  getActiveSheetsOverview,
  getAICoach,
  getSkillAnalysis
};
