import api from "./api";

// REGISTER
export const registerUser = (data) => {
  return api.post("/users/register", data);
};

// LOGIN
export const loginUser = (data) => {
  return api.post("/api/auth/login", data);
};
