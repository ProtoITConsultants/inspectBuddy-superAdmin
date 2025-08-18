import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import { userDetailsAPIs } from "../../../features/user-details/api";
import { toast } from "sonner";
import FiltersTopbar from "../../../components/ui/FiltersTopbar";
import FilterSelect from "../../../components/ui/FilterSelect";
import { INSPECTIONS_CATEGORIES } from "../../../constants/filters";
import { Group } from "@mantine/core";
import Searchbar from "../../../components/ui/Searchbar";
import DateRangeFilter from "../../../components/ui/DateRangeFilter";
import Table from "../../../components/ui/Table";
import InspectionTableStats from "../../../features/user-details/components/inspections/InspectionTableStats";
import StatsSkeleton from "./../../../features/user-details/components/inspections/StatsSkeleton";
import useMonthStartDates from "../../../features/user-details/hooks/useMonthStartDates";
import Stats from "../../../features/user-details/components/inspections/Stats";
import { INSPECTIONS_TABLE_HEADINGS } from "../../../constants/tables/headings";
import TableSkeleton from "../../../components/ui/TableSkeleton";
import { convertDateFormate } from "../../../features/user-details/services/convertDateFormate";
import PropertyCard from "../../../features/user-details/components/properties/PropertyCard";
import InspectionStatusCard from "../../../features/user-details/components/inspections/InspectionStatusCard";
import IconLink from "../../../components/ui/IconLink";
import {
  DELETE_ICON,
  GENERATE_REPORT_ICON,
  VIEW_DETAIL_ICON,
} from "../../../assets/icons/DynamicIcons";
import Button from "../../../components/ui/Button";
import ResponsiveInspectionCard from "../../../features/user-details/components/inspections/ResponsiveInspectionCard";
import DeleteInspectionModal from "../../../features/user-details/components/inspections/DeleteInspectionModal";
import { userInspectionsAPIs } from "../../../features/user-details/api/user-inspections";

