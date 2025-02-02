import { createBrowserRouter } from "react-router";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import App from "./App";
import Login from "./pages/auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import SidebarLayout from "./layouts/SidebarLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthMiddleware>
        <SidebarLayout>
          <App />
        </SidebarLayout>
      </AuthMiddleware>
    ),
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
