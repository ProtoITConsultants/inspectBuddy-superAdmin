import axiosInstance from "../../../utils/axiosInstance";
import AUTH_ENDPOINTS from "../../../constants/api/auth";

export const authServices = {
  login: async ({ email, password }) => {
    try {
      const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN_AUTH_URL, {
        email: email,
        password: password,
        deviceType: "web",
      });

      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },
  checkAuthStatus: async () => {
    try {
      const response = await axiosInstance.get(AUTH_ENDPOINTS.CHECK_AUTH_URL);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },
};
