import { checkUserAuthentication, loginUser } from "../../../api/auth";

export const authServices = {
  login: async ({ email, password }) => {
    try {
      const data = await loginUser({
        email: email,
        password: password,
      });
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },
  checkAuthStatus: async () => {
    try {
      const data = await checkUserAuthentication();
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },
};
