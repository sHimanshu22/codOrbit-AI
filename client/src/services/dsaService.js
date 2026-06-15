import api from "./api";

export const getQuestions = async (sheet) => {
  const response = await api.get(
    `/dsa/questions?sheet=${encodeURIComponent(sheet)}`
  );

  return response.data;
};

export const getProgress = async (sheet) => {
  const response = await api.get(
    `/dsa/progress?sheet=${encodeURIComponent(sheet)}`
  );

  return response.data;
};

export const toggleQuestion = async (questionData) => {
  const response = await api.post(
    "/dsa/toggle",
    questionData
  );

  return response.data;
};