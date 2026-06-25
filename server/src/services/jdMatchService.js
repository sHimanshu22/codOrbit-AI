const calculateJDMatch = (resumeText, jdText) => {
  if (!jdText) {
    return {
      enabled: false,
    };
  }

  const keywords = [
    // Languages
    "javascript",
    "typescript",
    "java",
    "python",
    "c++",
    "c",
    "c#",
    "go",
    "golang",
    "rust",
    "php",
    "ruby",
    "kotlin",
    "swift",

    // Frontend
    "react",
    "next.js",
    "nextjs",
    "angular",
    "vue",
    "redux",
    "tailwind",
    "bootstrap",
    "html",
    "css",
    "sass",

    // Backend
    "node",
    "node.js",
    "express",
    "nestjs",
    "spring boot",
    "django",
    "flask",
    "fastapi",
    "laravel",

    // APIs
    "rest api",
    "restful api",
    "graphql",
    "websocket",
    "socket.io",

    // Databases
    "mongodb",
    "mysql",
    "postgresql",
    "sqlite",
    "oracle",
    "redis",
    "firebase",
    "supabase",

    // Cloud
    "aws",
    "azure",
    "gcp",
    "google cloud",
    "cloud computing",
    "lambda",
    "ec2",
    "s3",

    // DevOps
    "docker",
    "kubernetes",
    "jenkins",
    "github actions",
    "gitlab ci",
    "ci/cd",
    "terraform",
    "nginx",

    // Version Control
    "git",
    "github",
    "gitlab",
    "bitbucket",

    // Testing
    "jest",
    "mocha",
    "chai",
    "cypress",
    "selenium",
    "playwright",
    "unit testing",

    // AI / ML
    "machine learning",
    "deep learning",
    "artificial intelligence",
    "ai",
    "openai",
    "gemini",
    "llm",
    "rag",
    "langchain",
    "hugging face",
    "tensorflow",
    "pytorch",

    // Data
    "data science",
    "pandas",
    "numpy",
    "matplotlib",
    "power bi",
    "tableau",

    // Mobile
    "android",
    "ios",
    "react native",
    "flutter",

    // CS Fundamentals
    "data structures",
    "algorithms",
    "dsa",
    "oop",
    "object oriented programming",
    "operating systems",
    "computer networks",
    "dbms",
    "system design",

    // Security
    "jwt",
    "oauth",
    "authentication",
    "authorization",
    "cyber security",

    // Competitive Programming
    "leetcode",
    "codeforces",
    "codechef",
    "hackerrank",
  ];

  const resume = resumeText.toLowerCase();

  const jd = jdText.toLowerCase();

  const jdKeywords = keywords.filter((keyword) => jd.includes(keyword));

  const matchedSkills = jdKeywords.filter((keyword) =>
    resume.includes(keyword),
  );

  const missingSkills = jdKeywords.filter(
    (keyword) => !resume.includes(keyword),
  );

  const matchPercentage =
    jdKeywords.length === 0
      ? 0
      : Math.round((matchedSkills.length / jdKeywords.length) * 100);

  return {
    enabled: true,

    matchPercentage,

    matchedSkills,

    missingSkills,
  };
};

module.exports = {
  calculateJDMatch,
};
