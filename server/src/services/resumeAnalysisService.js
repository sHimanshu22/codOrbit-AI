const { generateAIResponse } = require("./geminiService");

const analyzeResumeWithAI = async (resumeText) => {
  try {
    const prompt = `
You are an expert ATS Resume Reviewer and Software Engineering Recruiter.

Analyze the following resume.

IMPORTANT RULES:

- Return ONLY raw JSON.
- Do NOT wrap JSON inside markdown.
- Do NOT use \`\`\`json.
- Do NOT use \`\`\`.
- Do NOT provide explanations before or after JSON.
- Do NOT include comments.
- Output must be directly parseable by JSON.parse().

Do not heavily penalize usernames that differ from the candidate's name.

Developer usernames and GitHub handles are often different from real names.

Focus scoring primarily on:
- Skills
- Projects
- Experience
- ATS structure
- Education

Required JSON format:

{
  "summary": "",
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "placementReadiness": []
}

strengths:
- List major strengths

weaknesses:
- List missing areas

suggestions:
- Actionable improvements

placementReadiness:
- Suitable roles based on current profile

Resume:

${resumeText}
`;

    const response = await generateAIResponse(prompt);

    return response;
  } catch (error) {
    console.error("Resume Analysis Error:", error.message);

    // Fallback response when Gemini fails
    return JSON.stringify({
      summary:
        "Resume analysis temporarily unavailable. Showing fallback analysis.",

      strengths: [
        "Strong MERN Stack development experience",
        "Good Data Structures and Algorithms foundation",
        "Well-structured full-stack projects",
        "Experience with REST APIs and MongoDB",
        "Good Git and GitHub usage",
      ],

      weaknesses: [
        "No internship experience mentioned",
        "Projects lack quantified impact metrics",
        "Limited open-source contributions",
      ],

      suggestions: [
        "Add measurable project achievements",
        "Include coding contest achievements",
        "Add GitHub contribution statistics",
        "Highlight leadership or teamwork experiences",
        "Include deployment links for major projects",
      ],

      placementReadiness: [
        "Software Development Engineer Intern",
        "Backend Developer Intern",
        "Full Stack Developer Intern",
        "MERN Stack Developer Intern",
      ],
    });
  }
};

module.exports = {
  analyzeResumeWithAI,
};
