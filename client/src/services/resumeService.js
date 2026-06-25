import api from "./api";

export const analyzeResume = async (
  formData
) => {
  const response = await api.post(
    "/resume/analyze",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};