import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userInspectionsAPIs } from "./../../../../features/user-details/api/user-inspections";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import CompletedInspection from "../../../../features/user-details/components/inspections/details/CompletedInspectionDetails";
import { toast } from "sonner";
import CompletedInspectionSkeleton from "../../../../features/user-details/components/inspections/CompletedInspectionSkeleton";
import { Group } from "@mantine/core";
import Button from "../../../../components/ui/Button";
import { EDIT_DETAILS_ICON } from "../../../../assets/icons/EditIcon";
import { GENERATE_REPORT_ICON } from "../../../../assets/icons/DynamicIcons";

const CompletedInspectionDetails = () => {
  // Hooks
  const { inspectionId, userId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Fetch Inspection Details - Query
  const {
    data: inspectionDetails,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["completed-inspection-details", inspectionId],
    queryFn: () =>
      userInspectionsAPIs.getCompleteInspectionDetails({ inspectionId }),
  });

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

  if (isPending) {
    return <CompletedInspectionSkeleton />;
  }

  if (isError) {
    toast.error("Error fetching inspection details", {
      description: error?.message || "Something went wrong",
    });
  }
  return (
    <DetailPagesRoot className="!overflow-hidden !h-full !space-y-[24px]">
      <Group className="sm:!hidden !flex !justify-end">
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
      <CompletedInspection.Header
        heading={inspectionDetails?.reportName}
        createdAt={inspectionDetails?.creationDate}
        updatedAt={inspectionDetails?.updateDate}
      />

      {/* Content */}
      {inspectionDetails?.roomsData.map((room) => (
        <CompletedInspection.Root key={room._id}>
          <CompletedInspection.RoomHeader
            heading={room.name}
            roomImages={room.image}
            roomNotes={room.note}
          />

          <CompletedInspection.RoomElementRoot>
            {room?.elements?.length < 1 ? (
              <p className="text-[14px] text-gray-500">No Elements added.</p>
            ) : (
              room?.elements?.map((element) => (
                <CompletedInspection.RoomElement key={element._id}>
                  <CompletedInspection.RoomElementHeader
                    elementName={element.name}
                    elementImages={element?.image || []}
                    elementNote={element.note}
                  />
                  <CompletedInspection.ElementChecklist
                    checkListQuestions={element.checklist}
                  />
                </CompletedInspection.RoomElement>
              ))
            )}
          </CompletedInspection.RoomElementRoot>
        </CompletedInspection.Root>
      ))}

      {/* Signatures */}
      <CompletedInspection.SignaturesRoot>
        {inspectionDetails?.signaturesData.map((signature) => (
          <CompletedInspection.SignatureCard
            key={signature._id}
            signatoryName={signature.signatoryName}
            signatoryRole={signature.signatoryRole}
            signatureURL={signature.signatureURL ? signature.signatureURL : ""}
          />
        ))}
      </CompletedInspection.SignaturesRoot>
    </DetailPagesRoot>
  );
};

export default CompletedInspectionDetails;
