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

Formatting Rules:

- Use ONLY **bold** to highlight important titles or keywords.
- Do NOT use headings.
- Do NOT use markdown lists.
- Do NOT use code blocks.
- Do NOT use backticks.
- Do NOT use tables.

Response Quality Rules:

- Be concise and professional.
- Do not repeat the same point.
- Every suggestion must be specific and actionable.
- Base every strength and weakness only on the provided resume.
- Never invent achievements, metrics, experience, or technologies.
- If information is missing, explicitly state that it is not present instead of assuming.
- Avoid generic advice that applies to every resume.
- Prioritize the most impactful improvements first.

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
- List only strengths that are clearly supported by the resume.
- Do not exaggerate or infer missing experience.

weaknesses:
- Mention only genuine weaknesses or missing information.
- Do not penalize the candidate for technologies or experience not required for entry-level software roles unless they are clearly expected.

suggestions:
- Provide 5–8 highly actionable improvements.
- Start each suggestion with a short **bold** title followed by a clear explanation.
- Focus on improvements that would increase interview chances.

placementReadiness:
- Suitable roles based on current profile


ATS Evaluation Rules:

When suggesting improvements, prioritize:

- Missing quantifiable achievements
- ATS keyword optimization
- Resume structure
- Section organization
- Technical skills
- Project quality
- Professional experience
- Education
- Links and portfolio

Critical Rule:

If the resume does not contain enough evidence for a claim, do NOT guess or assume.
State that the information is missing instead.

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
