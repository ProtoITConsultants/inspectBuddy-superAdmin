import React, { useState } from "react";
import { useParams } from "react-router";
import useUserAddedPropertyCategories from "../../../hooks/useUserAddedPropertyCategories";
import { useQuery } from "@tanstack/react-query";
import { userDetailsAPIs } from "../../../features/user-details/api";
import { toast } from "sonner";
import FiltersTopbar from "../../../components/ui/FiltersTopbar";
import FilterSelect from "../../../components/ui/FilterSelect";
import { Group } from "@mantine/core";
import Searchbar from "../../../components/ui/Searchbar";
import DateRangeFilter from "../../../components/ui/DateRangeFilter";
import Table from "../../../components/ui/Table";
import { PROPERTIES_TABLE_HEADINGS } from "../../../constants/tables/headings";
import Button from "../../../components/ui/Button";
import TableSkeleton from "../../../components/ui/TableSkeleton";
import { convertDateFormate } from "../../../features/user-details/services/convertDateFormate";
import {
  DELETE_ICON,
  VIEW_DETAIL_ICON,
} from "../../../assets/icons/DynamicIcons";
import IconLink from "../../../components/ui/IconLink";
import PropertyCard from "../../../features/user-details/components/properties/PropertyCard";
import ResponsivePropertyCard from "../../../features/user-details/components/properties/ResponsivePropertyCard";
import AddPropertyButton from "../../../features/user-details/components/properties/AddPropertyButton";

const UserProperties = () => {
  // Hooks
  const { userId } = useParams();
  const USER_ADDED_PROPERTY_CATEGORIES = useUserAddedPropertyCategories({
    userId: userId,
  });

  // console.log("USER_ADDED_PROPERTY_CATEGORIES", USER_ADDED_PROPERTY_CATEGORIES);

  // Filters Data
  const [filtersData, setFiltersData] = useState({
    propertyCategory: "",
    page: 1,
    search: "",
    startdate: "",
    enddate: "",
  });

  // Query to fetch the Properties
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["propertiesQuery", filtersData, userId],
    queryFn: () =>
      userDetailsAPIs.fetchUserAddedProperties({ userId: userId, filtersData }),
  });

  if (isError) {
    return toast.error("Error!", {
      description: error?.message || "Couldn't fetch properties!",
      duration: 3000,
    });
  }

  const rows = data?.properties?.map((property) => {
    return window.innerWidth > 1150 ? (
      <Table.ItemRoot key={property._id}>
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-tertiary">
            {convertDateFormate.localeDate(property.createdAt)}
          </p>
        </Table.SingleColumn>
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-tertiary">
            {property.lastInspectionDate === null
              ? "No Inspection Yet"
              : convertDateFormate.localeDate(property.lastInspectionDate)}
          </p>
        </Table.SingleColumn>
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-tertiary">
            {property.category.value}
          </p>
        </Table.SingleColumn>
        <Table.DoubleColumn>
          <PropertyCard
            propertyData={{
              propertyName: property.name,
              propertyAddress: property.address,
              propertyImageURL: property?.image?.url || "",
            }}
          />
        </Table.DoubleColumn>
        <Table.DoubleColumn>
          <Table.ItemActions>
            <IconLink
              href={`details/${property._id}`}
              icon={<VIEW_DETAIL_ICON className="h-[16px]" />}
              label="View Details"
            />
            <Button
              id="delete-property-btn"
              buttonType="iconButton"
              icon={<DELETE_ICON className="text-[#9EA3AE]" />}
              type="button"
              onClick={() => {}}
            />
          </Table.ItemActions>
        </Table.DoubleColumn>
      </Table.ItemRoot>
    ) : (
      <ResponsivePropertyCard key={property._id} propertyData={property} />
    );
  });

  return (
    <React.Fragment>
      {/* Filters Topbar */}
      <FiltersTopbar>
        <FilterSelect
          options={[
            { label: "All Properties", value: "all", iconId: "" },
            ...USER_ADDED_PROPERTY_CATEGORIES,
          ]}
          onChange={(value) => {
            if (value === "all") {
              return setFiltersData((prev) => ({
                ...prev,
                propertyCategory: "",
              }));
            }

            // Get the property category id
            const selectedCategoryId = USER_ADDED_PROPERTY_CATEGORIES.find(
              (cat) => cat.value === value
            );
            setFiltersData((prev) => ({
              ...prev,
              propertyCategory: selectedCategoryId,
            }));
          }}
          initialValue={null}
          placeholder="Select Category"
        />
        <Group className="w-full !justify-end md:!hidden block">
          <DateRangeFilter
            filtersData={filtersData}
            setFiltersData={setFiltersData}
          />
        </Group>
        <Group gap="sm" className="md:col-span-1 col-span-2">
          <Searchbar
            placeholder="Search properties by name..."
            onSearch={(value) =>
              setFiltersData((prev) => ({ ...prev, search: value }))
            }
            className="md:w-[305px] w-full"
          />
          <DateRangeFilter
            filtersData={filtersData}
            setFiltersData={setFiltersData}
            className="md:flex hidden"
          />
        </Group>
      </FiltersTopbar>
      {/* Properties Table */}
      <Table.Root
        className={`p-[12px] md:h-[calc(100%-84px)] h-[calc(100%-136px)]`}
      >
        {/* Table Header */}
        <Table.Header>
          {PROPERTIES_TABLE_HEADINGS.map((heading) =>
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
          <AddPropertyButton className="col-span-2" />
        </Table.Header>

        <AddPropertyButton className="w1150:hidden lg:pb-[24px] pb-[12px] lg:mb-0 mb-[12px] border-b border-[#E4F0FF]" />

        {/* Table Body */}
        <Table.Body
          className={`${
            data?.totalPages < 2
              ? "w1150:!h-[calc(100%-129.28px)] lg:h-[calc(100%-105.28px)] h-[calc(100%-102.38px)]"
              : "w1150:!h-[calc(100%-139.59px)] lg:h-[calc(100%-115.59px)] h-[calc(100%-112.69px)]"
          }`}
        >
          {isPending ? (
            <TableSkeleton />
          ) : data?.properties?.length < 1 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-[14px] font-medium text-[#6C727F] text-center">
                No Properties Found! <br /> Add a new Property to get started.
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
              totalItems: data?.totalProperties,
            }}
          />
        )}
      </Table.Root>
    </React.Fragment>
  );
};

export default UserProperties;
