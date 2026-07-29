import api from "./api";

export const login = async (email, password) => {
  const { data } = await api.post("/users/login", { email, password });
  return data;
};

export const register = async (name, email, password) => {
  const { data } = await api.post("/users/register", { name, email, password });
  return data;
};

export const getProfile = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

export const getUsers = async () => {
  const { data } = await api.get("/users");
  return data;
};
