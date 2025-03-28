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
  // Add New Room in a Inspection
  addNewRoomInInspection: async ({ inspectionId, roomName }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.ADD_NEW_ROOM_IN_INSPECTION_URL,
        {
          inspectionId,
          roomName,
        }
      );
      return response.data.newRoom;
    } catch (error) {
      console.error("Error adding new Room in Inspection", error);
      throw new Error(
        error.response?.data?.message || "Error adding new Room in Inspection"
      );
    }
  },
  // Delete Room from a Inspection
  deleteRoomFromInspection: async ({ inspectionId, roomIdArray }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.DELETE_ROOM_FROM_INSPECTION_URL,
        {
          inspectionId: inspectionId,
          roomIdArray: roomIdArray,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting Room from Inspection", error);
      throw new Error(
        error.response?.data?.message || "Error deleting Room from Inspection"
      );
    }
  },
  // Rearrange Rooms in a Inspection
  rearrangeRoomsInInspection: async ({ inspectionId, roomIds }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.REARRANGE_ROOMS_IN_INSPECTION_URL,
        {
          inspectionId,
          roomIds,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error rearranging Rooms in Inspection", error);
      throw new Error(
        error.response?.data?.message || "Error rearranging Rooms in Inspection"
      );
    }
  },

  // Fetch Specific Room's Details
  fetchSpecificRoomDetails: async ({ inspectionId, roomId, userId }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.FETCH_INSPECTION_ROOM_DETAILS_URL({
          userId,
        }),
        {
          inspectionId,
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
  // Rearrange Room Elements in a Inspection
  rearrangeRoomElements: async ({ inspectionId, roomId, elementIds }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.REARRANGE_ROOM_ELEMENTS_IN_INSPECTION_URL,
        {
          inspectionId,
          roomId,
          elementIds,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error rearranging Room Elements in Inspection", error);
      throw new Error(
        error.response?.data?.message ||
          "Error rearranging Room Elements in Inspection"
      );
    }
  },
  // Add Element to a Room in a Inspection
  createNewRoomElement: async ({ inspectionId, roomId, elementName }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.ADD_ELEMENT_TO_ROOM_IN_INSPECTION_URL,
        {
          inspectionId,
          roomId,
          elementName,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding Element to Room in Inspection", error);
      throw new Error(
        error.response?.data?.message ||
          "Error adding Element to Room in Inspection"
      );
    }
  },
  // Delete Room Element from a Inspection
  deleteRoomElementFromInspection: async ({
    inspectionId,
    roomId,
    elementIdArray,
  }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.DELETE_ROOM_ELEMENT_FROM_INSPECTION_URL,
        {
          inspectionId,
          roomId,
          elementIdArray,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting Room Element from Inspection", error);
      throw new Error(
        error.response?.data?.message ||
          "Error deleting Room Element from Inspection"
      );
    }
  },
  // Add Question to a Room Element in a Inspection
  addQuestionToRoomElementInInspection: async ({
    inspectionId,
    roomId,
    elementId,
    questions,
    userId,
  }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.ADD_QUESTION_TO_ROOM_ELEMENT_IN_INSPECTION_URL({
          userId,
        }),
        {
          inspectionId,
          roomId,
          elementId,
          questions,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error adding Question to Room Element in Inspection",
        error
      );
      throw new Error(
        error.response?.data?.message ||
          "Error adding Question to Room Element in Inspection"
      );
    }
  },
  // Delete Question from a Room Element in a Inspection
  deleteQuestionsFromElement: async ({
    inspectionId,
    roomId,
    elementId,
    checklistIdArray,
  }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.DELETE_QUESTIONS_FROM_INSPECTION_ELEMENT_URL,
        {
          inspectionId,
          roomId,
          elementId,
          checklistIdArray,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error deleting Selected Questions from Room Element in Inspection",
        error
      );
      throw new Error(
        error.response?.data?.message ||
          "Error deleting Selected Questions from Room Element in Inspection"
      );
    }
  },
};
