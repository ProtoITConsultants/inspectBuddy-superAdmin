// import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router";
import { useQueries } from "@tanstack/react-query";
import { userRestoreRequestsAPIs } from "./../../../features/user-requests/api/index";

const RestoreRequestDetail = () => {
  // Local States
  const [activeTab, setActiveTab] = useState("TEMPLATE");
  const { requesterId } = useParams();

  // Filters Data
  const [filtersData, setFiltersData] = useState({
    search: "",
    templatesPage: 1,
    inspectionsPage: 1,
    propertiesPage: 1,
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
      requestedTemplatesData: {},
      requestedInspectionsData: {},
      requestedPropertiesData: {},
    },
  });

  // Queries to fetch Data
  const requestsData = useQueries({
    queries: [
      {
        queryKey: ["requestedTemplatesQuery", filtersData],
        queryFn: () =>
          userRestoreRequestsAPIs.fetchUserRequests({
            userId: requesterId,
            type: "TEMPLATE",
            page: filtersData.templatesPage,
          }),
        enabled: activeTab === "TEMPLATE",
      },
      {
        queryKey: ["requestedInspectionsQuery", filtersData],
        queryFn: () =>
          userRestoreRequestsAPIs.fetchUserRequests({
            userId: requesterId,
            type: "INSPECTION",
            page: filtersData.inspectionsPage,
          }),
        enabled: activeTab === "INSPECTION",
      },
      {
        queryKey: ["requestedPropertiesQuery", filtersData],
        queryFn: () =>
          userRestoreRequestsAPIs.fetchUserRequests({
            userId: requesterId,
            type: "PROPERTY",
            page: filtersData.propertiesPage,
          }),
        enabled: activeTab === "PROPERTY",
      },
    ],
    combine: (data) => ({
      requestedTemplates: data[0].data,
      requestedInspections: data[1].data,
      requestedProperties: data[2].data,
    }),
  });

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

  const TEMPLATE_ROWS = requestsData?.requestedTemplates?.requests?.map(
    (request) => {
      // Check if the template is selected
      const isSelected = restoreRequestForm.values.selectedTemplateIds.includes(
        request._id
      );

      const handleCheckboxChange = () => {
        // Toggle the selection of the template
        if (isSelected) {
          restoreRequestForm.setFieldValue(
            "selectedTemplateIds",
            restoreRequestForm.values.selectedTemplateIds.filter(
              (id) => id !== request._id
            )
          );
        } else {
          restoreRequestForm.setFieldValue("selectedTemplateIds", [
            ...restoreRequestForm.values.selectedTemplateIds,
            request._id,
          ]);
        }
      };

      return (
        <React.Fragment key={request?._id}>
          <Table.ItemRoot className="md:grid hidden">
            <div className="col-span-7 flex items-center gap-[12px]">
              <Checkbox
                id={`checkbox-${request?._id}`}
                checked={isSelected}
                onChange={handleCheckboxChange}
                label={
                  <p className="text-[14px] font-medium text-[#6C727F] break-all w-full">
                    {request?.template?.name}
                  </p>
                }
              />
            </div>
          </Table.ItemRoot>
        </React.Fragment>
      );
    }
  );
  const INSPECTION_ROWS = requestsData?.requestedInspections?.requests?.map(
    (request) => {
      // Check if the inspection is selected
      const isSelected =
        restoreRequestForm.values.selectedInspectionIds.includes(request._id);
      const handleCheckboxChange = () => {
        // Toggle the selection of the inspection
        if (isSelected) {
          restoreRequestForm.setFieldValue(
            "selectedInspectionIds",
            restoreRequestForm.values.selectedInspectionIds.filter(
              (id) => id !== request._id
            )
          );
        } else {
          restoreRequestForm.setFieldValue("selectedInspectionIds", [
            ...restoreRequestForm.values.selectedInspectionIds,
            request._id,
          ]);
        }
      };

      const { property } = request.inspection;

      return (
        <React.Fragment key={request?._id}>
          <Table.ItemRoot className="md:grid hidden">
            <div className="col-span-2 flex items-center gap-[12px]">
              <Checkbox
                id={`checkbox-${request?._id}`}
                checked={isSelected}
                onChange={handleCheckboxChange}
              />
              <p className="text-[14px] font-medium text-[#6C727F] break-all w-full">
                {request?.inspection?.name}
              </p>
            </div>
            <div className="col-span-5">
              <PropertyCard
                propertyData={{
                  propertyName: property?.name,
                  propertyAddress: [
                    property?.address?.unit,
                    property?.address?.street,
                    property?.address?.city,
                  ]
                    .filter(Boolean)
                    .join(", "),
                  propertyImageURL: property?.image?.url || "",
                }}
              />
            </div>
          </Table.ItemRoot>
        </React.Fragment>
      );
    }
  );
  const PROPERTIES_ROWS = requestsData?.requestedProperties?.requests?.map(
    (request) => {
      // Check if the property is selected
      const isSelected = restoreRequestForm.values.selectedPropertyIds.includes(
        request._id
      );

      const handleCheckboxChange = () => {
        // Toggle the selection of the property
        if (isSelected) {
          restoreRequestForm.setFieldValue(
            "selectedPropertyIds",
            restoreRequestForm.values.selectedPropertyIds.filter(
              (id) => id !== request._id
            )
          );
        } else {
          restoreRequestForm.setFieldValue("selectedPropertyIds", [
            ...restoreRequestForm.values.selectedPropertyIds,
            request._id,
          ]);
        }
      };

      return (
        <React.Fragment key={request?._id}>
          <Table.ItemRoot className="md:grid hidden">
            <div className="col-span-2 flex items-center gap-[12px]">
              <Checkbox
                id={`checkbox-${request?._id}`}
                checked={isSelected}
                onChange={handleCheckboxChange}
              />
              <p className="text-[14px] font-medium text-[#6C727F] break-all w-full">
                {request?.property?.category?.value}
              </p>
            </div>
            <div className="col-span-5">
              <PropertyCard
                propertyData={{
                  propertyName: request?.property?.name,
                  propertyAddress: [
                    request?.property?.address?.unit,
                    request?.property?.address?.street,
                    request?.property?.address?.city,
                  ]
                    .filter(Boolean)
                    .join(", "),
                  propertyImageURL: request?.property?.image?.url || "",
                }}
              />
            </div>
          </Table.ItemRoot>
        </React.Fragment>
      );
    }
  );

  const formRef = React.useRef(restoreRequestForm);

  useEffect(() => {
    if (requestsData?.requestedTemplates) {
      formRef.current.setFieldValue("requestedTemplatesData", {
        currentEntityCount: requestsData?.requestedTemplates.currentEntityCount,
        currentPage: requestsData?.requestedTemplates.currentPage,
        totalEntityLimit: requestsData?.requestedTemplates.totalEntityLimit,
        totalPages: requestsData?.requestedTemplates.totalPages,
        totalRequests: requestsData?.requestedTemplates.totalRequests,
      });
    }
  }, [requestsData?.requestedTemplates]);

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
                requestsData?.requestedTemplates?.totalPages < 2
                  ? "h-[calc(100%-96.8px)]"
                  : "h-[calc(100%-106.8px)]"
              }`}
            >
              {requestsData?.isPending ? (
                <TableSkeleton />
              ) : requestsData?.requestedTemplates?.requests?.length < 1 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-[14px] font-medium text-[#6C727F] text-center">
                    No Request Found for restoring templates.
                  </p>
                </div>
              ) : (
                TEMPLATE_ROWS
              )}
            </Table.Body>

            {requestsData?.requestedTemplates &&
              requestsData?.requestedTemplates?.totalPages > 0 && (
                <Table.Pagination
                  filtersData={filtersData}
                  setFiltersData={(value) =>
                    setFiltersData((prev) => ({
                      ...prev,
                      templatesPage: value.page,
                    }))
                  }
                  paginationData={{
                    totalPages: requestsData?.requestedTemplates?.totalPages,
                    currentPage: requestsData?.requestedTemplates?.currentPage,
                    totalItems: requestsData?.requestedTemplates?.totalRequests,
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
                requestsData?.requestedInspections?.totalPages < 2
                  ? "h-[calc(100%-96.8px)]"
                  : "h-[calc(100%-106.8px)]"
              }`}
            >
              {requestsData?.isPending ? (
                <TableSkeleton />
              ) : requestsData?.requestedInspections?.requests?.length < 1 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-[14px] font-medium text-[#6C727F] text-center">
                    No Request Found for restoring Inspections.
                  </p>
                </div>
              ) : (
                INSPECTION_ROWS
              )}
            </Table.Body>

            {requestsData?.requestedInspections &&
              requestsData?.requestedInspections?.totalPages > 0 && (
                <Table.Pagination
                  filtersData={filtersData}
                  setFiltersData={(value) =>
                    setFiltersData((prev) => ({
                      ...prev,
                      inspectionsPage: value.page,
                    }))
                  }
                  paginationData={{
                    totalPages: requestsData?.requestedInspections?.totalPages,
                    currentPage:
                      requestsData?.requestedInspections?.currentPage,
                    totalItems:
                      requestsData?.requestedInspections?.totalRequests,
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
                requestsData?.requestedTemplates?.totalPages < 2
                  ? "h-[calc(100%-96.8px)]"
                  : "h-[calc(100%-106.8px)]"
              }`}
            >
              {requestsData?.isPending ? (
                <TableSkeleton />
              ) : requestsData?.requestedProperties?.requests.length < 1 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-[14px] font-medium text-[#6C727F] text-center">
                    No User Request Found for restoring properties.
                  </p>
                </div>
              ) : (
                PROPERTIES_ROWS
              )}
            </Table.Body>
            {requestsData?.requestedProperties &&
              requestsData?.requestedProperties?.totalPages > 0 && (
                <Table.Pagination
                  filtersData={filtersData}
                  setFiltersData={(value) =>
                    setFiltersData((prev) => ({
                      ...prev,
                      propertiesPage: value.page,
                    }))
                  }
                  paginationData={{
                    totalPages: requestsData.requestedProperties?.totalPages,
                    currentPage: requestsData.requestedProperties?.currentPage,
                    totalItems: requestsData.requestedProperties?.totalRequests,
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
