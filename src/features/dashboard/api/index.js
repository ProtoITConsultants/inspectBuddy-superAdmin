import DASHBOARD_ENDPOINTS from "../../../constants/api/dashboard";
import axiosInstance from "../../../utils/axiosInstance";
import totalUsersIcon from "../../../assets/icons/totalUsers.svg";
import activeUsersIcon from "../../../assets/icons/activeUsers.svg";
import monthlySellIcon from "../../../assets/icons/monthlySell.svg";
import totalSellIcon from "../../../assets/icons/totalSell.svg";

export const dashboardServices = {
  getInspectionAndPropertiesAnalytics: async () => {
    try {
      const response = await axiosInstance.get(
        DASHBOARD_ENDPOINTS.INSPECTION_AND_PROPERTIES_ANALYTICS
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching stats", error);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },
  getGraphicalAnalytics: async () => {
    try {
      const response = await axiosInstance.get(
        DASHBOARD_ENDPOINTS.GRAPHICAL_ANALYTICS
      );

      return [
        {
          label: "Total Users",
          statCount: response.data.totalUserCount || 0,
          icon: totalUsersIcon,
          statPercentage: response.data.userPercentageChange || 0,
          chartData: response.data.monthlyUserCounts || [
            { label: "Jan", count: -25 },
            { label: "Feb", count: -10 },
            { label: "Mar", count: 5 },
            { label: "Apr", count: 15 },
            { label: "May", count: 30 },
            { label: "Jun", count: 15 },
            { label: "Jul", count: 30 },
            { label: "Aug", count: 40 },
            { label: "Sep", count: 15 },
            { label: "Oct", count: 20 },
            { label: "Nov", count: 0 },
            { label: "Dec", count: -10 },
          ],
          chartColor: "#0A82FD",
        },
        {
          label: "Current Month Sales",
          statCount: 3.34,
          icon: monthlySellIcon,
          statPercentage: 125,
          chartData: [
            { label: "Jan", count: -25 },
            { label: "Feb", count: -10 },
            { label: "Mar", count: 5 },
            { label: "Apr", count: 15 },
            { label: "May", count: 30 },
            { label: "Jun", count: 15 },
            { label: "Jul", count: 30 },
            { label: "Aug", count: 40 },
            { label: "Sep", count: 15 },
            { label: "Oct", count: 20 },
            { label: "Nov", count: 0 },
            { label: "Dec", count: -10 },
          ],
          chartColor: "#27AE60",
        },
        {
          label: "Active Users",
          statCount: response.data.thirtyDaysAgoActiveCount || 0,
          icon: activeUsersIcon,
          statPercentage: response.data.activeUserPercentageChange || 0,
          chartData: response.data.activeUserCounts || [
            { label: "Jan", count: -25 },
            { label: "Feb", count: -10 },
            { label: "Mar", count: 5 },
            { label: "Apr", count: 15 },
            { label: "May", count: 30 },
            { label: "Jun", count: 15 },
            { label: "Jul", count: 30 },
            { label: "Aug", count: 40 },
            { label: "Sep", count: 15 },
            { label: "Oct", count: 20 },
            { label: "Nov", count: 0 },
            { label: "Dec", count: -10 },
          ],
          chartColor: "#EF5DA8",
        },
        {
          label: "Total Sales",
          statCount: 0.34,
          icon: totalSellIcon,
          statPercentage: 125,
          chartData: [
            { label: "Jan", count: -25 },
            { label: "Feb", count: -10 },
            { label: "Mar", count: 5 },
            { label: "Apr", count: 15 },
            { label: "May", count: 30 },
            { label: "Jun", count: 15 },
            { label: "Jul", count: 30 },
            { label: "Aug", count: 40 },
            { label: "Sep", count: 15 },
            { label: "Oct", count: 20 },
            { label: "Nov", count: 0 },
            { label: "Dec", count: -10 },
          ],
          chartColor: "#F2994A",
        },
      ];
    } catch (error) {
      console.error("Error fetching graphical analytics", error);
      throw new Error(
        error.response?.data?.message || "Fetching graphical analytics failed"
      );
    }
  },
};
