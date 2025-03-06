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
import UserTemplates from "./pages/user-details/user-templates/UserTemplates";
import UserInspections from "./pages/user-details/user-inspections/UserInspections";
import NoSidebarLayout from "./layouts/NoSidebarLayout";
import ViewSubUser from "./pages/user-details/sub-users/view-sub-user/ViewSubUser";

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
        <UserDetails />
      </AuthMiddleware>
    ),
    children: [
      {
        path: ":userId",
        element: (
          <UserDetailsLayout>
            <ViewUserDetails />
          </UserDetailsLayout>
        ),
      },
      {
        path: ":userId/sub-users",
        element: (
          <UserDetailsLayout>
            <SubUsers />
          </UserDetailsLayout>
        ),
      },
      {
        path: ":userId/properties",

        element: (
          <UserDetailsLayout>
            <UserProperties />
          </UserDetailsLayout>
        ),
      },
      {
        path: ":userId/templates",
        element: (
          <UserDetailsLayout>
            <UserTemplates />
          </UserDetailsLayout>
        ),
      },
      {
        path: ":userId/inspections",
        element: (
          <UserDetailsLayout>
            <UserInspections />
          </UserDetailsLayout>
        ),
      },
      {
        path: ":userId/sub-users/details",
        element: <NoSidebarLayout />,
        children: [
          {
            path: ":subUserId",
            element: <ViewSubUser />,
          },
        ],
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
