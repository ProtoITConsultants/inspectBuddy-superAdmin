import REPORT_SETTINGS_ENDPOINTS from "../../../constants/api/reportSettings";
import axiosInstance from "./../../../utils/axiosInstance";

export const reportSettingsAPIs = {
  getReportSettings: async ({ planType }) => {
    try {
      const response = await axiosInstance.get(
        REPORT_SETTINGS_ENDPOINTS.FETCH_SETTINGS_URL(planType)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching report settings", error);
      throw new Error(
        error.response?.data?.message || "Error fetching report settings"
      );
    }
  },
  updateReportSettings: async ({ reportWatermark }) => {
    try {
      const response = await axiosInstance.patch(
        REPORT_SETTINGS_ENDPOINTS.UPDATE_SETTINGS_URL,
        {
          reportWatermark: reportWatermark,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating report settings", error);
      throw new Error(
        error.response?.data?.message || "Error updating report settings"
      );
    }
  },
};
