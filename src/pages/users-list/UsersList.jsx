import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { usersListAPIs } from "../../features/users/api";
import { toast } from "sonner";
import FiltersTopbar from "../../components/ui/FiltersTopbar";
import Searchbar from "../../components/ui/Searchbar";
import SubscriptionFilter from "../../features/users/components/SubscriptionFilter/SubscriptionFilter";
import Table from "../../components/ui/Table";
import { USERS_TABLE_HEADINGS } from "../../constants/tables/headings";

const UsersList = () => {
  // Filters State
  const [filtersData, setFiltersData] = useState({
    subscriptionPlan: "All Users",
    page: 1,
    searchQuery: "",
  });

  // Fetching Users - Query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getAllUsersQuery", filtersData],
    queryFn: () => usersListAPIs.getAllUsers(filtersData),
  });

  // Error Toast
  if (isError) {
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Users.`,
      duration: 3000,
    });
  }

  return (
    <React.Fragment>
      {/* Filters Topbar */}
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
      {/* User List Table */}
      <Table.Root className="md:p-[12px] sm:py-[24px] py-[12px]">
        <Table.Header>
          {USERS_TABLE_HEADINGS.map((heading) =>
            heading.key === "userEmail" ? (
              <Table.DoubleColumn key={heading.key}>
                <Table.HeaderItem heading={heading.value} />
              </Table.DoubleColumn>
            ) : (
              <Table.SingleColumn key={heading.key}>
                <Table.HeaderItem heading={heading.value} />
              </Table.SingleColumn>
            )
          )}
        </Table.Header>
      </Table.Root>
    </React.Fragment>
  );
};

export default UsersList;
