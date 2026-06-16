import api from "./api";

export const getUpcomingContests =
  async () => {

    const response =
      await api.get(
        "/contests/upcoming"
      );

    return response.data;
  };

export const getContestAnalytics =
  async () => {

    const response =
      await api.get(
        "/contests/analytics"
      );

    return response.data;
  };

export const getContestHistory =
  async () => {

    const response =
      await api.get(
        "/contests/history"
      );

    return response.data;
  };

export const getRatingHistory =
  async () => {

    const response =
      await api.get(
        "/contests/rating-history"
      );

    return response.data;
  };

export const getPerformance =
  async () => {

    const response =
      await api.get(
        "/contests/performance"
      );

    return response.data;
  };