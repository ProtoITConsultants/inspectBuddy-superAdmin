import USER_DETAILS_ENDPOINTS from "../../../constants/api/userDetails";
import axiosInstance from "../../../utils/axiosInstance";

export const userTemplatesAPIs = {
  // Create New Question
  createNewQuestion: async ({
    templateId,
    roomId,
    elementId,
    questions,
    userId,
  }) => {
    try {
      const response = await axiosInstance.post(
        USER_DETAILS_ENDPOINTS.CREATE_NEW_QUESTION_IN_ELEMENT_URL({
          userId,
        }),
        {
          templateId,
          roomId,
          elementId,
          questions,
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error adding Selected Questions to Room Element in Template",
        error
      );
      throw new Error(
        error.response?.data?.message ||
          "Error adding Selected Questions to Room Element in Template"
      );
    }
  },
};
