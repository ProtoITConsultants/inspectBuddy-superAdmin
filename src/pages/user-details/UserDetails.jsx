import { Outlet, useParams } from "react-router";
import { useUserDetailsStore } from "../../store/userDetailsStore";
import { useQuery } from "@tanstack/react-query";
import { userDetailsAPIs } from "./../../features/user-details/api/index";
import { toast } from "sonner";
import { useEffect } from "react";

const UserDetails = () => {
  // Hooks
  const { userId } = useParams();

  // Global State
  const setShowSubUserOption = useUserDetailsStore(
    (state) => state.setShowSubUserOption
  );

  // Query To Fetch User Details
  const { data, error, isError } = useQuery({
    queryKey: ["userProfileDetails", userId],
    queryFn: () => userDetailsAPIs.fetchUserProfileDetails({ userId: userId }),
  });

  // Use Effect to set the State
  useEffect(() => {
    if (data?.role === "TOPTIER") {
      setShowSubUserOption(true);
    }

    return () => {
      setShowSubUserOption(false);
    };
  }, [data, setShowSubUserOption]);

  // Error Toast
  if (isError) {
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch User Details.`,
      duration: 3000,
    });
  }

  return <Outlet />;
};

export default UserDetails;
