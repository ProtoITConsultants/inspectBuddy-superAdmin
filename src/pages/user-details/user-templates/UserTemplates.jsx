import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import { userDetailsAPIs } from "../../../features/user-details/api";
import { toast } from "sonner";
import FiltersTopbar from "../../../components/ui/FiltersTopbar";
import { TEMPLATE_CATEGORIES } from "../../../constants/filters";
import FilterSelect from "../../../components/ui/FilterSelect";
import { Group } from "@mantine/core";
import Searchbar from "../../../components/ui/Searchbar";
import DateRangeFilter from "../../../components/ui/DateRangeFilter";
import Table from "../../../components/ui/Table";
import { TEMPLATES_TABLE_HEADINGS } from "../../../constants/tables/headings";
import AddNewTemplateBtn from "../../../features/user-details/components/templates/AddNewTemplateBtn";
import TableSkeleton from "../../../components/ui/TableSkeleton";
import { convertDateFormate } from "../../../features/user-details/services/convertDateFormate";
import TemplateCategoryCard from "../../../features/user-details/components/templates/TemplateCategoryCard";
import IconLink from "../../../components/ui/IconLink";
import {
  CLONE_ICON,
  DELETE_ICON,
  VIEW_DETAIL_ICON,
} from "../../../assets/icons/DynamicIcons";
import Button from "../../../components/ui/Button";
import ResponsiveTemplateCard from "../../../features/user-details/components/templates/ResponsiveTemplateCard";

const UserTemplates = () => {
  // Hooks
  const { userId } = useParams();

  //  Local States
  const [filtersData, setFiltersData] = useState({
    status: "all",
    page: 1,
    search: "",
    startdate: "",
    enddate: "",
  });

  // Query to fetch the Templates
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["templatesQuery", filtersData, userId],
    queryFn: () =>
      userDetailsAPIs.fetchUserAddedTemplates({ userId: userId, filtersData }),
  });

  if (isError) {
    return toast.error("Error!", {
      description: error.message || "Couldn't fetch user's Templates!",
      duration: 3000,
    });
  }

  const rows = data?.templates.map((template) => {
    return window.innerWidth > 1150 ? (
      <Table.ItemRoot key={template._id}>
        <Table.SingleColumn>
          <p className="text-[14px] font-medium text-tertiary">
            {convertDateFormate.internationalDate(template.updatedAt)}
          </p>
        </Table.SingleColumn>
        <Table.DoubleColumn>
          <p className="text-[14px] font-medium text-tertiary">
            {template.name}
          </p>
        </Table.DoubleColumn>
        <Table.SingleColumn>
          <TemplateCategoryCard
            templateType={
              template.isDefault
                ? "default"
                : template.isDraft
                ? "draft"
                : "published"
            }
          />
        </Table.SingleColumn>
        <Table.TripleColumn>
          <Table.ItemActions>
            <IconLink
              href={`details/${template._id}`}
              icon={<VIEW_DETAIL_ICON className="h-[16px]" />}
              label="View Details"
            />
            <Button
              id="clone-template-btn"
              label="Clone Template"
              buttonType="iconButton"
              icon={<CLONE_ICON className="text-[#9EA3AE] h-[16px] w-[16px]" />}
              type="button"
              onClick={() => {}}
              className="flex items-center !gap-[8px] !p-[8px_10px] border-[1.5px] rounded-[8px] !border-[#E5E6EB] w-fit !text-dark-blue !text-[12px] h-fit !font-medium"
            />
            <Button
              id="delete-template-btn"
              buttonType="iconButton"
              icon={<DELETE_ICON className="text-[#9EA3AE]" />}
              type="button"
              onClick={() => {}}
            />
          </Table.ItemActions>
        </Table.TripleColumn>
      </Table.ItemRoot>
    ) : (
      <ResponsiveTemplateCard
        key={template._id}
        templateData={template}
        onCloneTemplate={() => {}}
      />
    );
  });

  return (
    <React.Fragment>
      {/* Filters Topbar */}
      <FiltersTopbar>
        <FilterSelect
          options={TEMPLATE_CATEGORIES}
          onChange={(value) => {
            setFiltersData((prev) => ({ ...prev, status: value }));
          }}
          initialValue={null}
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
      {/* Templates Table */}
      <Table.Root
        className={`p-[12px] md:h-[calc(100%-84px)] h-[calc(100%-136px)]`}
      >
        {/* Table Header */}
        <Table.Header>
          {TEMPLATES_TABLE_HEADINGS.map((heading) =>
            heading.key === "templateName" ? (
              <Table.DoubleColumn key={heading.key}>
                <Table.HeaderItem heading={heading.value} />
              </Table.DoubleColumn>
            ) : (
              <Table.SingleColumn key={heading.key}>
                <Table.HeaderItem heading={heading.value} />
              </Table.SingleColumn>
            )
          )}
          <AddNewTemplateBtn className="col-span-3" />
        </Table.Header>

        <AddNewTemplateBtn className="w1150:hidden lg:pb-[24px] pb-[12px] lg:mb-0 mb-[12px] border-b border-[#E4F0FF]" />

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
          ) : data?.templates?.length < 1 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-[14px] font-medium text-[#6C727F] text-center">
                No Templates Found! <br /> Add a new Template to get started.
              </p>
            </div>
          ) : (
            rows
          )}
        </Table.Body>

        {/* Pagination */}
        {data && data?.totalPages && (
          <Table.Pagination
            filtersData={filtersData}
            setFiltersData={(value) =>
              setFiltersData({ ...filtersData, page: value.page })
            }
            paginationData={{
              totalPages: data?.totalPages,
              currentPage: data?.currentPage,
              totalItems: data?.totalTemplates,
            }}
          />
        )}
      </Table.Root>
    </React.Fragment>
  );
};

export default UserTemplates;
