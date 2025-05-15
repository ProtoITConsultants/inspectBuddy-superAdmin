import { useParams } from "react-router";
import { userInspectionsAPIs } from "../../../../features/user-details/api/user-inspections";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import ViewTemplateSkeleton from "../../../../features/user-details/components/templates/details/ViewTemplateSkeleton";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import ViewInspection from "../../../../features/user-details/components/inspections/details/ViewInspectionDetails";
import { useEffect, useState } from "react";
import IconLink from "../../../../components/ui/IconLink";
import { EDIT_DETAILS_ICON } from "../../../../assets/icons/EditIcon";
import Button from "../../../../components/ui/Button";
import { GENERATE_REPORT_ICON } from "../../../../assets/icons/DynamicIcons";

const ViewInspectionDetails = () => {
  // Hooks
  const { inspectionId, userId } = useParams();

  // local States
  const [completedRooms, setCompletedRooms] = useState([]);
  const [inProgressRooms, setInProgressRooms] = useState([]);

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

  // Query To Fetch Inspection Details
  const {
    data: inspectionData,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ["inspectionDetailsQuery", inspectionId],
    queryFn: () =>
      userInspectionsAPIs.fetchInspectionDetails({
        inspectionId: inspectionId,
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (inspectionData) {
      const completedRooms = inspectionData?.rooms.filter(
        (room) => room.isCompleted
      );

      const inProgressRooms = inspectionData?.rooms.filter(
        (room) => !room.isCompleted
      );

      setCompletedRooms(completedRooms);
      setInProgressRooms(inProgressRooms);
    }

    // clean up
    return () => {
      setCompletedRooms([]), setInProgressRooms([]);
    };
  }, [inspectionData]);

  if (isError) {
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Inspection Details.`,
      duration: 3000,
    });
  }

  if (isPending) {
    return <ViewTemplateSkeleton />;
  }

  return (
    <DetailPagesRoot className="!overflow-hidden !h-full">
      <div className="md:hidden flex items-center sm:justify-center mb-4 gap-2 overflow-scroll">
        <IconLink
          href={`inspection-logs`}
          icon={
            <EDIT_DETAILS_ICON className="h-[16px] w-[16px] text-[#9EA3AE]" />
          }
          label="Inspection Logs"
          className="whitespace-nowrap"
        />
        <IconLink
          href={`edit-details`}
          icon={
            <EDIT_DETAILS_ICON className="h-[16px] w-[16px] text-[#9EA3AE]" />
          }
          label="Edit Details"
          className="whitespace-nowrap"
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
      <ViewInspection.Header
        templateName={inspectionData?.name}
        createdOn={inspectionData?.inspectionDate}
        updatedOn={inspectionData?.updatedAt}
      />
      {completedRooms.length > 0 && (
        <ViewInspection.RoomsList heading="Rooms Completed">
          {completedRooms.map((room) => (
            <ViewInspection.RoomCard
              key={room._id}
              roomName={room.name}
              isRoomCompleted={true}
              elementsCount={room?.elementCount}
            />
          ))}
        </ViewInspection.RoomsList>
      )}
      {inProgressRooms.length > 0 && (
        <ViewInspection.RoomsList heading="Rooms In-progress">
          {inProgressRooms.map((room) => (
            <ViewInspection.RoomCard
              key={room._id}
              roomName={room.name}
              isRoomCompleted={false}
              elementsCount={room?.elementCount}
            />
          ))}
        </ViewInspection.RoomsList>
      )}
    </DetailPagesRoot>
  );
};

export default ViewInspectionDetails;
