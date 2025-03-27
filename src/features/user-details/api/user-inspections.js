import USER_DETAILS_ENDPOINTS from "../../../constants/api/userDetails";
import axiosInstance from "../../../utils/axiosInstance";

export const userInspectionsAPIs = {
  // Fetch Inspection Details
  fetchInspectionDetails: async ({ inspectionId }) => {
    try {
      const response = await axiosInstance.get(
        USER_DETAILS_ENDPOINTS.FETCH_INSPECTION_DETAILS_URL({
          inspectionId,
        })
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Inspection Details", error);
      throw new Error(
        error.response?.data?.message || "Error fetching Inspection Details"
      );
    }
  },
};
