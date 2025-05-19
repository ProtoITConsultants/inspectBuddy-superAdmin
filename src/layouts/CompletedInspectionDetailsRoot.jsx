import { Outlet, useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import React from "react";
import NoSidebarBackButton from "../components/ui/NoSidebarBackButton";
import Button from "../components/ui/Button";
import { EDIT_DETAILS_ICON } from "../assets/icons/EditIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GENERATE_REPORT_ICON } from "../assets/icons/DynamicIcons";
import { toast } from "sonner";
import { userInspectionsAPIs } from "../features/user-details/api/user-inspections";
import { Group } from "@mantine/core";
import LoadingBackdrop from "../components/ui/LoadingBackdrop";

const CompletedInspectionDetailsRoot = () => {
  // Hooks
  const queryClient = useQueryClient();
  const { userId, inspectionId } = useParams();
  const navigate = useNavigate();

  // Re-edit Inspection - Mutation
  const reEditInspectionReport = useMutation({
    mutationFn: () =>
      userInspectionsAPIs.reEditInspectionReport({ inspectionId }),

    onSuccess: () => {
      toast.success("Inspection report re-edited successfully", {
        description: "You can now edit the inspection report.",
      });
      const filtersData = {};
      queryClient.invalidateQueries({
        queryKey: ["inspectionsQuery", filtersData, userId],
      });

      navigate(
        `/user-details/${userId}/inspections/details/${inspectionId}/edit-details`,
        {
          replace: true,
        }
      );
    },

    onError: (error) => {
      toast.error("Error re-editing inspection report", {
        description: error?.message || "Something went wrong",
      });
    },
  });

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
      {reEditInspectionReport.isPending && <LoadingBackdrop />}
      <section className="fixed top-0 z-[10] flex">
        <Navbar withSidebar={false} />
      </section>
      <React.Fragment>
        <NoSidebarBackButton>
          <Group className="sm:!flex !hidden">
            <Button
              icon={
                <EDIT_DETAILS_ICON className="h-[16px] w-[16px] text-[#9EA3AE]" />
              }
              buttonType="iconButton"
              onClick={() => reEditInspectionReport.mutate()}
              label="Re-Edit Report"
              className="flex items-center !gap-[8px] !p-[8px_10px] border-[1.5px] rounded-[8px] !border-[#E5E6EB] w-fit !text-dark-blue !text-[12px] h-fit !font-medium whitespace-nowrap"
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
          </Group>
        </NoSidebarBackButton>
        <div className="w-[calc(100vw-var(--scrollbar-width))] h-full md:p-[32px] p-[20px] md:mt-[164px] mt-[140px] md:min-h-[calc(100dvh-164px)] min-h-[calc(100dvh-140px)] bg-[#F6FAFF]">
          <div className="flex justify-center w-full">
            <Outlet />
          </div>
        </div>
      </React.Fragment>
    </main>
  );
};

export default CompletedInspectionDetailsRoot;
