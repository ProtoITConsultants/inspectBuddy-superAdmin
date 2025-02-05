import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { usersListAPIs } from "../../features/users/api";
import { toast } from "sonner";
import FiltersTopbar from "../../components/ui/FiltersTopbar";
import Searchbar from "../../components/ui/Searchbar";
import SubscriptionFilter from "../../features/users/components/SubscriptionFilter/SubscriptionFilter";
import Table from "../../components/ui/Table";
import { USERS_TABLE_HEADINGS } from "../../constants/tables/headings";
import TableSkeleton from "./../../components/ui/TableSkeleton";
import { DELETE_ICON, VIEW_DETAIL_ICON } from "../../assets/icons/DynamicIcons";
import IconLink from "../../components/ui/IconLink";
import UserSubscriptionCard from "../../features/users/components/UserSubscriptionCard";

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

  // Create Rows of the Table
  const rows = data?.users?.map((user, index) => (
    <Table.ItemRoot key={user._id}>
      <Table.SingleColumn>
        <p className="text-[14px] font-medium text-gray-dark">{index + 1}</p>
      </Table.SingleColumn>
      <Table.SingleColumn>
        <p className="text-[14px] font-medium text-gray-dark">
          {user.fullname}
        </p>
      </Table.SingleColumn>
      <Table.DoubleColumn>
        <p className="text-[14px] font-medium text-gray-dark">{user.email}</p>
      </Table.DoubleColumn>
      <Table.SingleColumn>
        <UserSubscriptionCard subscriptionPlan={user.role} />
      </Table.SingleColumn>
      <Table.DoubleColumn>
        <Table.ItemActions>
          <IconLink
            href={`/users/${user._id}`}
            icon={<VIEW_DETAIL_ICON className="h-[16px]" />}
            label="View Details"
          />
          <DELETE_ICON className="text-[#FF613E]" />
        </Table.ItemActions>
      </Table.DoubleColumn>
    </Table.ItemRoot>
  ));

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
            setFiltersData((prev) => ({ ...prev, searchQuery: value }))
          }
        />
      </FiltersTopbar>
      {/* User List Table */}
      <Table.Root className="p-[12px] h-[calc(100%-84px)]">
        {/* Table Header */}
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
        {/* Table Body */}
        <Table.Body
          className={`${
            data?.totalPages < 2
              ? "h-[calc(100%-126px)]"
              : "h-[calc(100%-136px)]"
          }`}
        >
          {isLoading ? (
            <TableSkeleton />
          ) : data?.users?.length < 1 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-[14px] font-medium text-gray-dark text-center">
                No Users Found! <br /> Add a new User to get started.
              </p>
            </div>
          ) : (
            rows
          )}
        </Table.Body>
        <Table.Pagination
          filtersData={filtersData}
          setFiltersData={(value) =>
            setFiltersData({ ...filtersData, page: value.page })
          }
          paginationData={{
            totalPages: data?.totalPages,
            currentPage: data?.currentPage,
            totalItems: data?.totalUsers,
          }}
        />
      </Table.Root>
    </React.Fragment>
  );
};

export default UsersList;
