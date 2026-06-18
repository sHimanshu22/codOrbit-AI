const { GoogleGenAI } = require("@google/genai");

console.log(
  "Gemini Key:",
  process.env.GEMINI_API_KEY
);

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAIResponse = async (prompt) => {
  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  return response.text;
};

module.exports = {
  generateAIResponse,
};