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

export const toggleBookmark = async (questionId) => {
  const response = await api.patch("/dsa/bookmark", {
    questionId,
  });

  return response.data;
};

export const getBookmarks = async () => {
  const response = await api.get("/dsa/bookmarks");

  return response.data;
};

export const updateNotes = async (questionId, notes) => {
  const response = await api.patch("/dsa/notes", {
    questionId,
    notes,
  });

  return response.data;
};

export const getSheets = async () => {
  const response = await api.get("/dsa/sheets");

  return response.data;
};
