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

  {
    path: "/login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
]);
