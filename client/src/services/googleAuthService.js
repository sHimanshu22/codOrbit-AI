import api from "./api";

export const googleLogin = async (credential) => {
  const response = await api.post("/google/login", {
    credential,
  });

  return response.data;
};