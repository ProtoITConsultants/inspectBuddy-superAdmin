import axiosInstance from "./../../../utils/axiosInstance";
import PLAN_SETTINGS_ENDPOINTS from "./../../../constants/api/planSettings";

export const planSettingsAPIs = {
  getPlanSettings: async ({ planType }) => {
    try {
      const response = await axiosInstance.get(
        PLAN_SETTINGS_ENDPOINTS.FETCH_SETTINGS_URL(planType)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching report settings", error);
      throw new Error(
        error.response?.data?.message || "Error fetching report settings"
      );
    }
  },
  updatePlanSettings: async ({ planType, planData }) => {
    try {
      const response = await axiosInstance.patch(
        PLAN_SETTINGS_ENDPOINTS.UPDATE_SETTINGS_URL,
        {
          planType: planType,
          planData: planData,
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
