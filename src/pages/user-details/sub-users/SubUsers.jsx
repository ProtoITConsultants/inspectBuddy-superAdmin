import React, { useState } from "react";
import FiltersTopbar from "../../../components/ui/FiltersTopbar";
import Searchbar from "../../../components/ui/Searchbar";
import FilterSelect from "../../../components/ui/FilterSelect";
import { MEMBER_CATEGORY_FILTER } from "../../../constants/filters";
import useUserAddedPropertyCategories from "../../../hooks/useUserAddedPropertyCategories";
import { useParams } from "react-router";
import Table from "../../../components/ui/Table";
import { SUBUSERS_TABLE_HEADINGS } from "../../../constants/tables/headings";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userDetailsAPIs } from "../../../features/user-details/api";
import { toast } from "sonner";
import TableSkeleton from "../../../components/ui/TableSkeleton";
import { convertDateFormate } from "../../../features/user-details/services/convertDateFormate";
import IconLink from "../../../components/ui/IconLink";
import {
  DELETE_ICON,
  VIEW_DETAIL_ICON,
} from "../../../assets/icons/DynamicIcons";
import Button from "../../../components/ui/Button";
import AssignedCategoriesCard from "../../../features/user-details/components/sub-users/AssignedCategoriesCard";
import SubUserCard from "../../../features/user-details/components/sub-users/SubUserCard";
import DeleteUserPopup from "../../../features/users/components/DeleteUserPopup";

const SubUsers = () => {
  // Hooks
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const USER_ADDED_PROPERTY_CATEGORIES = useUserAddedPropertyCategories({
    userId: userId,
  });

  // Local States
  const [showDeleteSubUserModal, setShowDeleteSubUserModal] = useState(false);
  const [subUserToDelete, setSubUserToDelete] = useState({});
  const [filtersData, setFiltersData] = useState({
    keyword: "All Members",
    page: 1,
    search: "",
  });

  // Fetching Sub Users - Query
  const { data, isError, isPending } = useQuery({
    queryKey: ["subUsers", filtersData],
    queryFn: () =>
      userDetailsAPIs.fetchSubUsers({ userId: userId, filtersData }),
  });

  // Delete Sub User - Mutation
  const deleteSubUser = useMutation({
    mutationFn: () =>
      userDetailsAPIs.deleteSubUser({ userId, subUserId: subUserToDelete._id }),
    onSuccess: () => {
      toast.success("Success!", {
        description: `Sub User deleted successfully.`,
        duration: 3000,
        richColors: true,
      });
      setShowDeleteSubUserModal(false);
      setSubUserToDelete({});
      queryClient.invalidateQueries(["subUsers"]);
    },
    onError: () => {
      toast.error("Error!", {
        description: `Couldn't delete Sub User.`,
        duration: 3000,
        richColors: true,
      });
    },
  });

  const rows = data?.subUsers?.map((member) => {
    return window.innerWidth > 1150 ? (
      <Table.ItemRoot key={member._id}>
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-tertiary">
            {convertDateFormate.subUserAddedDate(member.addedOn)}
          </p>
        </Table.SingleColumn>
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-tertiary">
            {member.userName}
          </p>
        </Table.SingleColumn>
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-tertiary">
            {member.lastOnline}
          </p>
        </Table.SingleColumn>
        <Table.DoubleColumn>
          <AssignedCategoriesCard
            assignedCategories={member.categoriesAssigned}
            totalCategories={USER_ADDED_PROPERTY_CATEGORIES.length}
          />
        </Table.DoubleColumn>
        <Table.DoubleColumn>
          <Table.ItemActions>
            <IconLink
              href={`details/${member._id}`}
              icon={<VIEW_DETAIL_ICON className="h-[16px]" />}
              label="View Details"
            />
            <Button
              id="delete-sub-user-btn"
              buttonType="iconButton"
              icon={<DELETE_ICON className="text-[#8885AA]" />}
              type="button"
              onClick={() => {
                setSubUserToDelete(member);
                setShowDeleteSubUserModal(true);
              }}
            />
          </Table.ItemActions>
        </Table.DoubleColumn>
      </Table.ItemRoot>
    ) : (
      <SubUserCard
        key={member._id}
        memberData={member}
        totalCategories={USER_ADDED_PROPERTY_CATEGORIES.length}
        onDeleteSubUser={() => {
          setSubUserToDelete(member);
          setShowDeleteSubUserModal(true);
        }}
      />
    );
  });

  if (isError) {
    return toast.error("Error!", {
      description: `Couldn't fetch Sub Users!`,
      duration: 3000,
    });
  }

  return (
    <React.Fragment>
      {/* Delete Subuser Confirmation Modal */}
      <DeleteUserPopup
        isModalOpen={showDeleteSubUserModal}
        onCloseModal={() => {
          setShowDeleteSubUserModal(false);
          setSubUserToDelete({});
        }}
        onConfirmDelete={() => deleteSubUser.mutate()}
        isDeletingUser={deleteSubUser.isPending}
        userToDelete={{
          _id: subUserToDelete._id,
          fullname: subUserToDelete.userName,
        }}
      />

      {/* Filters Topbar */}
      <FiltersTopbar>
        <FilterSelect
          options={[
            ...MEMBER_CATEGORY_FILTER,
            ...USER_ADDED_PROPERTY_CATEGORIES,
          ]}
          onChange={(value) => {
            setFiltersData((prev) => ({ ...prev, keyword: value }));
          }}
          initialValue={null}
          placeholder="Select Category..."
          isSubUserFilter={true}
        />
        <Searchbar
          placeholder="Search users by name..."
          onSearch={(value) =>
            setFiltersData((prev) => ({ ...prev, search: value }))
          }
          className="md:col-span-1 col-span-2 md:w-[305px] w-full"
        />
      </FiltersTopbar>
      {/* Sub User List Table */}
      <Table.Root
        className={`p-[12px] md:h-[calc(100%-84px)] h-[calc(100%-136px)]`}
      >
        {/* Table Header */}
        <Table.Header
          showAddButton={true}
          addButtonLabel="Add Sub User"
          addButtonLink={`/user-details/${userId}/add-sub-user`}
        >
          {SUBUSERS_TABLE_HEADINGS.map((heading) =>
            heading.key === "assignedCategories" ? (
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
          {isPending ? (
            <TableSkeleton itemsLength={4} />
          ) : data?.subUsers?.length < 1 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-[14px] font-medium text-[#6C727F] text-center">
                No Sub Users Found for this User!
              </p>
            </div>
          ) : (
            rows
          )}
        </Table.Body>
        {/* Pagination */}
        {data && data?.totalPages > 0 && (
          <Table.Pagination
            filtersData={filtersData}
            setFiltersData={(value) =>
              setFiltersData({ ...filtersData, page: value.page })
            }
            paginationData={{
              totalPages: data?.totalPages,
              currentPage: data?.currentPage,
              totalItems: data?.totalSubUsers,
            }}
          />
        )}
      </Table.Root>
    </React.Fragment>
  );
};

export default SubUsers;
