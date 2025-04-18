import USERS_ENDPOINTS from "../../../constants/api/users";
import axiosInstance from "../../../utils/axiosInstance";

export const usersListAPIs = {
  // Get All Users
  getAllUsers: async ({ page, searchQuery, subscriptionPlan }) => {
    try {
      const response = await axiosInstance.get(
        USERS_ENDPOINTS.GET_ALL_USERS_URL({
          page,
          searchQuery,
          subscriptionPlan,
        })
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching all Users", error);
      throw new Error(
        error.response?.data?.message || "Error fetching all Users"
      );
    }
  },

  // Add New User
  createNewUser: async (userDetails) => {
    // Extract the role
    const userRole =
      userDetails.userSubscriptionPlan === "Free Tier"
        ? "FREETIER"
        : userDetails.userSubscriptionPlan === "Standard Tier"
        ? "STANDARDTIER"
        : userDetails.userSubscriptionPlan === "Top Tier"
        ? "TOPTIER"
        : "";

    const API_DATA = new FormData();
    API_DATA.append("fullname", userDetails.fullname);
    API_DATA.append("email", userDetails.email);
    API_DATA.append("role", userRole);
    API_DATA.append("deviceType", "web");
    if (userDetails.personalImage !== "") {
      API_DATA.append("image", userDetails.personalImage);
    }

    // Print Form Data
    // Print the FormData entries
    for (let [key, value] of API_DATA.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axiosInstance.post(
        USERS_ENDPOINTS.CREATE_NEW_USER_URL,
        API_DATA,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating new User", error);
      throw new Error(
        error.response?.data?.message || "Error creating new User"
      );
    }
  },

  // Delete a User
  deleteUser: async ({ userId }) => {
    try {
      const response = await axiosInstance.delete(
        USERS_ENDPOINTS.DELETE__SPECIFIC_USER_URL({ userId })
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting User", error);
      throw new Error(error.response?.data?.message || "Error deleting User");
    }
  },

  // Generate Users CSV File
  generateUsersCSVFile: async () => {
    try {
      const response = await axiosInstance.get(
        USERS_ENDPOINTS.GENERATE_USERS_CSV_FILE_URL,
        {
          responseType: "blob",
        }
      );

      // Get the Blob from the response
      const blob = response.data;

      // Create a URL for the Blob object
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = url;
      link.download = "users.xlsx";

      // Programmatically trigger a click event to download the file
      link.click();

      // Clean up by revoking the object URL and removing the link element
      link.remove();
      URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error("Error generating Users CSV File", error);
      throw new Error(
        error.response?.data?.message || "Error generating Users CSV File"
      );
    }
  },
};
