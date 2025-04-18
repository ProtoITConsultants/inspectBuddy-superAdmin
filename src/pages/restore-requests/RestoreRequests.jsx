import { Tabs } from "@mantine/core";
import Table from "../../components/ui/Table";
import { USER_REQUESTS_TABLE_HEADINGS } from "../../constants/tables/headings";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import TableSkeleton from "../../components/ui/TableSkeleton";
import IconLink from "../../components/ui/IconLink";
import { VIEW_DETAIL_ICON } from "../../assets/icons/DynamicIcons";
import { userRestoreRequestsAPIs } from "../../features/user-requests/api";
import { toast } from "sonner";

const RestoreRequests = () => {
  // Local States
  const [activeTab, setActiveTab] = useState("TEMPLATE");

  // Filters Data
  const [filtersData, setFiltersData] = useState({
    search: "",
    page: 1,
  });

  // Fetch User Requests Query
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["userRequestsQuery", filtersData, activeTab],
    queryFn: () =>
      userRestoreRequestsAPIs.fetchUsersWithRequests({
        filtersData,
        type: activeTab,
      }),
  });

  if (isError) {
    return toast.error("Error!", {
      message: error.message,
      duration: 3000,
      richColors: true,
    });
  }

  const rows = data?.users?.map((user, index) => (
    <React.Fragment key={user._id}>
      <Table.ItemRoot className="md:grid hidden">
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-[#6C727F]">{index + 1}</p>
        </Table.SingleColumn>
        <Table.DoubleColumn>
          <p className="text-[14px] font-medium text-[#6C727F]">
            {user.fullname}
          </p>
        </Table.DoubleColumn>
        <Table.DoubleColumn>
          <p className="text-[14px] font-medium text-[#6C727F] break-all w-full">
            {user.email}
          </p>
        </Table.DoubleColumn>
        <Table.DoubleColumn className="justify-end">
          <IconLink
            id="view-restore-request-details"
            href={`details/${user._id}?type=${activeTab}`}
            icon={<VIEW_DETAIL_ICON className="h-[16px]" />}
            label="View Details"
          />
        </Table.DoubleColumn>
      </Table.ItemRoot>
    </React.Fragment>
  ));

  return (
    <Tabs
      value={activeTab}
      onChange={(value) => setActiveTab(value)}
      keepMounted={false}
      color="#2A85FF"
      classNames={{
        root: "h-full",
        list: "w-fit",
        panel: "h-[calc(100%-60px)]",
      }}
    >
      <Tabs.List className="mb-[24px]">
        <Tabs.Tab value="TEMPLATE">For Templates</Tabs.Tab>
        <Tabs.Tab value="INSPECTION">For Inspections</Tabs.Tab>
        <Tabs.Tab value="PROPERTY">For Properties</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="TEMPLATE">
        {/* User Requests Table - Templates*/}
        <Table.Root className="lg:p-[16px] h-full user-requests-table-root">
          {/* Table Header */}
          <Table.Header>
            {USER_REQUESTS_TABLE_HEADINGS.map((heading) =>
              heading.key !== "serialNo" ? (
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
                ? "h-[calc(100%-96.8px)]"
                : "h-[calc(100%-106.8px)]"
            }`}
          >
            {isPending ? (
              <TableSkeleton />
            ) : data?.users?.length < 1 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-[14px] font-medium text-[#6C727F] text-center">
                  No User Request Found for restoring templates.
                </p>
              </div>
            ) : (
              rows
            )}
          </Table.Body>

          {data && data?.totalPages > 0 && (
            <Table.Pagination
              filtersData={filtersData}
              setFiltersData={(value) => setFiltersData({ page: value.page })}
              paginationData={{
                totalPages: data?.totalPages,
                currentPage: data?.currentPage,
                totalItems: data?.totalUsers,
              }}
            />
          )}
        </Table.Root>
      </Tabs.Panel>

      <Tabs.Panel value="INSPECTION">
        {/* User Requests Table - Inspections*/}
        <Table.Root className="lg:p-[16px] h-full user-requests-table-root">
          {/* Table Header */}
          <Table.Header>
            {USER_REQUESTS_TABLE_HEADINGS.map((heading) =>
              heading.key !== "serialNo" ? (
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
                ? "h-[calc(100%-96.8px)]"
                : "h-[calc(100%-106.8px)]"
            }`}
          >
            {isPending ? (
              <TableSkeleton />
            ) : data?.users?.length < 1 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-[14px] font-medium text-[#6C727F] text-center">
                  No User Request Found for restoring Inspections.
                </p>
              </div>
            ) : (
              rows
            )}
          </Table.Body>

          {data && data?.totalPages > 0 && (
            <Table.Pagination
              filtersData={filtersData}
              setFiltersData={(value) => setFiltersData({ page: value.page })}
              paginationData={{
                totalPages: data?.totalPages,
                currentPage: data?.currentPage,
                totalItems: data?.totalUsers,
              }}
            />
          )}
        </Table.Root>
      </Tabs.Panel>

      <Tabs.Panel value="PROPERTY">
        {/* User Requests Table - Properties*/}
        <Table.Root className="lg:p-[16px] h-full user-requests-table-root">
          {" "}
          {/* Table Header */}
          <Table.Header>
            {USER_REQUESTS_TABLE_HEADINGS.map((heading) =>
              heading.key !== "serialNo" ? (
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
                ? "h-[calc(100%-96.8px)]"
                : "h-[calc(100%-106.8px)]"
            }`}
          >
            {isPending ? (
              <TableSkeleton />
            ) : data?.users?.length < 1 ? (
              <div className="flex justify-center items-center h-full">
                <p className="text-[14px] font-medium text-[#6C727F] text-center">
                  No User Request Found for restoring properties.
                </p>
              </div>
            ) : (
              rows
            )}
          </Table.Body>
          {data && data?.totalPages > 0 && (
            <Table.Pagination
              filtersData={filtersData}
              setFiltersData={(value) => setFiltersData({ page: value.page })}
              paginationData={{
                totalPages: data?.totalPages,
                currentPage: data?.currentPage,
                totalItems: data?.totalUsers,
              }}
            />
          )}
        </Table.Root>
      </Tabs.Panel>
    </Tabs>
  );
};

export default RestoreRequests;
