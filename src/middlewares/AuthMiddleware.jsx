// import { useAuthStore } from "../store/authStore";
import { authServices } from "../services/authServices";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { toast } from "sonner";

const AuthMiddleware = ({ children }) => {
  //   const setLoading = useAuthStore((state) => state.setLoading);
  //   const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  //   const setUser = useAuthStore((state) => state.setUser);

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["checkAuthStatus"],
    queryFn: authServices.checkAuthStatus,
    refetchOnWindowFocus: true,
    retry: false,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (isError) {
    toast.error("Authentication Failed!", {
      description: error.message || "User Authentication failed!",
      duration: 3000,
    });
    return <Navigate to="/login" />;
  }

  console.log(data);

  return <>{children}</>;
};

export default AuthMiddleware;
