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
      console.log(response.data);
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
};
