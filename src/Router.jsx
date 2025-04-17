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
import EditSubUserDetails from "./pages/user-details/sub-users/edit-sub-user/EditSubUserDetails";
import ViewUserProperty from "./pages/user-details/user-properties/view-user-property/ViewUserProperty";
import EditUserProperty from "./pages/user-details/user-properties/edit-user-property/EditUserProperty";
import ViewUserTemplate from "./pages/user-details/user-templates/view-user-template/ViewUserTemplate";
import EditUserTemplate from "./pages/user-details/user-templates/edit-user-template/EditUserTemplate";
import EditUserTemplateRoom from "./pages/user-details/user-templates/edit-template-room/EditUserTemplateRoom";
import ViewInspectionDetails from "./pages/user-details/user-inspections/view-inspection-details/ViewInspectionDetails";
import EditUserInspection from "./pages/user-details/user-inspections/edit-user-inspection/EditUserInspection";
import EditUserInspectionRoom from "./pages/user-details/user-inspections/edit-inspection-room/EditUserInspectionRoom";
import AddNewSubUser from "./pages/user-details/sub-users/add-sub-user/AddNewSubUser";
import AddUserProperty from "./pages/user-details/user-properties/add-user-property/AddUserProperty";
import AddNewUser from "./pages/users-list/add-new-user/AddNewUser";
import AddNewUserLayout from "./layouts/AddNewUserLayout";

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

  // Add New User
  {
    path: "/add-new-user",
    element: (
      <AuthMiddleware>
        <AddNewUserLayout>
          <AddNewUser />
        </AddNewUserLayout>
      </AuthMiddleware>
    ),
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
      // Add Sub User, Property, Template, Inspection Routes
      {
        path: ":userId",
        element: <NoSidebarLayout />,
        children: [
          {
            path: "add-sub-user",
            element: <AddNewSubUser />,
          },
          {
            path: "add-new-property",
            element: <AddUserProperty />,
          },
        ],
      },

      // Edit/View Sub User, Property, Template, Inspection Routes
      {
        path: ":userId/sub-users/details",
        element: <NoSidebarLayout />,
        children: [
          {
            path: ":subUserId",
            element: <ViewSubUser />,
          },
          {
            path: ":subUserId/edit-details",
            element: <EditSubUserDetails />,
          },
        ],
      },
      {
        path: ":userId/properties/details",
        element: <NoSidebarLayout />,
        children: [
          {
            path: ":propertyId",
            element: <ViewUserProperty />,
          },
          {
            path: ":propertyId/edit-property",
            element: <EditUserProperty />,
          },
        ],
      },

      {
        path: ":userId/inspections/details",
        element: <NoSidebarLayout />,
        children: [
          {
            path: ":inspectionId",
            element: <ViewInspectionDetails />,
          },
          {
            path: ":inspectionId/edit-details",
            element: <EditUserInspection />,
          },
          {
            path: ":inspectionId/edit-details/room/:roomId",
            element: <EditUserInspectionRoom />,
          },
        ],
      },

      {
        path: ":userId/templates/details",
        element: <NoSidebarLayout />,
        children: [
          {
            path: ":templateId",
            element: <ViewUserTemplate />,
          },
          {
            path: ":templateId/edit-details",
            element: <EditUserTemplate />,
          },
          {
            path: ":templateId/edit-details/room/:roomId",
            element: <EditUserTemplateRoom />,
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
