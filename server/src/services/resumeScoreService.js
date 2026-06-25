const generateRuleInsights = (breakdown) => {
  const strengths = [];
  const weaknesses = [];
  const suggestions = [];

  // Structure
  if (breakdown.structure >= 12) {
    strengths.push("Resume has a well-organized ATS-friendly structure.");
  } else {
    weaknesses.push("Resume structure can be improved.");

    suggestions.push(
      "Add clear sections for Education, Skills, Projects and Experience.",
    );
  }

  // Skills
  if (breakdown.skills >= 12) {
    strengths.push("Strong technical skillset detected.");
  } else {
    weaknesses.push("Technical skill coverage is limited.");

    suggestions.push(
      "Add more relevant technologies and programming languages.",
    );
  }

  // Projects
  if (breakdown.projects >= 15) {
    strengths.push("Strong project portfolio detected.");
  } else {
    weaknesses.push("Project section lacks depth.");

    suggestions.push("Add more substantial projects with clear descriptions.");
  }

  // Experience
  if (breakdown.experience < 5) {
    weaknesses.push("No professional experience detected.");

    suggestions.push(
      "Consider internships, freelance work, or open-source contributions.",
    );
  }

  // Impact
  if (breakdown.impact < 5) {
    weaknesses.push("Projects lack measurable impact.");

    suggestions.push(
      "Add metrics such as users served, performance improvements, API requests, contest rankings, or repository statistics.",
    );
  }

  return {
    strengths,
    weaknesses,
    suggestions,
  };
};

const getGrade = (score) => {
  if (score >= 85) return "A+";
  if (score >= 75) return "A";
  if (score >= 65) return "B";
  if (score >= 50) return "C";
  return "D";
};

const calculateResumeScore = (resumeText) => {
  const breakdown = {
    structure: 0, // 15
    skills: 0, // 15
    projects: 0, // 25
    experience: 0, // 15
    impact: 0, // 15
    links: 0, // 10
    achievements: 0, // 5
  };

  const text = resumeText.toLowerCase();

  // =====================
  // Structure (15)
  // =====================

  if (text.includes("education")) {
    breakdown.structure += 4;
  }

  if (text.includes("skills")) {
    breakdown.structure += 4;
  }

  if (text.includes("project")) {
    breakdown.structure += 4;
  }

  if (
    text.includes("linkedin") ||
    text.includes("github") ||
    text.includes("@")
  ) {
    breakdown.structure += 3;
  }

  // =====================
  // Skills (15)
  // =====================

  // =====================
  // Skills (15)
  // =====================

  const skillKeywords = [
    // Languages
    "javascript",
    "typescript",
    "java",
    "python",
    "c++",
    "c",
    "sql",

    // Frontend
    "react",
    "next",
    "redux",
    "html",
    "css",
    "tailwind",

    // Backend
    "node",
    "express",
    "rest api",
    "graphql",
    "springboot",

    // Databases
    "mongodb",
    "mysql",
    "postgresql",
    "redis",

    // DevOps / Cloud
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "ci/cd",

    // Tools
    "git",
    "github",
    "postman",
    "Thunder",

    // Core CS
    "dsa",
    "data structures",
    "algorithms",
    "oop",
    "object oriented programming",
    "Networking",

    // AI
    "machine learning",
    "artificial intelligence",
    "ai",
    "LLM",
    "gemini",
    "openai",
  ];

  const matchedSkills = skillKeywords.filter((skill) =>
    text.includes(skill),
  ).length;

  breakdown.skills = Math.min(Math.round(matchedSkills * 0.6), 15);

  // =====================
  // Projects (25)
  // =====================

  const projectKeywords = [
    "project",
    "developed",
    "implemented",
    "built",
    "designed",
    "created",
    "engineered",
  ];

  const techKeywords = [
    "react",
    "node",
    "express",
    "mongodb",
    "mysql",
    "postgresql",
    "redis",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "graphql",
    "rest api",
    "jwt",
    "oauth",
    "redux",
    "typescript",
    "next",
    "socket",
    "microservice",
    "rabbitmq",
    "kafka",
    "prisma",
    "tailwind",
    "firebase",
    "ai",
    "machine learning",
    "gemini",
    "openai",
  ];

  const actionCount = (
    resumeText.match(
      /developed|implemented|built|designed|created|engineered|optimized|integrated/gi,
    ) || []
  ).length;

  const projectCount = (
    resumeText.match(
      /project|developed|implemented|built|designed|created|engineered/gi,
    ) || []
  ).length;

  const techCount = techKeywords.filter((tech) => text.includes(tech)).length;

  breakdown.projects = Math.min(
    Math.round(projectCount * 1.5 + techCount * 0.8 + actionCount * 1),
    25,
  );

  // =====================
  // Experience (15)
  // =====================

  const experienceKeywords = [
    "software engineer intern",
    "software development intern",
    "web developer intern",
    "backend developer intern",
    "frontend developer intern",
    "full stack developer intern",
    "work experience",
    "professional experience",
  ];

  const matchedExperience = experienceKeywords.filter((keyword) =>
    text.includes(keyword),
  ).length;

  breakdown.experience = Math.min(matchedExperience * 5, 15);

  // =====================
  // Impact Metrics (15)
  // =====================

  const metricMatches =
    resumeText.match(
      /\d+%|\d+\+|\d+\s(users|projects|years|repositories|repos|apis|contests|stars|requests|downloads|ms|seconds|problems|questions)/gi,
    ) || [];

  breakdown.impact = Math.min(metricMatches.length * 3, 15);

  // =====================
  // Links (10)
  // =====================

  if (text.includes("github")) {
    breakdown.links += 5;
  }

  if (text.includes("linkedin")) {
    breakdown.links += 5;
  }

  // =====================
  // Achievements (5)
  // =====================

  const achievementKeywords = [
    "hackathon",
    "techathon",
    "winner",
    "finalist",
    "contest",
    "leetcode",
    "codeforces",
    "rank",
    "certificate",
    "certification",
  ];

  const achievementMatches = achievementKeywords.filter((word) =>
    text.includes(word),
  ).length;

  breakdown.achievements = Math.min(achievementMatches * 2, 5);

  // =====================
  // Final Score
  // =====================

  const score =
    breakdown.structure +
    breakdown.skills +
    breakdown.projects +
    breakdown.experience +
    breakdown.impact +
    breakdown.links +
    breakdown.achievements;

  const insights = generateRuleInsights(breakdown);

  return {
    score,
    grade: getGrade(score),

    breakdown,

    strengths: insights.strengths,

    weaknesses: insights.weaknesses,

    suggestions: insights.suggestions,
  };
};

module.exports = {
  calculateResumeScore,
};
