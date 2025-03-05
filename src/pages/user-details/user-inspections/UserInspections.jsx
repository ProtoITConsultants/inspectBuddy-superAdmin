import { useQueries } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
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

const UserInspections = () => {
  // Hooks
  const { userId } = useParams();
  const {
    currentMonthStartDate,
    thirdPreviousMonthStartDate,
    fifthPreviousMonthStartDate,
  } = useMonthStartDates();

  // Filters Data
  const [filtersData, setFiltersData] = useState({
    status: "all",
    page: 1,
    search: "",
    startdate: "",
    enddate: "",
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

  return (
    <React.Fragment>
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

        {/* Table Body */}
      </Table.Root>
    </React.Fragment>
  );
};

export default UserInspections;
