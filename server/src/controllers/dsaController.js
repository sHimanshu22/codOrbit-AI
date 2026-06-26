const DSAProgress = require("../models/DSAProgress");

const User = require("../models/User");
const DSAQuestion = require("../models/DSAQuestion");
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
const questionMap = new Map(
  questions.map((q) => [q._id.toString(), q]),
);

const mergedQuestions = bookmarkedProgress
  .map((progressData) => {
    const question = questionMap.get(
      progressData.questionId.toString(),
    );

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

    const questions = await DSAQuestion.find({
      sheetName: sheet,
    });

    const progress = await DSAProgress.findOne({
      userId: req.user._id,
    });

    const solvedQuestionIds = new Set(
      progress?.questions
        .filter((q) => q.solved)
        .map((q) => q.questionId.toString()) || [],
    );

    const totalQuestions = questions.length;

    const solvedQuestions = questions.filter((question) =>
      solvedQuestionIds.has(question._id.toString()),
    ).length;

    const completionPercentage =
      totalQuestions > 0
        ? Math.round((solvedQuestions / totalQuestions) * 100)
        : 0;

    const moduleProgress = {};

    questions.forEach((question) => {
      const module = question.module;

      if (!moduleProgress[module]) {
        moduleProgress[module] = {
          total: 0,
          solved: 0,
        };
      }

      moduleProgress[module].total++;

      if (solvedQuestionIds.has(question._id.toString())) {
        moduleProgress[module].solved++;
      }
    });

    res.status(200).json({
      success: true,

      totalQuestions,

      solvedQuestions,

      completionPercentage,

      moduleProgress,
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

    const questions = await DSAQuestion.find({
      sheetName: sheet,
    });

    const progress = await DSAProgress.findOne({
      userId: req.user._id,
    });

    if (!progress) {
      return res.status(200).json({
        success: true,
        coach: {
          title: "Getting Started",
          completion: 0,
          readiness: "Beginner",
          weakTopics: [],
          recommendation:
            "Start solving your first DSA problem to unlock AI insights.",
        },
      });
    }

    const solvedIds = new Set(
      progress.questions
        .filter((q) => q.solved)
        .map((q) => q.questionId.toString()),
    );

    const totalQuestions = questions.length;

    const solvedCount = questions.filter((q) =>
      solvedIds.has(q._id.toString()),
    ).length;

    const percentage =
      totalQuestions > 0 ? Math.round((solvedCount / totalQuestions) * 100) : 0;

    const moduleStats = {};

    questions.forEach((question) => {
      const module = question.module;

      if (!moduleStats[module]) {
        moduleStats[module] = {
          total: 0,
          solved: 0,
        };
      }

      moduleStats[module].total++;

      if (solvedIds.has(question._id.toString())) {
        moduleStats[module].solved++;
      }
    });

    const weakTopics = Object.entries(moduleStats)
      .map(([module, stats]) => ({
        module,
        percentage:
          stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0,
      }))
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 3)
      .map((item) => item.module);

    let title = "Beginner Stage";

    let readiness = "Beginner";

    let recommendation = "Focus on fundamentals and build consistency.";

    if (percentage >= 30 && percentage < 70) {
      title = "Intermediate Stage";

      readiness = "Intermediate";

      recommendation =
        "Focus on Trees, Graphs and Dynamic Programming. Improve problem solving speed.";
    }

    if (percentage >= 70) {
      title = "Placement Ready";

      readiness = "Placement Ready";

      recommendation =
        "Start solving hard problems, contests and mock interviews regularly.";
    }

    res.status(200).json({
      success: true,

      coach: {
        title,

        completion: percentage,

        readiness,

        weakTopics,

        recommendation,
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

    const questions = await DSAQuestion.find({
      sheetName: sheet,
    });

    const progress = await DSAProgress.findOne({
      userId: req.user._id,
    });

    if (!progress) {
      return res.status(200).json({
        success: true,
        analysis: {
          strengths: [],
          weaknesses: [],
          focusTopics: [],
          recommendation: "Start solving problems to unlock analysis.",
        },
      });
    }

    const solvedIds = new Set(
      progress.questions
        .filter((q) => q.solved)
        .map((q) => q.questionId.toString()),
    );

    const moduleStats = {};

    questions.forEach((question) => {
      const module = question.module;

      if (!moduleStats[module]) {
        moduleStats[module] = {
          total: 0,
          solved: 0,
        };
      }

      moduleStats[module].total++;

      if (solvedIds.has(question._id.toString())) {
        moduleStats[module].solved++;
      }
    });

    const performance = Object.entries(moduleStats)
      .map(([module, stats]) => ({
        module,

        percentage:
          stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    const strengths = performance.slice(0, 3);

    const weaknesses = [...performance].reverse().slice(0, 3);

    const focusTopics = weaknesses.map((item) => item.module);

    const recommendation = focusTopics.length
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
      message: error.message,
    });
  }
};
const getAvailableSheets = async (req, res) => {
  try {
    const sheets = await DSAQuestion.aggregate([
      {
        $group: {
          _id: "$sheetName",

          questionCount: {
            $sum: 1,
          },

          modules: {
            $addToSet: "$module",
          },
        },
      },

      {
        $project: {
          _id: 0,

          name: "$_id",

          questionCount: 1,

          moduleCount: {
            $size: "$modules",
          },

          modules: 1,
        },
      },

      {
        $sort: {
          name: 1,
        },
      },
    ]);

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
