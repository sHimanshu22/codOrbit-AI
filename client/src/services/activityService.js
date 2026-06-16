import api from "./api";

export const getStreaks =
  async () => {

    const response =
      await api.get(
        "/activity/streaks"
      );

    return response.data;
};

export const getHeatmap =
  async () => {

    const response =
      await api.get(
        "/activity/heatmap"
      );

    return response.data;
};

export const getInsights =
  async () => {

    const response =
      await api.get(
        "/activity/insights"
      );

    return response.data;
};