const UserInspections = () => {
  // Hooks
  const { userId } = useParams();
  const {
    currentMonthStartDate,
    thirdPreviousMonthStartDate,
    fifthPreviousMonthStartDate,
  } = useMonthStartDates();
  const queryClient = useQueryClient();

  // Local States
  const [deleteInspectionModalData, setDeleteInspectionModalData] = useState({
    openModal: false,
    inspectionToDelete: {},
  });

  // Filters Data
  const [filtersData, setFiltersData] = useState({
    status: "all",
    page: 1,
    search: "",
    startdate: "",
    enddate: "",
  });

  // Generate Report PDF - Mutation
  const generateInspectionPDF = useMutation({
    mutationFn: ({ inspectionId }) =>
      toast.promise(
        userInspectionsAPIs.generateInspectionPDF({
          inspectionId,
          userId,
        }),
        {
          loading: "Generating PDF file...",
          success: async (data) => {
            const { url } = data;
            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank"; // Open in new tab
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return "PDF generated successfully!";
          },
          error: "Error generating PDF file.",
          duration: 3000,
          richColors: true,
        }
      ),
  });

  // Query to fetch the Inspections and Inspection Stats
  const { userInspections, userInspectionStats } = useQueries({
    queries: [
      {
        queryKey: ["inspectionsQuery", filtersData, userId],
        queryFn: () =>
          userDetailsAPIs.fetchUserAddedInspections({
            userId: userId,
            filtersData,
          }),
      },
      {
        queryKey: ["userInspectionStats", userId],
        queryFn: () =>
          userDetailsAPIs.fetchUserInspectionStats({ userId: userId }),
      },
    ],

    combine: (data) => {
      return {
        userInspections: {
          data: data[0].data,
          isError: data[0].isError,
          error: data[0].error,
          isPending: data[0].isPending,
        },
        userInspectionStats: {
          data: data[1].data,
          isError: data[1].isError,
          error: data[1].error,
          isPending: data[1].isPending,
          isSuccess: data[1].isSuccess,
        },
      };
    },
  });

  if (userInspections.isError) {
    return toast.error("Error", {
      description:
        userInspections.error.message || "Couldn't fetch user Inspections!",
      duration: 3000,
    });
  }

  if (userInspectionStats.isError) {
    return toast.error("Error", {
      description:
        userInspectionStats.error.message ||
        "Couldn't fetch user Inspection Stats!",
      duration: 3000,
    });
  }

  // Function to handle date range change - Inspection Stats bar
  const handleDateRangeChange = (dateRange) => {
    if (dateRange === "last-30-days") {
      setFiltersData({
        ...filtersData,
        startdate: currentMonthStartDate.toISOString(),
      });
    } else if (dateRange === "last-03-months") {
      setFiltersData({
        ...filtersData,
        startdate: thirdPreviousMonthStartDate.toISOString(),
      });
    } else if (dateRange === "last-05-months") {
      setFiltersData({
        ...filtersData,
        startdate: fifthPreviousMonthStartDate.toISOString(),
      });
    }
  };

  const rows = userInspections?.data?.inspections?.map((inspection) => {
    return window.innerWidth > 1150 ? (
      <Table.ItemRoot key={inspection._id}>
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-tertiary">
            {convertDateFormate.localeDate(inspection?.updatedAt)}
          </p>
        </Table.SingleColumn>
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-tertiary">
            {inspection?.name}
          </p>
        </Table.SingleColumn>
        <Table.DoubleColumn>
          <PropertyCard
            propertyData={{
              propertyName:
                inspection?.property?.address?.street +
                ", " +
                inspection?.property?.name,
              propertyAddress: [
                inspection?.property?.address?.city,
                inspection?.property?.address?.state,
                inspection?.property?.address?.zip,
                inspection?.property?.address?.country,
              ]
                .filter(Boolean)
                .join(", "),
              propertyImageURL: inspection?.property?.image?.url,
            }}
          />
        </Table.DoubleColumn>
        <Table.SingleColumn>
          <InspectionStatusCard
            status={
              inspection?.isDraft
                ? "drafted"
                : inspection?.isInspectionCompleted
                ? "completed"
                : "in progress"
            }
          />
        </Table.SingleColumn>
        <Table.DoubleColumn>
          <Table.ItemActions>
            <IconLink
              href={
                inspection?.isInspectionCompleted
                  ? `/user-details/${userId}/completed-inspection/details/${inspection._id}`
                  : `details/${inspection._id}`
              }
              icon={<VIEW_DETAIL_ICON className="h-[16px]" />}
              label={
                <>
                  <span className="hidden xl:inline">View Details</span>
                  <span className="inline xl:hidden">View</span>
                </>
              }
              className="whitespace-nowrap"
            />
            <Button
              id="generate-report-btn"
              label={
                <>
                  <span className="hidden xl:inline">Generate Report</span>
                  <span className="inline xl:hidden">Generate</span>
                </>
              }
              buttonType="iconButton"
              icon={<GENERATE_REPORT_ICON className="text-[#9EA3AE]" />}
              type="button"
              onClick={() =>
                generateInspectionPDF.mutate({
                  inspectionId: inspection._id,
                })
              }
              // disabled={!inspection?.isInspectionCompleted}
              className="flex items-center !gap-[8px] !p-[8px_10px] border-[1.5px] rounded-[8px] !border-[#E5E6EB] w-fit !text-dark-blue !text-[12px] h-fit !font-medium whitespace-nowrap"
            />
            <Button
              id="delete-inspection-btn"
              buttonType="iconButton"
              icon={<DELETE_ICON className="text-[#FF613E] w-[20px]" />}
              type="button"
              onClick={() =>
                setDeleteInspectionModalData({
                  openModal: true,
                  inspectionToDelete: inspection,
                })
              }
              className="!p-0 !w-fit !h-fit"
            />
          </Table.ItemActions>
        </Table.DoubleColumn>
      </Table.ItemRoot>
    ) : (
      <ResponsiveInspectionCard
        key={inspection._id}
        inspectionData={inspection}
      />
    );
  });

  return (
    <React.Fragment>
      {/* Delete Inspection Modal */}
      <DeleteInspectionModal
        isModalOpen={deleteInspectionModalData.openModal}
        onCloseModal={() =>
          setDeleteInspectionModalData({
            openModal: false,
            inspectionToDelete: {},
          })
        }
        inspectionToDelete={deleteInspectionModalData.inspectionToDelete}
        onSuccess={() => {
          // Update the Query Data
          queryClient.invalidateQueries([
            "inspectionsQuery",
            filtersData,
            userId,
          ]);
          queryClient.invalidateQueries(["userInspectionStats", userId]);
        }}
      />

      {/* Filters Topbar */}
      <FiltersTopbar>
        <FilterSelect
          options={INSPECTIONS_CATEGORIES}
          onChange={(value) => {
            setFiltersData((prev) => ({ ...prev, status: value }));
          }}
          initialValue={INSPECTIONS_CATEGORIES[0] || null}
          placeholder="Select Category"
        />
        <Group gap="sm">
          <Searchbar
            placeholder="Search properties by name..."
            onSearch={(value) =>
              setFiltersData((prev) => ({ ...prev, search: value }))
            }
          />
          <DateRangeFilter
            filtersData={filtersData}
            setFiltersData={setFiltersData}
            tooltipLabel="Select Date Range - Filter by 'Updated on'"
          />
        </Group>
      </FiltersTopbar>
      {/* Inspection Table */}
      <Table.Root
        className={`p-[12px] md:h-[calc(100%-84px)] h-[calc(100%-136px)]`}
      >
        {/* Table Stats */}
        <InspectionTableStats isLoadingData={userInspections.isPending}>
          {userInspectionStats.isPending ? (
            <StatsSkeleton />
          ) : (
            <Stats
              onDateRangeChange={handleDateRangeChange}
              statsData={userInspectionStats.data}
            />
          )}
        </InspectionTableStats>

        {/* Table Header */}
        <Table.Header className="mt-[12px]">
          {INSPECTIONS_TABLE_HEADINGS.map((heading) =>
            heading.key === "property" ? (
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
            userInspections?.data?.totalPages < 2
              ? "xl:h-[calc(100%-275px)] 3xl:!h-[calc(100%-230px)] 2xl:!h-[calc(100%-250px)] w1150:!h-[calc(100%-295px)] sm:h-[calc(100%-208.98px)] ms:h-[calc(100%-273.8px)] h-[calc(100%-298.58px)]"
              : "xl:h-[calc(100%-225.59px)] 3xl:!h-[calc(100%-240px)] 2xl:!h-[calc(100%-260px)] w1150:!h-[calc(100%-305px)] sm:h-[calc(100%-219.28px)] ms:h-[calc(100%-284.08px)] h-[calc(100%-308.88px)]"
          } pt-[12px]`}
        >
          {userInspections?.isPending ? (
            <TableSkeleton itemsLength={4} />
          ) : userInspections?.data?.inspections?.length < 1 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-[14px] font-medium text-dark-gray text-center">
                No Inspections Found! <br /> Add a new Inspection to get
                started.
              </p>
            </div>
          ) : (
            rows
          )}
        </Table.Body>

        {userInspections?.data && (
          <Table.Pagination
            filtersData={filtersData}
            setFiltersData={(value) =>
              setFiltersData({ ...filtersData, page: value.page })
            }
            paginationData={{
              totalPages: userInspections?.data?.totalPages,
              currentPage: userInspections?.data?.currentPage,
              totalItems: userInspections?.data?.totalInspections,
            }}
          />
        )}
      </Table.Root>
    </React.Fragment>
  );
};

export default UserInspections;
