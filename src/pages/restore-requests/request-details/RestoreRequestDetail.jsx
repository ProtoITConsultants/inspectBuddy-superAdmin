import React, { useEffect, useState } from "react";
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
import RequestDetailsRoot from "../../../features/user-requests/components/RequestDetailsRoot";
import { useForm } from "@mantine/form";
import { useParams } from "react-router";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { userRestoreRequestsAPIs } from "./../../../features/user-requests/api/index";
import Button from "./../../../components/ui/Button";
import RequestStatusCard from "../../../features/user-requests/components/RequestStatusCard";
import { toast } from "sonner";

const RestoreRequestDetail = () => {
  // Local States
  const [activeTab, setActiveTab] = useState("TEMPLATE");
  const { requesterId } = useParams();
  const queryClient = useQueryClient();

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

  // Restore Selected Requests - Mutation
  const restoreSelectedRequests = useMutation({
    mutationFn: () => {
      const {
        selectedInspectionIds,
        selectedPropertyIds,
        selectedTemplateIds,
      } = restoreRequestForm.values;

      const getAvailableQuota = (current, total) => {
        if (total === -999) return Infinity;
        return Math.max(0, total - current); // Avoid negative quota
      };

      const inspectionsData =
        restoreRequestForm.values.requestedInspectionsData;
      const propertiesData = restoreRequestForm.values.requestedPropertiesData;
      const templatesData = restoreRequestForm.values.requestedTemplatesData;

      const availableQuota = {
        inspections: getAvailableQuota(
          inspectionsData.currentEntityCount,
          inspectionsData.totalEntityLimit
        ),
        properties: getAvailableQuota(
          propertiesData.currentEntityCount,
          propertiesData.totalEntityLimit
        ),
        templates: getAvailableQuota(
          templatesData.currentEntityCount,
          templatesData.totalEntityLimit
        ),
      };

      if (selectedInspectionIds.length > availableQuota.inspections) {
        return Promise.reject(
          new Error(
            `You can only restore ${availableQuota.inspections} inspections.`
          )
        );
      }

      if (selectedPropertyIds.length > availableQuota.properties) {
        return Promise.reject(
          new Error(
            `You can only restore ${availableQuota.properties} properties.`
          )
        );
      }

      if (selectedTemplateIds.length > availableQuota.templates) {
        return Promise.reject(
          new Error(
            `You can only restore ${availableQuota.templates} templates.`
          )
        );
      }

      return userRestoreRequestsAPIs.approveUserRequest({
        selectedInspectionIds,
        selectedPropertyIds,
        selectedTemplateIds,
        userId: requesterId,
      });
    },
    onSuccess: () => {
      toast.success("Success!", {
        description: "User requests approved successfully.",
        duration: 3000,
        richColors: true,
      });
      queryClient.invalidateQueries([
        "requestedTemplatesQuery",
        filtersData.templatesPage,
      ]);
      queryClient.invalidateQueries([
        "requestedInspectionsQuery",
        filtersData.inspectionsPage,
      ]);
      queryClient.invalidateQueries([
        "requestedPropertiesQuery",
        filtersData.propertiesPage,
      ]);
      restoreRequestForm.reset();
    },
    onError: (error) => {
      toast.error("Error!", {
        description: error?.message || "Error approving user request",
        duration: 3000,
        richColors: true,
      });
    },
  });

  // Queries to fetch Data
  const requestsData = useQueries({
    queries: [
      {
        queryKey: ["requestedTemplatesQuery", filtersData.templatesPage],
        queryFn: () =>
          userRestoreRequestsAPIs.fetchUserRequests({
            userId: requesterId,
            type: "TEMPLATE",
            page: filtersData.templatesPage,
          }),
        enabled: activeTab === "TEMPLATE",
      },
      {
        queryKey: ["requestedInspectionsQuery", filtersData.inspectionsPage],
        queryFn: () =>
          userRestoreRequestsAPIs.fetchUserRequests({
            userId: requesterId,
            type: "INSPECTION",
            page: filtersData.inspectionsPage,
          }),
        enabled: activeTab === "INSPECTION",
      },
      {
        queryKey: ["requestedPropertiesQuery", filtersData.propertiesPage],
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
            <div className="col-span-5 flex items-center gap-[12px]">
              <Checkbox
                id={`checkbox-${request?._id}`}
                checked={isSelected}
                onChange={handleCheckboxChange}
                label={
                  <p className="text-[14px] font-medium text-[#6C727F] break-all w-full">
                    {request?.template?.name}
                  </p>
                }
                disabled={request?.status === "ACCEPTED"}
              />
            </div>
            <div className="col-span-2 flex items-center justify-end">
              <RequestStatusCard status={request?.status} />
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
            <div className="col-span-2 flex items-center">
              <Checkbox
                id={`checkbox-${request?._id}`}
                checked={isSelected}
                onChange={handleCheckboxChange}
                disabled={request?.status === "ACCEPTED"}
                label={
                  <p className="text-[14px] font-medium text-[#6C727F] break-all w-full">
                    {request?.inspection?.name}
                  </p>
                }
              />
            </div>
            <div className="col-span-3">
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
            <div className="col-span-2 flex items-center justify-end">
              <RequestStatusCard status={request?.status} />
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
            <div className="col-span-2 flex items-center">
              <Checkbox
                id={`checkbox-${request?._id}`}
                checked={isSelected}
                onChange={handleCheckboxChange}
                disabled={request?.status === "ACCEPTED"}
                label={
                  <p className="text-[14px] font-medium text-[#6C727F] break-all w-full">
                    {request?.property?.category?.value}
                  </p>
                }
              />
            </div>
            <div className="col-span-3">
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
            <div className="col-span-2 flex items-center justify-end">
              <RequestStatusCard status={request?.status} />
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
    if (requestsData?.requestedInspections) {
      formRef.current.setFieldValue("requestedInspectionsData", {
        currentEntityCount:
          requestsData?.requestedInspections.currentEntityCount,
        currentPage: requestsData?.requestedInspections.currentPage,
        totalEntityLimit: requestsData?.requestedInspections.totalEntityLimit,
        totalPages: requestsData?.requestedInspections.totalPages,
        totalRequests: requestsData?.requestedInspections.totalRequests,
      });
    }

    if (requestsData?.requestedProperties) {
      formRef.current.setFieldValue("requestedPropertiesData", {
        currentEntityCount:
          requestsData?.requestedProperties.currentEntityCount,
        currentPage: requestsData?.requestedProperties.currentPage,
        totalEntityLimit: requestsData?.requestedProperties.totalEntityLimit,
        totalPages: requestsData?.requestedProperties.totalPages,
        totalRequests: requestsData?.requestedProperties.totalRequests,
      });
    }
  }, [requestsData]);

  const checkIfRequestArraysAreEmpty = () => {
    const requestedTemplates = restoreRequestForm.values.selectedTemplateIds;
    const requestedInspections =
      restoreRequestForm.values.selectedInspectionIds;
    const requestedProperties = restoreRequestForm.values.selectedPropertyIds;

    return (
      requestedTemplates.length === 0 &&
      requestedInspections.length === 0 &&
      requestedProperties.length === 0
    );
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
            <Table.Header className="!py-[8px]">
              {USER_REQUESTS_FOR_TEMPLATES_TABLE_HEADINGS.map((heading) => (
                <div
                  className="col-span-3 flex items-center gap-[12px]"
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
                        const allTemplateIds =
                          requestsData?.requestedTemplates?.requests?.map(
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
              <div className="col-span-4 flex justify-end">
                <Button
                  id="approve-requests-button"
                  type="button"
                  label="Approve Selected"
                  className="w-fit text-[16px] !font-semibold"
                  buttonType="contained"
                  onClick={restoreSelectedRequests.mutate}
                  disabled={checkIfRequestArraysAreEmpty()}
                />
              </div>
            </Table.Header>
            {/* Table Body */}
            <Table.Body
              className={`${
                requestsData?.requestedTemplates?.totalPages < 2
                  ? "h-[calc(100%-88.8px)]"
                  : "h-[calc(100%-98.8px)]"
              }`}
            >
              {requestsData?.isPending ? (
                <TableSkeleton itemsLength={4} />
              ) : requestsData?.requestedTemplates?.requests?.length < 1 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-[14px] font-medium text-[#6C727F] text-center">
                    No request found for restoring templates.
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
            <Table.Header className="!py-[8px]">
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
                          const allInspectionIds =
                            requestsData?.requestedInspections?.requests?.map(
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
                  <div
                    key={heading.key}
                    className="col-span-2 flex items-center"
                  >
                    <Table.HeaderItem heading={heading.value} />
                  </div>
                )
              )}
              <div className="col-span-3 flex justify-end">
                <Button
                  id="approve-requests-button"
                  type="button"
                  label="Approve Selected"
                  className="w-fit text-[16px] !font-semibold"
                  buttonType="contained"
                  onClick={restoreSelectedRequests.mutate}
                  disabled={checkIfRequestArraysAreEmpty()}
                />
              </div>
            </Table.Header>
            {/* Table Body */}
            <Table.Body
              className={`${
                requestsData?.requestedInspections?.totalPages < 2
                  ? "h-[calc(100%-88.8px)]"
                  : "h-[calc(100%-98.8px)]"
              }`}
            >
              {requestsData?.isPending ? (
                <TableSkeleton itemsLength={4} />
              ) : requestsData?.requestedInspections?.requests?.length < 1 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-[14px] font-medium text-[#6C727F] text-center">
                    No request found for restoring inspections.
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
            <Table.Header className="!py-[8px]">
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
                          const allPropertyIds =
                            requestsData?.requestedProperties?.requests?.map(
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
                  <div
                    key={heading.key}
                    className="col-span-2 flex items-center"
                  >
                    <Table.HeaderItem heading={heading.value} />
                  </div>
                )
              )}

              <div className="col-span-3 flex justify-end">
                <Button
                  id="approve-requests-button"
                  type="button"
                  label="Approve Selected"
                  className="w-fit text-[16px] !font-semibold"
                  buttonType="contained"
                  onClick={restoreSelectedRequests.mutate}
                  disabled={checkIfRequestArraysAreEmpty()}
                />
              </div>
            </Table.Header>
            {/* Table Body */}
            <Table.Body
              className={`${
                requestsData?.requestedTemplates?.totalPages < 2
                  ? "h-[calc(100%-88.8px)]"
                  : "h-[calc(100%-98.8px)]"
              }`}
            >
              {requestsData?.isPending ? (
                <TableSkeleton itemsLength={4} />
              ) : requestsData?.requestedProperties?.requests.length < 1 ? (
                <div className="flex justify-center items-center h-full">
                  <p className="text-[14px] font-medium text-[#6C727F] text-center">
                    No request found for restoring properties.
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
