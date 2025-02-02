// import { useAuthStore } from "../store/authStore";
import { authServices } from "../features/auth/services/authServices";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";
import { toast } from "sonner";
import LoadingBackdrop from "../components/ui/LoadingBackdrop";
import { useAuthStore } from "../store/authStore";
import { useEffect, useRef } from "react";

const AuthMiddleware = ({ children }) => {
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setUser = useAuthStore((state) => state.setUser);

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["checkAuthStatus"],
    queryFn: authServices.checkAuthStatus,
    refetchOnWindowFocus: true,
    retry: false,
  });

  // Prevent updates when the component is unmounted
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    if (data && isMounted.current) {
      setUser(data?.userData);
      setIsAuthenticated(true);
    }

    return () => {
      isMounted.current = false; // Avoid memory leaks by preventing updates on unmounted component
      setIsAuthenticated(false);
      setUser({});
    };
  }, [data, setIsAuthenticated, setUser]);

  if (isPending) {
    return <LoadingBackdrop />;
  }
  if (isError) {
    toast.error("Authentication Failed!", {
      description: error.message || "User Authentication failed!",
      duration: 3000,
    });
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthMiddleware;
