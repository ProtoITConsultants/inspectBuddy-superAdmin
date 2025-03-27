import { useParams } from "react-router";
import { userInspectionsAPIs } from "../../../../features/user-details/api/user-inspections";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import ViewTemplateSkeleton from "../../../../features/user-details/components/templates/details/ViewTemplateSkeleton";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import ViewInspection from "../../../../features/user-details/components/inspections/details/ViewInspectionDetails";
import { useEffect, useState } from "react";

const ViewInspectionDetails = () => {
  // Hooks
  const { inspectionId } = useParams();

  // local States
  const [completedRooms, setCompletedRooms] = useState([]);
  const [inProgressRooms, setInProgressRooms] = useState([]);

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
