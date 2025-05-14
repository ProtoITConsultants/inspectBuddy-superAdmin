import USER_DETAILS_ENDPOINTS from "../../../constants/api/userDetails";
import axiosInstance from "../../../utils/axiosInstance";

export const userInspectionsAPIs = {
  // Create New Inspection
  createNewInspection: async ({ userId, inspectionData }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.CREATE_NEW_USER_INSPECTION_URL({ userId }),
        inspectionData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating new Inspection", error);
      throw new Error(
        error.response?.data?.message || "Error creating new Inspection"
      );
    }
  },
  // Delete User Inspection
  deleteUserInspection: async ({ userId, inspectionId }) => {
    try {
      const response = await axiosInstance.delete(
        USER_DETAILS_ENDPOINTS.DELETE_USER_INSPECTION_URL({
          userId,
          inspectionId,
        })
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting User Inspection", error);
      throw new Error(
        error.response?.data?.message || "Error deleting User Inspection"
      );
    }
  },

  // Fetch User Properties to link with new Inspection
  fetchUserPropertiesForInspection: async ({ userId }) => {
    try {
      const response = await axiosInstance.get(
        USER_DETAILS_ENDPOINTS.FETCH_USER_PROPERTIES_FOR_INSPECTION_URL({
          userId,
        })
      );
      return response.data.properties;
    } catch (error) {
      console.error("Error fetching User Properties", error);
      throw new Error(
        error.response?.data?.message || "Error fetching User Properties"
      );
    }
  },
  // Fetch User Templates to link with new Inspection
  fetchUserTemplatesForInspection: async ({ userId }) => {
    try {
      const response = await axiosInstance.get(
        USER_DETAILS_ENDPOINTS.FETCH_USER_TEMPLATES_FOR_INSPECTION_URL({
          userId,
        })
      );
      return response.data.templates;
    } catch (error) {
      console.error("Error fetching User Templates", error);
      throw new Error(
        error.response?.data?.message || "Error fetching User Templates"
      );
    }
  },

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

  // Upload Room Image From Inspection
  uploadSpecificRoomImageInInspection: async ({
    inspectionId,
    roomId,
    image,
  }) => {
    // Create a FormData object
    const formData = new FormData();

    // Append the fields required by your API
    formData.append("inspectionId", inspectionId);
    formData.append("roomId", roomId);
    formData.append("image", image);

    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.UPLOAD_SPECIFIC_ROOM_IMAGE_IN_INSPECTION_URL,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading Room Image in Inspection", error);
      throw new Error(
        error.response?.data?.message ||
          "Error uploading Room Image in Inspection"
      );
    }
  },
  // Delete Room Image From Inspection
  deleteSpecificRoomImageInInspection: async ({
    inspectionId,
    roomId,
    imageId,
  }) => {
    try {
      const response = await axiosInstance.patch(
        USER_DETAILS_ENDPOINTS.DELETE_SPECIFIC_ROOM_IMAGE_IN_INSPECTION_URL,
        {
          inspectionId,
          roomId,
          imageId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading Room Image in Inspection", error);
      throw new Error(
        error.response?.data?.message ||
          "Error uploading Room Image in Inspection"
      );
    }
  },

  // Update Specifc Image's Caption of a specific room
  updateRoomImageCaptionInInspection: async ({
    inspectionId,
    roomId,
    imageId,
    caption,
  }) => {
    try {
      const response = await axiosInstance.patch(
        USER_DETAILS_ENDPOINTS.UPDATE_ROOM_IMAGE_CAPTION_IN_INSPECTION_URL,
        {
          inspectionId,
          roomId,
          imageId,
          caption,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading Room Image in Inspection", error);
      throw new Error(
        error.response?.data?.message ||
          "Error uploading Room Image in Inspection"
      );
    }
  },

  // Save Inspection Room as Draft
  saveInspectionRoomAsDraft: async ({
    inspectionId,
    roomId,
    roomName,
    roomNote,
    roomImage,
    roomElements,
  }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.SAVE_INSPECTION_ROOM_AS_DRAFT_URL,
        {
          inspectionId,
          roomData: {
            _id: roomId,
            elements: roomElements,
            name: roomName,
            note: roomNote,
            image: roomImage,
          },
          shouldComplete: false,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving Inspection Room as Draft", error);
      throw new Error(
        error.response?.data?.message || "Error saving Inspection Room as Draft"
      );
    }
  },

  // Save Inspection Room as Complete
  saveInspectionRoomAsComplete: async ({
    inspectionId,
    roomId,
    roomName,
    roomNote,
    roomImage,
    roomElements,
  }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.SAVE_INSPECTION_ROOM_AS_COMPLETE_URL,
        {
          inspectionId,
          roomData: {
            _id: roomId,
            elements: roomElements,
            name: roomName,
            note: roomNote,
            image: roomImage,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error saving Inspection Room as Complete", error);
      throw new Error(
        error.response?.data?.message ||
          "Error saving Inspection Room as Complete"
      );
    }
  },

  // Generate Inspection Report PDF
  generateInspectionPDF: async ({ inspectionId, userId }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.GENERATE_INSPECTION_PDF_URL({
          userId,
        }),
        {
          inspectionId,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error generating Inspection PDF", error);
      throw new Error(
        error.response?.data?.message || "Error generating Inspection PDF"
      );
    }
  },
};
