import AUTH_ENDPOINTS from "../../constants/api/auth";
import axiosInstance from "./axiosInstance";

// login user
export const loginUser = async ({ email, password }) => {
  const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN_AUTH_URL, {
    email: email,
    password: password,
    deviceType: "web",
  });
  return response.data;
};

// Check user authentication status
export const checkUserAuthentication = async () => {
  const response = await axiosInstance.get(AUTH_ENDPOINTS.CHECK_AUTH_URL);
  return response.data;
};
