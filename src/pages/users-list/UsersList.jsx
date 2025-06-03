import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
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
import DeleteUserPopup from "../../features/users/components/DeleteUserPopup";
import Button from "./../../components/ui/Button";
import { Group } from "@mantine/core";
import { DOWNLOAD_ICON } from "../../assets/icons/DownloadIcon";
import ResponsiveUserCard from "../../features/users/components/ResponsiveUserCard";
import { Link } from "react-router";

const UsersList = () => {
  // Hooks
  const queryClient = new QueryClient();

  // Local States
  const [deleteUserModalData, setDeleteUserModalData] = useState({
    openModal: false,
    userToDelete: {},
  });

  // Filters State
  const [filtersData, setFiltersData] = useState({
    subscriptionPlan: "All Users",
    page: 1,
    searchQuery: "",
  });

  // Fetching Users - Query
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getAllUsersQuery", filtersData],
    queryFn: () => usersListAPIs.getAllUsers(filtersData),
  });

  // Generate Users CSV File - Mutation
  const generateUsersCSVFile = useMutation({
    mutationFn: () =>
      toast.promise(usersListAPIs.generateUsersCSVFile, {
        loading: "Generating Excel file...",
        success: "Excel file generated successfully.",
        error: "Error generating Excel file.",
        duration: 3000,
        richColors: true,
      }),
  });

  // Delete User - Mutation
  const deleteSubUser = useMutation({
    mutationFn: () =>
      usersListAPIs.deleteUser({
        userId: deleteUserModalData.userToDelete._id,
      }),
    onSuccess: () => {
      toast.success("User deleted successfully!", {
        duration: 3000,
        richColors: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["getAllUsersQuery", filtersData],
      });
      setDeleteUserModalData({ openModal: false, userToDelete: {} });
    },
    onError: () => {
      toast.error("Error!", {
        description: "Couldn't delete User.",
        duration: 3000,
        richColors: true,
      });
    },
  });

  // Error Toast
  if (isError) {
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Users.`,
      duration: 3000,
    });
  }

  // Create Rows of the Table
  const rows = data?.users?.map((user, index) => (
    <React.Fragment key={user._id}>
      <Table.ItemRoot className="w1150:grid hidden grid-cols-8">
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-[#6C727F]">
            {10 * (data?.currentPage - 1) + index + 1}
          </p>
        </Table.SingleColumn>
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-[#6C727F]">
            {user.fullname}
          </p>
        </Table.SingleColumn>
        <Table.DoubleColumn>
          <p className="text-[14px] font-medium text-[#6C727F] break-all w-full">
            {user.email}
          </p>
        </Table.DoubleColumn>
        <Table.SingleColumn>
          <UserSubscriptionCard subscriptionPlan={user.role} />
        </Table.SingleColumn>
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-[#6C727F]">
            ${user.subscriptionAmount}
            {user.subscriptionType === "YEAR" ||
            user.subscriptionType === "YEARLY"
              ? "/year"
              : "/month"}
          </p>
        </Table.SingleColumn>
        <Table.DoubleColumn>
          <Table.ItemActions>
            <IconLink
              href={`/user-details/${user._id}`}
              icon={<VIEW_DETAIL_ICON className="h-[16px]" />}
              label="View Details"
            />
            <Button
              id="delete-user-btn"
              buttonType="iconButton"
              icon={<DELETE_ICON className="text-[#FF613E]" />}
              type="button"
              onClick={() =>
                setDeleteUserModalData({ openModal: true, userToDelete: user })
              }
              className="!w-fit !h-fit !bg-transparent !p-0"
            />
          </Table.ItemActions>
        </Table.DoubleColumn>
      </Table.ItemRoot>
      <ResponsiveUserCard userData={user} />
    </React.Fragment>
  ));

  return (
    <React.Fragment>
      {/* Delete User Warning Modal */}
      <DeleteUserPopup
        isModalOpen={deleteUserModalData.openModal}
        onCloseModal={() =>
          setDeleteUserModalData((prev) => ({ ...prev, openModal: false }))
        }
        onConfirmDelete={() => deleteSubUser.mutate()}
        isDeletingUser={deleteSubUser.isPending}
        userToDelete={deleteUserModalData.userToDelete}
      />

      {/* Filters Topbar */}
      <FiltersTopbar className="w900:!flex !grid sm:p-[8px_12px] p-0 sm:!border !border-[0px]">
        <SubscriptionFilter
          handleFilterChange={(value) =>
            setFiltersData((prev) => ({ ...prev, subscriptionPlan: value }))
          }
        />
        <div className="flex justify-end w900:hidden">
          <Link
            to="/add-new-user"
            className="items-center justify-center bg-primary text-white font-bold text-[14px] p-[12px_24px] rounded-[8px] w-fit"
          >
            Add New User
          </Link>
        </div>
        <Group
          gap="sm"
          className="col-span-2 w900:!justify-start !justify-between sm:!flex-row !flex-col"
        >
          <Searchbar
            placeholder="Search users by name..."
            onSearch={(value) =>
              setFiltersData((prev) => ({ ...prev, searchQuery: value }))
            }
            className="sm:w-[305px] w-full"
          />
          <Button
            id="generate-users-report"
            buttonType="iconButton"
            icon={
              <DOWNLOAD_ICON className="h-[16px] text-primary group-hover:text-white transition-colors" />
            }
            className="h-[40px] !border-2 !border-[#CCE2FF] !text-primary !px-6 !font-semibold hover:bg-primary hover:!text-white hover:!border-primary group transition-colors whitespace-nowrap sm:w-fit w-full"
            label="Generate CSV"
            type="button"
            onClick={generateUsersCSVFile.mutate}
          />
        </Group>
      </FiltersTopbar>
      {/* User List Table */}
      <Table.Root className="lg:p-[12px] user-list-table-root">
        {/* Table Header */}
        <Table.Header
          showAddButton={true}
          addButtonLabel="Add New User"
          addButtonLink="/add-new-user"
          className="grid-cols-8"
        >
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

        <div className="flex justify-end">
          <Link
            to="/add-new-user"
            className="w1150:hidden w900:flex hidden items-center justify-center bg-primary text-white font-bold text-[14px] p-[12px_24px] rounded-[8px] w-fit"
          >
            Add New User
          </Link>
        </div>
        {/* Table Body */}
        <Table.Body
          className={`${
            data?.totalPages < 2
              ? "h-[calc(100%-126px)] user-list-table-body-no-pagination"
              : "user-list-table-body"
          }`}
        >
          {isPending ? (
            <TableSkeleton itemsLength={4} />
          ) : data?.users?.length < 1 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-[14px] font-medium text-[#6C727F] text-center">
                No Users Found! <br /> Add a new User to get started.
              </p>
            </div>
          ) : (
            rows
          )}
        </Table.Body>
        {data && data?.totalPages > 0 && (
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
        )}
      </Table.Root>
    </React.Fragment>
  );
};

export default UsersList;
