import USER_DETAILS_ENDPOINTS from "../../../constants/api/userDetails";
import axiosInstance from "../../../utils/axiosInstance";

export const userDetailsAPIs = {
  fetchUserProfileDetails: async ({ userId }) => {
    try {
      const response = await axiosInstance.get(
        USER_DETAILS_ENDPOINTS.GET_USER_PROILE_URL({
          userId,
        })
      );
      return response.data.userDetails;
    } catch (error) {
      console.error("Error fetching User Details", error);
      throw new Error(
        error.response?.data?.message || "Error fetching User Details"
      );
    }
  },
};
