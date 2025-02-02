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
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              _id: 1,
              label: "Total Users",
              statCount: 9.34,
              icon: totalUsersIcon,
              statPercentage: 125,
              chartData: [
                { date: "Jan", temperature: -25 },
                { date: "Feb", temperature: -10 },
                { date: "Mar", temperature: 5 },
                { date: "Apr", temperature: 15 },
                { date: "May", temperature: 30 },
                { date: "Jun", temperature: 15 },
                { date: "Jul", temperature: 30 },
                { date: "Aug", temperature: 40 },
                { date: "Sep", temperature: 15 },
                { date: "Oct", temperature: 20 },
                { date: "Nov", temperature: 0 },
                { date: "Dec", temperature: -10 },
              ],
              chartColor: "#0A82FD",
            },
            {
              _id: 2,
              label: "Current Month Sell",
              statCount: 3.34,
              icon: monthlySellIcon,
              statPercentage: 125,
              chartData: [
                { date: "Jan", temperature: -25 },
                { date: "Feb", temperature: -10 },
                { date: "Mar", temperature: 5 },
                { date: "Apr", temperature: 15 },
                { date: "May", temperature: 30 },
                { date: "Jun", temperature: 15 },
                { date: "Jul", temperature: 30 },
                { date: "Aug", temperature: 40 },
                { date: "Sep", temperature: 15 },
                { date: "Oct", temperature: 20 },
                { date: "Nov", temperature: 0 },
                { date: "Dec", temperature: -10 },
              ],
              chartColor: "#27AE60",
            },
            {
              _id: 3,
              label: "Active Users",
              statCount: 3.5,
              icon: activeUsersIcon,
              statPercentage: -125,
              chartData: [
                { date: "Jan", temperature: -25 },
                { date: "Feb", temperature: -10 },
                { date: "Mar", temperature: 5 },
                { date: "Apr", temperature: 15 },
                { date: "May", temperature: 30 },
                { date: "Jun", temperature: 15 },
                { date: "Jul", temperature: 30 },
                { date: "Aug", temperature: 40 },
                { date: "Sep", temperature: 15 },
                { date: "Oct", temperature: 20 },
                { date: "Nov", temperature: 0 },
                { date: "Dec", temperature: -10 },
              ],
              chartColor: "#EF5DA8",
            },
            {
              _id: 4,
              label: "Total Sell",
              statCount: 0.34,
              icon: totalSellIcon,
              statPercentage: 125,
              chartData: [
                { date: "Jan", temperature: -25 },
                { date: "Feb", temperature: -10 },
                { date: "Mar", temperature: 5 },
                { date: "Apr", temperature: 15 },
                { date: "May", temperature: 30 },
                { date: "Jun", temperature: 15 },
                { date: "Jul", temperature: 30 },
                { date: "Aug", temperature: 40 },
                { date: "Sep", temperature: 15 },
                { date: "Oct", temperature: 20 },
                { date: "Nov", temperature: 0 },
                { date: "Dec", temperature: -10 },
              ],
              chartColor: "#F2994A",
            },
          ]);
        }, 2000);
      });
    } catch (error) {
      console.error("Error fetching graphical analytics", error);
      throw new Error(
        error.response?.data?.message || "Fetching graphical analytics failed"
      );
    }
  },
};
