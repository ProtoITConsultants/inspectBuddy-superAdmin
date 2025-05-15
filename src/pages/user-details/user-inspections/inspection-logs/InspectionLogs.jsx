import { useQuery } from "@tanstack/react-query";
import { userInspectionsAPIs } from "../../../../features/user-details/api/user-inspections";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import Table from "../../../../components/ui/Table";
import React, { useState } from "react";
import { useParams } from "react-router";
import { INSPECTION_LOGS_TABLE_HEADINGS } from "../../../../constants/tables/headings";
import TableSkeleton from "../../../../components/ui/TableSkeleton";
import { toast } from "sonner";
import { convertDateFormate } from "../../../../features/user-details/services/convertDateFormate";
import IconLink from "../../../../components/ui/IconLink";
import { DOWNLOAD_ICON } from "../../../../assets/icons/DownloadIcon";
import InspectionLogsCard from "../../../../features/user-details/components/inspections/InspectionLogsCard";
import "./inspectionLogs.css";

const InspectionLogs = () => {
  // Hooks
  const { inspectionId, userId } = useParams();

  const [filtersData, setFiltersData] = useState({
    page: 1,
  });

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["inspectionLogsQuery"],
    queryFn: () =>
      userInspectionsAPIs.fetchInspectionLogs({
        userId,
        inspectionId,
        page: filtersData.page,
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isError) {
    toast.error("Error fetching inspection logs.", {
      description: error?.message || "Something went wrong.",
    });
  }

  const rows = data?.reports?.map((report) => {
    return (
      <React.Fragment key={report.id}>
        <Table.ItemRoot className="md:grid hidden">
          <Table.SingleColumn>
            <p className="text-[14px] font-medium text-tertiary">
              {convertDateFormate.localeDate(report?.reportPDF?.dateGenerated)}
            </p>
          </Table.SingleColumn>
          <Table.DoubleColumn>
            <p className="text-[14px] font-medium text-tertiary">
              {report?.inspectorName}
            </p>
          </Table.DoubleColumn>
          <Table.DoubleColumn>
            <p className="text-[14px] font-medium text-tertiary break-all">
              {report?.name}
            </p>
          </Table.DoubleColumn>
          <Table.DoubleColumn className="flex items-center justify-end">
            <IconLink
              href={report?.reportPDF?.url}
              icon={
                <DOWNLOAD_ICON className="h-[16px] w-[16px] text-[#9EA3AE]" />
              }
              label="Download Report"
              className="whitespace-nowrap"
              target="_blank"
            />
          </Table.DoubleColumn>
        </Table.ItemRoot>
        <InspectionLogsCard
          creationDate={convertDateFormate.localeDate(
            report?.reportPDF?.dateGenerated
          )}
          inspectorName={report?.inspectorName}
          reportName={report?.name}
          pdfURL={report?.reportPDF?.url}
        />
      </React.Fragment>
    );
  });

  return (
    <DetailPagesRoot className="max-w-full">
      <Table.Root className={`px-[12px] h-full mt-0 border-0`}>
        {/* Table Header */}
        <Table.Header className="md:!grid">
          {INSPECTION_LOGS_TABLE_HEADINGS.map((heading) =>
            heading.key !== "createdOn" ? (
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
              ? "inspection-logs-table-body-no-pagination"
              : "inspection-logs-table-body-with-pagination"
          } overflow-auto md:px-[12px] md:pt-[24px]`}
        >
          {isPending ? (
            <TableSkeleton />
          ) : data?.reports?.length < 1 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-[14px] font-medium text-dark-gray text-center">
                No Inspections Report generated yet. Please generate a report to
                get Inspection Logs.
              </p>
            </div>
          ) : (
            rows
          )}
        </Table.Body>
        {data && (
          <Table.Pagination
            filtersData={filtersData}
            setFiltersData={(value) =>
              setFiltersData({ ...filtersData, page: value.page })
            }
            paginationData={{
              totalPages: data?.totalPages,
              currentPage: data?.currentPage,
              totalItems: data?.totalReports,
            }}
          />
        )}
      </Table.Root>
    </DetailPagesRoot>
  );
};

export default InspectionLogs;
