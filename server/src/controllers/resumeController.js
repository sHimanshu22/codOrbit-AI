const pdf = require("pdf-parse");

const {
  analyzeResumeWithAI,
} = require("../services/resumeAnalysisService");

const {
  calculateResumeScore,
} = require("../services/resumeScoreService");

const {
  calculateJDMatch,
} = require("../services/jdMatchService");

const analyzeResume = async (req, res) => {
  try {
    const resumeFile =
      req.files?.resume?.[0];

    const jdFile =
      req.files?.jobDescription?.[0];

    if (!resumeFile) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    // =====================
    // Resume Extraction
    // =====================

    const resumePdf =
      await pdf(resumeFile.buffer);

    const resumeText =
      resumePdf.text;

    // =====================
    // JD Extraction
    // =====================

    let jdText = "";

    if (jdFile) {
      const jdPdf =
        await pdf(jdFile.buffer);

      jdText =
        jdPdf.text;
    }

    if (req.body.jobDescriptionText) {
      jdText =
        req.body.jobDescriptionText;
    }

    // =====================
    // Rule Based Resume Score
    // =====================

    const scoreData =
      calculateResumeScore(
        resumeText
      );

    // =====================
    // JD Match
    // =====================

    const jdMatch =
      calculateJDMatch(
        resumeText,
        jdText
      );

    // =====================
    // Gemini Analysis
    // =====================

    let analysis =
      await analyzeResumeWithAI(
        resumeText
      );

    analysis = analysis
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const parsedAnalysis =
      JSON.parse(analysis);

    // =====================
    // Final Response
    // =====================

    const finalAnalysis = {
      ...parsedAnalysis,

      score:
        scoreData.score,

      atsScore: Math.min(
        scoreData.score + 10,
        100
      ),

      grade:
        scoreData.grade,

      breakdown:
        scoreData.breakdown,

      strengths: [
        ...new Set([
          ...scoreData.strengths,
          ...(parsedAnalysis.strengths || []),
        ]),
      ],

      weaknesses: [
        ...new Set([
          ...scoreData.weaknesses,
          ...(parsedAnalysis.weaknesses || []),
        ]),
      ],

      suggestions: [
        ...new Set([
          ...scoreData.suggestions,
          ...(parsedAnalysis.suggestions || []),
        ]),
      ],

      jdMatch,
    };

    res.status(200).json({
      success: true,
      analysis:
        finalAnalysis,
    });
  } catch (error) {
    console.error(
      "RESUME ANALYSIS ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

module.exports = {
  analyzeResume,
};