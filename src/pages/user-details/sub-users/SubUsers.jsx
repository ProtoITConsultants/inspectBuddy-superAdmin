import React, { useState } from "react";
import FiltersTopbar from "../../../components/ui/FiltersTopbar";
import Searchbar from "../../../components/ui/Searchbar";
import FilterSelect from "../../../components/ui/FilterSelect";
import { MEMBER_CATEGORY_FILTER } from "../../../constants/filters";
import useUserAddedPropertyCategories from "../../../hooks/useUserAddedPropertyCategories";
import { useParams } from "react-router";
import Table from "../../../components/ui/Table";
import { SUBUSERS_TABLE_HEADINGS } from "../../../constants/tables/headings";
import { useQuery } from "@tanstack/react-query";
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

const SubUsers = () => {
  const { userId } = useParams();

  const [filtersData, setFiltersData] = useState({
    keyword: "All Members",
    page: 1,
    search: "",
  });

  const USER_ADDED_PROPERTY_CATEGORIES = useUserAddedPropertyCategories({
    userId: userId,
  });

  const { data, isError, isPending } = useQuery({
    queryKey: ["subUsers", filtersData],
    queryFn: () =>
      userDetailsAPIs.fetchSubUsers({ userId: userId, filtersData }),
  });

  if (isError) {
    return toast.error("Error!", {
      description: `Couldn't fetch Sub Users!`,
      duration: 3000,
    });
  }

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
        </Table.SingleColumn>{" "}
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-tertiary">
            {member.lastOnline}
          </p>
        </Table.SingleColumn>
        <Table.DoubleColumn>
          <AssignedCategoriesCard
            assignedCategories={member.categoriesAssigned}
            totalCategories={3 + USER_ADDED_PROPERTY_CATEGORIES.length}
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
              onClick={() => {}}
            />
          </Table.ItemActions>
        </Table.DoubleColumn>
      </Table.ItemRoot>
    ) : (
      <SubUserCard
        key={member._id}
        memberData={member}
        totalCategories={3 + USER_ADDED_PROPERTY_CATEGORIES.length}
      />
    );
  });

  return (
    <React.Fragment>
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
          initialValue={MEMBER_CATEGORY_FILTER[0] || null}
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
            <TableSkeleton />
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
