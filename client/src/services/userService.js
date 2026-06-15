import api from "./api";

export const updateActiveSheets =
  async (activeSheets) => {

    const response =
      await api.put(
        "/users/active-sheets",
        {
          activeSheets,
        }
      );

    return response.data;
};

export const getProfile =
  async () => {

    const response =
      await api.get(
        "/users/profile"
      );

    return response.data;
};