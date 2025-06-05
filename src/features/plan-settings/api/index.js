import axiosInstance from "./../../../utils/axiosInstance";
import PLAN_SETTINGS_ENDPOINTS from "./../../../constants/api/planSettings";

export const planSettingsAPIs = {
  // Plan Settings APIs

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

  // ---------------------------------
  // APIs used for Update User Profile
  // ---------------------------------

  // Get User Plan Entity Limits
  getUserPlanEntityLimits: async ({ userId, planName }) => {
    try {
      const response = await axiosInstance.get(
        PLAN_SETTINGS_ENDPOINTS.GET_USER_PLAN_ENTITY_LIMITS_URL({
          userId,
          planName,
        })
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user plan entity limits", error);
      throw new Error(
        error.response?.data?.message ||
          "Error fetching user plan entity limits"
      );
    }
  },

  // Get Subscription Plans
  getSubscriptionPlans: async () => {
    try {
      const response = await axiosInstance.get(
        PLAN_SETTINGS_ENDPOINTS.GET_SUBSCRIPTION_PLANS_URL
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching subscription plans", error);
      throw new Error(
        error?.response?.data?.message || "Error fetching subscription plans"
      );
    }
  },

  // Subscribe User
  subscribeUser: async ({ pricingTierId, subscriptionType, userId }) => {
    try {
      const response = await axiosInstance.post(
        PLAN_SETTINGS_ENDPOINTS.SUBSCRIBE_USER_URL({ userId }),
        {
          pricingTierId: pricingTierId,
          subscriptionType: subscriptionType,
        }
      );

      return response.data;
    } catch (err) {
      console.error("Failed to checkout:", err);
      // Check if response is available and log more information
      throw new Error(
        err.response?.data?.message || "An unexpected error occurred"
      );
    }
  },

  // Cancel Subscription
  cancelSubscription: async ({ userId }) => {
    try {
      const response = await axiosInstance.post(
        PLAN_SETTINGS_ENDPOINTS.CANCEL_SUBSCRIPTION_URL({ userId }),
        {
          cancelImmediately: true,
        }
      );

      return response.data;
    } catch (err) {
      console.error("Failed to cancel Subscription:", err);
      // Check if response is available and log more information
      throw new Error(
        err.response?.data?.message || "An unexpected error occurred"
      );
    }
  },

  // Upgrade Subscription Plan
  upgradeSubscription: async ({ pricingTierId, subscriptionType, userId }) => {
    try {
      const response = await axiosInstance.post(
        PLAN_SETTINGS_ENDPOINTS.CHANGE_SUBSCRIPTION_URL({ userId }),
        { pricingTierId, subscriptionType }
      );

      return response.data;
    } catch (err) {
      console.error("Failed to cancel Subscription:", err);
      // Check if response is available and log more information
      throw new Error(
        err.response?.data?.message || "An unexpected error occurred"
      );
    }
  },
};
