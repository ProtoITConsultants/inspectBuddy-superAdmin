import { createBrowserRouter } from "react-router";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import App from "./App";
import Login from "./pages/auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import SidebarLayout from "./layouts/SidebarLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import ReportSettings from "./pages/report-settings/ReportSettings";
import PlanSettings from "./pages/plan-settings/PlanSettings";
import UsersList from "./pages/users-list/UsersList";
import UserDetailsLayout from "./layouts/UserDetailsLayout";
import UserDetails from "./pages/user-details/UserDetails";
import ViewUserDetails from "./pages/user-details/view-user-details/ViewUserDetails";
import SubUsers from "./pages/user-details/sub-users/SubUsers";
import UserProperties from "./pages/user-details/user-properties/UserProperties";

export const router = createBrowserRouter([
  {
    path: "",
    element: (
      <AuthMiddleware>
        <SidebarLayout>
          <App />
        </SidebarLayout>
      </AuthMiddleware>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "report-settings",
        element: <ReportSettings />,
      },
      {
        path: "plan-settings",
        element: <PlanSettings />,
      },
      {
        path: "all-users",
        element: <UsersList />,
      },
    ],
  },

  // User Detail Screens
  {
    path: "/user-details",
    element: (
      <AuthMiddleware>
        <UserDetailsLayout>
          <UserDetails />
        </UserDetailsLayout>
      </AuthMiddleware>
    ),

    children: [
      {
        path: ":userId",
        element: <ViewUserDetails />,
      },
      {
        path: ":userId/sub-users",
        element: <SubUsers />,
      },
      {
        path: ":userId/properties",
        element: <UserProperties />,
      },
    ],
  },

  {
    path: "/login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
]);
