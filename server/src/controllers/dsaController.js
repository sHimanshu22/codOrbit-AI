const DSAProgress = require("../models/DSAProgress");
const dsaSheets = require("../data/dsaSheets");

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

module.exports = {
  getQuestions,
  toggleQuestion,
  getProgress,
};
