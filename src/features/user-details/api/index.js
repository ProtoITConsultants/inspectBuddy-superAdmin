import USER_DETAILS_ENDPOINTS from "../../../constants/api/userDetails";
import axiosInstance from "../../../utils/axiosInstance";

export const userDetailsAPIs = {
  // API to fetch Specific User's Profile
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
  //API to update Specific User's Profile
  updateUserProfileDetails: async (profileData) => {
    try {
      const response = await axiosInstance.put(
        USER_DETAILS_ENDPOINTS.UPDATE_USER_PROILE_URL,
        profileData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating User Details", error);
      throw new Error(
        error.response?.data?.message || "Error updating User Details"
      );
    }
  },
};
