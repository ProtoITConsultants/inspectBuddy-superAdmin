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
  // Fetch Specific Property Data
  fetchPropertyDetails: async ({ propertyId }) => {
    try {
      const response = await axiosInstance.get(
        USER_DETAILS_ENDPOINTS.FETCH_PROPERTY_DETAILS_URL({
          propertyId,
        })
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Property Details", error);
      throw new Error(
        error.response?.data?.message || "Error fetching Property Details"
      );
    }
  },
  // Update Specific Property Data
  updatePropertyDetails: async (params) => {
    try {
      const response = await axiosInstance.put(
        USER_DETAILS_ENDPOINTS.UPDATE_PROPERTY_DETAILS_URL,
        params,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating Property Details", error);
      throw new Error(
        error.response?.data?.message || "Error updating Property Details"
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
  // Fetch Specific Template Data
  fetchTemplateDetails: async ({ templateId }) => {
    try {
      const response = await axiosInstance.get(
        USER_DETAILS_ENDPOINTS.FETCH_TEMPLATE_DETAILS_URL({
          templateId,
        })
      );
      return response.data.rooms || [];
    } catch (error) {
      console.error("Error fetching Template Details", error);
      throw new Error(
        error.response?.data?.message || "Error fetching Template Details"
      );
    }
  },
  // Add new Room in a Template
  addNewRoomInTemplate: async ({ templateId, roomName }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.ADD_NEW_ROOM_IN_TEMPLATE_URL,
        {
          templateId,
          roomName,
        }
      );
      return response.data.newRoom;
    } catch (error) {
      console.error("Error adding new Room in Template", error);
      throw new Error(
        error.response?.data?.message || "Error adding new Room in Template"
      );
    }
  },
  // Delete Room from a Template
  deleteRoomFromTemplate: async ({ templateId, roomIdArray }) => {
    try {
      const response = await axiosInstance.patch(
        USER_DETAILS_ENDPOINTS.DELETE_ROOM_FROM_TEMPLATE_URL,
        {
          templateId: templateId,
          roomIdArray: roomIdArray,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting Room from Template", error);
      throw new Error(
        error.response?.data?.message || "Error deleting Room from Template"
      );
    }
  },
  // Fetch Room's Details in a Template
  fetchTemplateRoomDetails: async ({ templateId, roomId, userId }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.FETCH_TEMPLATE_ROOM_DETAILS_URL({
          userId,
        }),
        {
          templateId,
          roomId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching Room's Details in Template", error);
      throw new Error(
        error.response?.data?.message ||
          "Error fetching Room's Details in Template"
      );
    }
  },
  //Rearrange Room Elements in a Template
  rearrangeRoomElementsInTemplate: async ({
    templateId,
    roomId,
    elementIds,
  }) => {
    try {
      const response = await axiosInstance.patch(
        USER_DETAILS_ENDPOINTS.REARRANGE_ROOM_ELEMENTS_IN_TEMPLATE_URL,
        {
          templateId,
          roomId,
          elementIds,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error rearranging Room Elements in Template", error);
      throw new Error(
        error.response?.data?.message ||
          "Error rearranging Room Elements in Template"
      );
    }
  },
  // Add New Room in a Template
  addNewRoomElementInTemplate: async ({ templateId, roomId, elementName }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.ADD_NEW_ROOM_ELEMENT_IN_TEMPLATE_URL,
        {
          templateId,
          roomId,
          elementName,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding new Room Element in Template", error);
      throw new Error(
        error.response?.data?.message ||
          "Error adding new Room Element in Template"
      );
    }
  },

  // Update Rooms Order in a Template
  updateRoomOrderInTemplate: async ({ templateId, roomIds }) => {
    try {
      const response = await axiosInstance.patch(
        USER_DETAILS_ENDPOINTS.UPDATE_ROOM_ORDER_IN_TEMPLATE_URL,
        {
          templateId,
          roomIds,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating Room Order in Template", error);
      throw new Error(
        error.response?.data?.message || "Error updating Room Order in Template"
      );
    }
  },

  // Save Template as Draft
  saveTemplateAsDraft: async ({ templateId }) => {
    try {
      const response = await axiosInstance.patch(
        USER_DETAILS_ENDPOINTS.SAVE_TEMPLATE_AS_DRAFT_URL,
        {
          templateId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving Template as Draft", error);
      throw new Error(
        error.response?.data?.message || "Error saving Template as Draft"
      );
    }
  },
  // Save Inspection Template as Completed
  saveInspectionTemplateAsCompleted: async ({ templateId }) => {
    try {
      const response = await axiosInstance.patch(
        USER_DETAILS_ENDPOINTS.SAVE_INSPECTION_TEMPLATE_AS_COMPLETED_URL,
        {
          templateId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving Inspection Template as Completed", error);
      throw new Error(
        error.response?.data?.message ||
          "Error saving Inspection Template as Completed"
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
