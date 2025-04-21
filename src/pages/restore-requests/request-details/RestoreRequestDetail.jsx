// import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
// import { userRestoreRequestsAPIs } from "../../../features/user-requests/api";
// import { toast } from "sonner";
import Table from "../../../components/ui/Table";
import TableSkeleton from "../../../components/ui/TableSkeleton";
import { Checkbox, Tabs } from "@mantine/core";
import {
  USER_REQUESTS_FOR_INSPECTIONS_TABLE_HEADINGS,
  USER_REQUESTS_FOR_PROPERTIES_TABLE_HEADINGS,
  USER_REQUESTS_FOR_TEMPLATES_TABLE_HEADINGS,
} from "../../../constants/tables/headings";
import PropertyCard from "../../../features/user-details/components/properties/PropertyCard";
// import DetailPagesRoot from "../../../features/user-details/components/DetailPagesRoot";
import RequestDetailsRoot from "../../../features/user-requests/components/RequestDetailsRoot";
import { useForm } from "@mantine/form";

const RestoreRequestDetail = () => {
  // Local States
  const [activeTab, setActiveTab] = useState("TEMPLATE");

  // Filters Data
  const [filtersData, setFiltersData] = useState({
    search: "",
    page: 1,
  });

  // Form for Restore Requests
  const restoreRequestForm = useForm({
    initialValues: {
      selectedTemplateIds: [],
      selectedInspectionIds: [],
      selectedPropertyIds: [],
      selectAllTemplates: false,
      selectAllInspections: false,
      selectAllProperties: false,
    },
  });

  // Fetch User Requests Query
  //   const { data, isError, error, isPending } = useQuery({
  //     queryKey: ["userRequestsQuery", filtersData],
  //     queryFn: () =>
  //       userRestoreRequestsAPIs.fetchUsersWithRequests({
  //         filtersData,
  //       }),
  //   });

  //   if (isError) {
  //     return toast.error("Error!", {
  //       message: error.message,
  //       duration: 3000,
  //       richColors: true,
  //     });
  //   }

  const DUMMY_TEMPLATES = [
    {
      _id: "template01",
      templateName: "Template 1",
    },
    {
      _id: "template02",
      templateName: "Template 2",
    },
  ];

  const DUMMY_INSPECTIONS = [
    {
      _id: "inspection01",
      inspectionName: "Inspection 1",
      propertyName: "Property 1",
      propertyAddress: "123 Main St, City, State, ZIP",
      propertyImageURL: "https://via.placeholder.com/150",
    },
    {
      _id: "inspection02",
      inspectionName: "Inspection 2",
      propertyName: "Property 2",
      propertyAddress: "123 Main St, City, State, ZIP",
      propertyImageURL: "https://via.placeholder.com/150",
    },
  ];

  const DUMMY_PROPERTIES = [
    {
      _id: "property01",
      propertyName: "Property 1",
      propertyAddress: "123 Main St, City, State, ZIP",
      propertyImageURL: "https://via.placeholder.com/150",
      propertyCatgory: "Residential",
    },
    {
      _id: "property02",
      propertyName: "Property 2",
      propertyAddress: "123 Main St, City, State, ZIP",
      propertyImageURL: "https://via.placeholder.com/150",
      propertyCatgory: "Residential",
    },
  ];

  const TEMPLATE_ROWS = DUMMY_TEMPLATES.map((template) => {
    // Check if the template is selected
    const isSelected = restoreRequestForm.values.selectedTemplateIds.includes(
      template._id
    );

    const handleCheckboxChange = () => {
      // Toggle the selection of the template
      if (isSelected) {
        restoreRequestForm.setFieldValue(
          "selectedTemplateIds",
          restoreRequestForm.values.selectedTemplateIds.filter(
            (id) => id !== template._id
          )
        );
      } else {
        restoreRequestForm.setFieldValue("selectedTemplateIds", [
          ...restoreRequestForm.values.selectedTemplateIds,
          template._id,
        ]);
      }
    };

    return (
      <React.Fragment key={template._id}>
        <Table.ItemRoot className="md:grid hidden">
          <div className="col-span-7 flex items-center gap-[12px]">
            <Checkbox
              id={`checkbox-${template._id}`}
              checked={isSelected}
              onChange={handleCheckboxChange}
              label={
                <p className="text-[14px] font-medium text-[#6C727F] break-all w-full">
                  {template.templateName}
                </p>
              }
            />
          </div>
        </Table.ItemRoot>
      </React.Fragment>
    );
  });
  const INSPECTION_ROWS = DUMMY_INSPECTIONS.map((inspection) => {
    // Check if the inspection is selected
    const isSelected = restoreRequestForm.values.selectedInspectionIds.includes(
      inspection._id
    );
    const handleCheckboxChange = () => {
      // Toggle the selection of the inspection
      if (isSelected) {
        restoreRequestForm.setFieldValue(
          "selectedInspectionIds",
          restoreRequestForm.values.selectedInspectionIds.filter(
            (id) => id !== inspection._id
          )
        );
      } else {
        restoreRequestForm.setFieldValue("selectedInspectionIds", [
          ...restoreRequestForm.values.selectedInspectionIds,
          inspection._id,
        ]);
      }
    };

    return (
      <React.Fragment key={inspection._id}>
        <Table.ItemRoot className="md:grid hidden">
          <div className="col-span-2 flex items-center gap-[12px]">
            <Checkbox
              id={`checkbox-${inspection._id}`}
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
            <p className="text-[14px] font-medium text-[#6C727F] break-all w-full">
              {inspection.inspectionName}
            </p>
          </div>
          <div className="col-span-5">
            <PropertyCard
              propertyData={{
                propertyName: inspection.propertyName,
                propertyAddress: inspection.propertyAddress,
                propertyImageURL: inspection.propertyImageURL,
              }}
            />
          </div>
        </Table.ItemRoot>
      </React.Fragment>
    );
  });
  const PROPERTIES_ROWS = DUMMY_PROPERTIES.map((property) => {
    // Check if the property is selected
    const isSelected = restoreRequestForm.values.selectedPropertyIds.includes(
      property._id
    );

    const handleCheckboxChange = () => {
      // Toggle the selection of the property
      if (isSelected) {
        restoreRequestForm.setFieldValue(
          "selectedPropertyIds",
          restoreRequestForm.values.selectedPropertyIds.filter(
            (id) => id !== property._id
          )
        );
      } else {
        restoreRequestForm.setFieldValue("selectedPropertyIds", [
          ...restoreRequestForm.values.selectedPropertyIds,
          property._id,
        ]);
      }
    };

    return (
      <React.Fragment key={property._id}>
        <Table.ItemRoot className="md:grid hidden">
          <div className="col-span-2 flex items-center gap-[12px]">
            <Checkbox
              id={`checkbox-${property._id}`}
              checked={isSelected}
              onChange={handleCheckboxChange}
            />
            <p className="text-[14px] font-medium text-[#6C727F] break-all w-full">
              {property.propertyCatgory}
            </p>
          </div>
          <div className="col-span-5">
            <PropertyCard
              propertyData={{
                propertyName: property.propertyName,
                propertyAddress: property.propertyAddress,
                propertyImageURL: property.propertyImageURL,
              }}
            />
          </div>
        </Table.ItemRoot>
      </React.Fragment>
    );
  });

  const isPending = false;
  const data = {
    totalPages: 1,
    currentPage: 1,
    totalUsers: 2,
    users: DUMMY_INSPECTIONS,
  };

  return (
    <RequestDetailsRoot className="!overflow-hidden max-w-[1220px]">
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
              {USER_REQUESTS_FOR_TEMPLATES_TABLE_HEADINGS.map((heading) => (
                <div
                  className="col-span-7 flex items-center gap-[12px]"
                  key={heading.key}
                >
                  <Checkbox
                    id="select-all-templates"
                    value={restoreRequestForm.values.selectAllTemplates}
                    onChange={(event) => {
                      restoreRequestForm.setFieldValue(
                        "selectAllTemplates",
                        event.currentTarget.checked
                      );
                      if (event.currentTarget.checked) {
                        // Select all templates
                        const allTemplateIds = DUMMY_TEMPLATES.map(
                          (template) => template._id
                        );
                        restoreRequestForm.setFieldValue(
                          "selectedTemplateIds",
                          allTemplateIds
                        );
                      } else {
                        // Deselect all templates
                        restoreRequestForm.setFieldValue(
                          "selectedTemplateIds",
                          []
                        );
                      }
                    }}
                  />
                  <Table.HeaderItem heading={heading.value} />
                </div>
              ))}
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
                    No Request Found for restoring templates.
                  </p>
                </div>
              ) : (
                TEMPLATE_ROWS
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
              {USER_REQUESTS_FOR_INSPECTIONS_TABLE_HEADINGS.map((heading) =>
                heading.key === "reportName" ? (
                  <div
                    key={heading.key}
                    className="col-span-2 flex items-center gap-[12px]"
                  >
                    <Checkbox
                      id="select-all-inspections"
                      value={restoreRequestForm.values.selectAllInspections}
                      onChange={(event) => {
                        restoreRequestForm.setFieldValue(
                          "selectAllInspections",
                          event.currentTarget.checked
                        );
                        if (event.currentTarget.checked) {
                          // Select all inspections
                          const allInspectionIds = DUMMY_INSPECTIONS.map(
                            (inspection) => inspection._id
                          );
                          restoreRequestForm.setFieldValue(
                            "selectedInspectionIds",
                            allInspectionIds
                          );
                        } else {
                          // Deselect all inspections
                          restoreRequestForm.setFieldValue(
                            "selectedInspectionIds",
                            []
                          );
                        }
                      }}
                    />
                    <Table.HeaderItem heading={heading.value} />
                  </div>
                ) : (
                  <div key={heading.key} className="col-span-5">
                    <Table.HeaderItem heading={heading.value} />
                  </div>
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
                    No Request Found for restoring Inspections.
                  </p>
                </div>
              ) : (
                INSPECTION_ROWS
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
            {/* Table Header */}
            <Table.Header>
              {USER_REQUESTS_FOR_PROPERTIES_TABLE_HEADINGS.map((heading) =>
                heading.key === "propertyCategory" ? (
                  <div
                    key={heading.key}
                    className="col-span-2 flex items-center gap-[12px]"
                  >
                    <Checkbox
                      id="select-all-properties"
                      value={restoreRequestForm.values.selectAllProperties}
                      onChange={(event) => {
                        restoreRequestForm.setFieldValue(
                          "selectAllProperties",
                          event.currentTarget.checked
                        );
                        if (event.currentTarget.checked) {
                          // Select all properties
                          const allPropertyIds = DUMMY_PROPERTIES.map(
                            (property) => property._id
                          );
                          restoreRequestForm.setFieldValue(
                            "selectedPropertyIds",
                            allPropertyIds
                          );
                        } else {
                          // Deselect all properties
                          restoreRequestForm.setFieldValue(
                            "selectedPropertyIds",
                            []
                          );
                        }
                      }}
                    />
                    <Table.HeaderItem heading={heading.value} />
                  </div>
                ) : (
                  <div key={heading.key} className="col-span-5">
                    <Table.HeaderItem heading={heading.value} />
                  </div>
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
                PROPERTIES_ROWS
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
    </RequestDetailsRoot>
  );
};

export default RestoreRequestDetail;
