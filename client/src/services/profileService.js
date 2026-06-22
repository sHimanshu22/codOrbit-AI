import api from "./api";

export const getProfile = async () => {
  const response = await api.get("/users/profile");

  return response.data;
};

export const getPublicProfile = async (username) => {
  const response = await api.get(`/users/u/${username}`);

  return response.data;
};

export const getProfileByUsername = async (username) => {
  const response = await api.get(`/users/profile/${username}`);

  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put("/users/profile", profileData);

  return response.data;
};

export const uploadProfileImage = async (imageFile) => {
  const formData = new FormData();

  formData.append("image", imageFile);

  const response = await api.post("/users/profile-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
