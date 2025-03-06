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
  // API to fetch user Added Property Categories
  fetchUserAddedPropertyCategories: async ({ userId }) => {
    try {
      const response = await axiosInstance.get(
        USER_DETAILS_ENDPOINTS.FETCH_USER_ADDED_PROPERTY_CATEGORIES_URL({
          userId,
        })
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching User Added Property Categories", error);
      throw new Error(
        error.response?.data?.message ||
          "Error fetching User Added Property Categories"
      );
    }
  },

  // API to fetch all sub users of a user
  fetchSubUsers: async ({ userId, filtersData }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.FETCH_SUB_USER_FOR_USER_URL({
          userId,
        }),
        {
          page: filtersData.page,
          search: filtersData.search,
          keyword: filtersData.keyword,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching sub users", error);
      throw new Error(
        error.response?.data?.message || "Error fetching sub users"
      );
    }
  },
  // Fetch Sub users details
  fetchSubUserDetails: async ({ subUserId }) => {
    try {
      const response = await axiosInstance.get(
        USER_DETAILS_ENDPOINTS.FETCH_SUB_USER_DETAILS_URL({
          subUserId,
        })
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching sub user details", error);
      throw new Error(
        error.response?.data?.message || "Error fetching sub user details"
      );
    }
  },
  // Update Sub users details
  updateSubUserDetails: async (params) => {
    try {
      const response = await axiosInstance.patch(
        USER_DETAILS_ENDPOINTS.UPDATE_SUB_USER_DETAILS_URL({
          userId: params.userId,
        }),
        {
          subUserId: params.subUserId,
          fullname: params.userName,
          email: params.userEmail,
          address: params.userAddress,
          phoneNumber: params.userPhoneNumber,
          canCreateInspectionQuestions: params.allowCreateNewQuestions,
          canInspectFromScratch: params.allowStartFromScratch,
          assignedCategories: params.assignedCategories,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating sub user details", error);
      throw new Error(
        error.response?.data?.message || "Error updating sub user details"
      );
    }
  },

  // Fetch Properties added by a user
  fetchUserAddedProperties: async ({ userId, filtersData }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.FETCH_USER_ADDED_PROPERTIES_URL({
          userId,
        }),
        {
          category: filtersData.propertyCategory,
          page: filtersData.page,
          search: filtersData.search,
          startDate: filtersData.startdate,
          endDate: filtersData.enddate,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching User Added Properties", error);
      throw new Error(
        error.response?.data?.message || "Error fetching User Added Properties"
      );
    }
  },

  // Fetch Templates added by a user
  fetchUserAddedTemplates: async ({ userId, filtersData }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.FETCH_USER_ADDED_TEMPLATES_URL({
          userId,
        }),
        {
          status: filtersData.status,
          page: filtersData.page,
          search: filtersData.search,
          startdate: filtersData.startdate,
          enddate: filtersData.enddate,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching User Added Templates", error);
      throw new Error(
        error.response?.data?.message || "Error fetching User Added Templates"
      );
    }
  },

  // Fetch Inspections added by a user
  fetchUserAddedInspections: async ({ userId, filtersData }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.FETCH_USER_ADDED_INSPECTIONS_URL({
          userId,
        }),
        {
          status: filtersData.status,
          page: filtersData.page,
          search: filtersData.search,
          startdate: filtersData.startdate,
          enddate: filtersData.enddate,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching User Added Inspections", error);
      throw new Error(
        error.response?.data?.message || "Error fetching User Added Inspections"
      );
    }
  },

  // Fetch Inspections Stats
  fetchUserInspectionStats: async ({ userId }) => {
    try {
      const response = await axiosInstance.get(
        USER_DETAILS_ENDPOINTS.FETCH_USER_INSPECTION_STATS_URL({
          userId,
        })
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching User Inspection Stats", error);
      throw new Error(
        error.response?.data?.message || "Error fetching User Inspection Stats"
      );
    }
  },
};
