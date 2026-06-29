const DSAProgress = require("../models/DSAProgress");

const User = require("../models/User");
const DSAQuestion = require("../models/DSAQuestion");
const DSASheet = require("../models/DSASheet");
const { getDSAAnalytics } = require("../services/dsaAnalyticsService");

const getQuestions = async (req, res) => {
  try {
    const sheet = req.query.sheet || "Striver A2Z";

    const progress = await DSAProgress.findOne({
      userId: req.user._id,
    });

    const questionsData = await DSAQuestion.find({
      sheetName: sheet,
    }).sort({
      order: 1,
    });

    const questions = questionsData.map((question) => {
      const solvedQuestion = progress?.questions.find(
        (q) => q.questionId?.toString() === question._id.toString(),
      );

      return {
        ...question.toObject(),

        solved: solvedQuestion?.solved || false,

        bookmarked: solvedQuestion?.bookmarked || false,

        notes: solvedQuestion?.notes || "",

        revisionCount: solvedQuestion?.revisionCount || 0,
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
    const {
      questionId,
      title,
      module,
      section,
      difficulty,
      sheetName,
      isConcept,
    } = req.body;

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
      (q) => q.questionId.toString() === questionId,
    );

    if (existingQuestion) {
      existingQuestion.solved = !existingQuestion.solved;

      existingQuestion.solvedAt = existingQuestion.solved ? new Date() : null;
    } else {
      progress.questions.push({
        questionId,

        title,

        module,

        section,

        sheetName,

        difficulty,

        isConcept,

        solved: true,

        solvedAt: new Date(),

        bookmarked: false,

        notes: "",

        revisionCount: 0,
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

const toggleBookmark = async (req, res) => {
  try {
    const { questionId } = req.body;

    let progress = await DSAProgress.findOne({
      userId: req.user._id,
    });

    if (!progress) {
      progress = await DSAProgress.create({
        userId: req.user._id,
        questions: [],
      });
    }

    let questionProgress = progress.questions.find(
      (q) => q.questionId?.toString() === questionId,
    );

    // Question never touched before
    if (!questionProgress) {
      const question = await DSAQuestion.findById(questionId);

      if (!question) {
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });
      }

      progress.questions.push({
        questionId: question._id,

        title: question.title,

        sheetName: question.sheetName,

        module: question.module,

        section: question.section,

        difficulty: question.difficulty,

        isConcept: question.isConcept,

        solved: false,

        bookmarked: true,

        bookmarkedAt: new Date(),
      });

      await progress.save();

      return res.status(200).json({
        success: true,
        bookmarked: true,
      });
    }

    // Existing entry
    questionProgress.bookmarked = !questionProgress.bookmarked;

    questionProgress.bookmarkedAt = questionProgress.bookmarked
      ? new Date()
      : null;

    await progress.save();

    res.status(200).json({
      success: true,
      bookmarked: questionProgress.bookmarked,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateNotes = async (req, res) => {
  try {
    const { questionId, notes } = req.body;

    let progress = await DSAProgress.findOne({
      userId: req.user._id,
    });

    if (!progress) {
      progress = await DSAProgress.create({
        userId: req.user._id,
        questions: [],
      });
    }

    let questionProgress = progress.questions.find(
      (q) => q.questionId?.toString() === questionId,
    );

    // Question never touched before
    if (!questionProgress) {
      const question = await DSAQuestion.findById(questionId);

      if (!question) {
        return res.status(404).json({
          success: false,
          message: "Question not found",
        });
      }

      progress.questions.push({
        questionId: question._id,

        title: question.title,

        sheetName: question.sheetName,

        module: question.module,

        section: question.section,

        difficulty: question.difficulty,

        isConcept: question.isConcept,

        solved: false,

        bookmarked: false,

        notes: notes || "",
      });

      await progress.save();

      return res.status(200).json({
        success: true,
        notes,
      });
    }

    // Existing entry
    questionProgress.notes = notes || "";

    await progress.save();

    res.status(200).json({
      success: true,
      notes: questionProgress.notes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookmarkedQuestions = async (req, res) => {
  try {
    const progress = await DSAProgress.findOne({
      userId: req.user._id,
    });

    if (!progress) {
      return res.status(200).json({
        success: true,
        questions: [],
      });
    }

    const bookmarkedProgress = progress.questions
      .filter((q) => q.bookmarked)
      .sort(
        (a, b) => new Date(b.bookmarkedAt || 0) - new Date(a.bookmarkedAt || 0),
      );

    const bookmarkedIds = bookmarkedProgress.map((q) => q.questionId);

    const questions = await DSAQuestion.find({
      _id: { $in: bookmarkedIds },
    });
    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]));

    const mergedQuestions = bookmarkedProgress
      .map((progressData) => {
        const question = questionMap.get(progressData.questionId.toString());

        if (!question) return null;

        return {
          ...question.toObject(),

          solved: progressData.solved,

          bookmarked: progressData.bookmarked,

          solvedAt: progressData.solvedAt,

          bookmarkedAt: progressData.bookmarkedAt,
        };
      })
      .filter(Boolean);

    res.status(200).json({
      success: true,
      questions: mergedQuestions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProgress = async (req, res) => {
  try {
    const sheet = req.query.sheet || "Striver A2Z";

    const analytics = await getDSAAnalytics({
      userId: req.user._id,
      sheet,
    });

    res.status(200).json({
      success: true,
      totalQuestions: analytics.totalQuestions,
      solvedQuestions: analytics.totalSolved,
      completionPercentage: analytics.completionPercentage,
      moduleProgress: analytics.moduleStats,
      topicStats: analytics.topicStats,
      difficultyStats: analytics.difficultyStats,
      strongestTopic: analytics.strongestTopic,
      weakestTopic: analytics.weakestTopic,
      readiness: analytics.readiness,
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

    const solvedIds = new Set(
      progress?.questions
        ?.filter((q) => q.solved)
        .map((q) => q.questionId.toString()) || [],
    );

    const sheetNames = await DSAQuestion.distinct("sheetName");

    const sheetStats = [];

    let totalQuestions = 0;
    let totalSolved = 0;

    for (const sheetName of sheetNames) {
      const questions = await DSAQuestion.find({
        sheetName,
      });

      const sheetTotal = questions.length;

      const sheetSolved = questions.filter((q) =>
        solvedIds.has(q._id.toString()),
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

    const solvedQuestionIds = new Set(
      progress?.questions
        ?.filter((q) => q.solved)
        .map((q) => q.questionId.toString()) || [],
    );

    const sheetStats = [];

    let totalQuestions = 0;
    let totalSolved = 0;
    for (const sheetName of user.activeSheets) {
      const questions = await DSAQuestion.find({
        sheetName,
      });

      // Skip sheets not seeded yet
      if (questions.length === 0) {
        continue;
      }

      const sheetTotal = questions.length;

      const sheetSolved = questions.filter((q) =>
        solvedQuestionIds.has(q._id.toString()),
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
        activeSheets: sheetStats.map((sheet) => sheet.sheet),

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
    const sheet = req.query.sheet || "Striver A2Z";

    const analytics = await getDSAAnalytics({
      userId: req.user._id,
      sheet,
    });

    res.status(200).json({
      success: true,
      coach: {
        title: analytics.title,
        completion: analytics.completion,
        readiness: analytics.readiness,
        weakTopics: analytics.weakestTopics,
        recommendation: analytics.recommendation,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSkillAnalysis = async (req, res) => {
  try {
    const sheet = req.query.sheet || "Striver A2Z";

    const analytics = await getDSAAnalytics({
      userId: req.user._id,
      sheet,
    });

    res.status(200).json({
      success: true,
      analysis: {
        strengths: analytics.strengths,
        weaknesses: analytics.weaknesses,
        focusTopics: analytics.focusTopics,
        recommendation: analytics.recommendation,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAvailableSheets = async (req, res) => {
  try {
    const sheets = await DSASheet.find({})
      .select(
        "name description totalQuestions moduleCount difficulty bestFor roadmap",
      )
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      sheets,
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
  getOverallProgress,
  getActiveSheetsOverview,
  getAICoach,
  getSkillAnalysis,
  toggleBookmark,
  getBookmarkedQuestions,
  updateNotes,
  getAvailableSheets,
};
