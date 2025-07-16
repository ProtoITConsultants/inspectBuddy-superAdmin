import APP_INFO_ENDPOINTS from "../../../constants/api/appinformation";
import axiosInstance from "./../../../utils/axiosInstance";

export const appInfoAPIs = {
  // Fetch app Information
  fetchAppInfo: async () => {
    try {
      const response = await axiosInstance.get(
        APP_INFO_ENDPOINTS.FETCH_APP_INFO_URL
      );
      return response.data;
    } catch (err) {
      console.error("Failed to checkout:", err);
      throw new Error(
        err.response?.data?.message || "Could not fetch app information"
      );
    }
  },

  // Update App Information
  updateAppInfo: async ({
    appDetails,
    webVersion,
    androidVersion,
    iosVersion,
    releaseNotes,
    email,
    website,
  }) => {
    try {
      const response = await axiosInstance.put(
        APP_INFO_ENDPOINTS.UPDATE_APP_INFO_URL,
        {
          appDetails,
          webVersion,
          androidVersion,
          iosVersion,
          releaseNotes,
          email,
          website,
        }
      );
      return response.data;
    } catch (err) {
      console.error("Failed to checkout:", err);
      throw new Error(
        err.response?.data?.message || "Could not update app information"
      );
    }
  },
};
