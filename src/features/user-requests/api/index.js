import USER_REQUESTS_ENDPOINTS from "../../../constants/api/userRequests";
import axiosInstance from "../../../utils/axiosInstance";

export const userRestoreRequestsAPIs = {
  // Fetch All Users with Requests
  fetchUsersWithRequests: async ({ filtersData }) => {
    try {
      const response = await axiosInstance.get(
        USER_REQUESTS_ENDPOINTS.FETCH_USERS_WITH_REQUESTS_URL({
          search: filtersData.search,
          page: filtersData.page,
        })
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching users with requests", error);
      throw new Error(
        error.response?.data?.message || "Error fetching users with requests"
      );
    }
  },

  // Fetch User Requests based on Type (Inspections, Properties, Templates)
  fetchUserRequests: async ({ userId, type, page }) => {
    try {
      const response = await axiosInstance.get(
        USER_REQUESTS_ENDPOINTS.FETCH_USERS_WITH_REQUESTS_BY_ENTITY_URL({
          userId,
          type,
          page,
        })
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user requests", error);
      throw new Error(
        error.response?.data?.message || "Error fetching user requests"
      );
    }
  },
};
