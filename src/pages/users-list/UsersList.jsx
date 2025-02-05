import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { usersListAPIs } from "../../features/users/api";
import { toast } from "sonner";

const UsersList = () => {
  const [filtersData, setFiltersData] = useState({
    subscriptionPlan: "All Users",
    page: 1,
    searchQuery: "",
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAllUsersQuery", filtersData],
    queryFn: () => usersListAPIs.getAllUsers(filtersData),
  });

  if (isError) {
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Users.`,
      duration: 3000,
    });
  }
  return <div>UsersList</div>;
};

export default UsersList;
