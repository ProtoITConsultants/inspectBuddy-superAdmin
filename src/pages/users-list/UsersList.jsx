import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { usersListAPIs } from "../../features/users/api";
import { toast } from "sonner";
import FiltersTopbar from "../../components/ui/FiltersTopbar";
import Searchbar from "../../components/ui/Searchbar";
import SubscriptionFilter from "../../features/users/components/SubscriptionFilter/SubscriptionFilter";

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

  return (
    <FiltersTopbar>
      <SubscriptionFilter
        handleFilterChange={(value) =>
          setFiltersData((prev) => ({ ...prev, subscriptionPlan: value }))
        }
      />
      <Searchbar
        placeholder="Search users by name..."
        onSearch={(value) =>
          setFiltersData((prev) => ({ ...prev, search: value }))
        }
      />
    </FiltersTopbar>
  );
};

export default UsersList;
