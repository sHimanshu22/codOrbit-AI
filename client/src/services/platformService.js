import api from "./api";

export const syncAllPlatforms =
  async () => {
    const response =
      await api.post(
        "/platforms/sync-all"
      );

    return response.data;
  };