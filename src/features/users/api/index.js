import axios from "axios";
import USERS_ENDPOINTS from "../../../constants/api/users";
import axiosInstance from "../../../utils/axiosInstance";
import Cookies from "js-cookie";

export const usersListAPIs = {
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
  generateUsersCSVFile: async () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      throw new Error("Access token is missing");
    }
    try {
      const response = await axios.get(
        "https://api.inspectbuddy.app/api/admin/getUsersExcelSheet",
        {
          headers: {
            Cookies: `accessToken=${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error generating Users CSV File", error);
      throw new Error(
        error.response?.data?.message || "Error generating Users CSV File"
      );
    }
  },
};
