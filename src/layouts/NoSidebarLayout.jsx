import { Outlet, useParams } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import React from "react";
import NoSidebarBackButton from "../components/ui/NoSidebarBackButton";
import useNavbarTitle from "../hooks/useNavbarTitle";
import { EDIT_DETAILS_ICON } from "../assets/icons/EditIcon";
import IconLink from "../components/ui/IconLink";
import { GENERATE_REPORT_ICON } from "./../assets/icons/DynamicIcons";
import Button from "../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { userInspectionsAPIs } from "../features/user-details/api/user-inspections";
import { INSPECTION_LOGS_ICON } from "../assets/icons/InspectionLogs";

const NoSidebarLayout = () => {
  const { pageTitle } = useNavbarTitle();
  const { subUserId, templateId, inspectionId, userId } = useParams();

  // Generate Report PDF - Mutation
  const generateInspectionPDF = useMutation({
    mutationFn: () =>
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

  return (
    <main className="App overflow-x-hidden">
      <section className="fixed top-0 z-[10] flex">
        <Navbar withSidebar={false} />
      </section>
      <React.Fragment>
        <NoSidebarBackButton>
          {pageTitle === "Subuser Detail" ? (
            <IconLink
              href={`${subUserId}/edit-details`}
              icon={
                <EDIT_DETAILS_ICON className="h-[16px] w-[16px] text-[#9EA3AE]" />
              }
              label="Edit Details"
            />
          ) : pageTitle === "Template Details" ? (
            <IconLink
              href={`${templateId}/edit-details`}
              icon={
                <EDIT_DETAILS_ICON className="h-[16px] w-[16px] text-[#9EA3AE]" />
              }
              label="Edit Details"
            />
          ) : pageTitle === "Inspection Details" ? (
            <div className="md:flex hidden items-center gap-2">
              <IconLink
                href={`${inspectionId}/inspection-logs`}
                icon={
                  <INSPECTION_LOGS_ICON className="h-[16px] w-[16px] text-[#9EA3AE]" />
                }
                label="Inspection Logs"
              />
              <IconLink
                href={`${inspectionId}/edit-details`}
                icon={
                  <EDIT_DETAILS_ICON className="h-[16px] w-[16px] text-[#9EA3AE]" />
                }
                label="Edit Details"
              />
              <Button
                icon={
                  <GENERATE_REPORT_ICON className="h-[16px] w-[16px] text-[#9EA3AE]" />
                }
                buttonType="iconButton"
                onClick={() => generateInspectionPDF.mutate()}
                label="Generate Report"
                className="flex items-center !gap-[8px] !p-[8px_10px] border-[1.5px] rounded-[8px] !border-[#E5E6EB] w-fit !text-dark-blue !text-[12px] h-fit !font-medium whitespace-nowrap"
              />
            </div>
          ) : null}
        </NoSidebarBackButton>
        <div className="w-[calc(100vw-var(--scrollbar-width))] h-full md:p-[32px] p-[20px] md:mt-[164px] mt-[140px] md:min-h-[calc(100dvh-164px)] min-h-[calc(100dvh-140px)]">
          <div className="flex justify-center w-full">
            <Outlet />
          </div>
        </div>
      </React.Fragment>
    </main>
  );
};

export default NoSidebarLayout;
