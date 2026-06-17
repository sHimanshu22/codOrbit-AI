import api from "./api";

export const getQuestions = async (sheet) => {
  const response = await api.get(
    `/dsa/questions?sheet=${encodeURIComponent(sheet)}`,
  );

  return response.data;
};

export const getProgress = async (sheet) => {
  const response = await api.get(
    `/dsa/progress?sheet=${encodeURIComponent(sheet)}`,
  );

  return response.data;
};

export const toggleQuestion = async (questionData) => {
  const response = await api.post("/dsa/toggle", questionData);

  return response.data;
};

export const getOverview = async () => {
  const response = await api.get("/dsa/overview");

  return response.data;
};

export const getAICoach = async (sheet) => {
  const response = await api.get(`/dsa/ai-coach?sheet=${sheet}`);

  return response.data;
};

export const getSkillAnalysis = async (sheet) => {
  const response = await api.get(`/dsa/skill-analysis?sheet=${sheet}`);

  return response.data;
};
