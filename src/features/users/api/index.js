import USERS_ENDPOINTS from "../../../constants/api/users";
import axiosInstance from "../../../utils/axiosInstance";

export const usersListAPIs = {
  getAllUsers: async ({ page, searchQuery, subscriptionPlan }) => {
    try {
      const response = await axiosInstance.get(
        USERS_ENDPOINTS.GET_ALL_USERS_URL({
          page,
          searchQuery,
          subscriptionPlan,
        })
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching all Users", error);
      throw new Error(
        error.response?.data?.message || "Error fetching all Users"
      );
    }
  },
};
