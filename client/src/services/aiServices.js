import api from "./api";

export const getDeveloperScore =
  async () => {

    const response =
      await api.get(
        "/ai/developer-score"
      );

    return response.data;
};