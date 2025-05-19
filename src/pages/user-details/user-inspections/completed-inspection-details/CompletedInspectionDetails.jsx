import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { userInspectionsAPIs } from "./../../../../features/user-details/api/user-inspections";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import CompletedInspection from "../../../../features/user-details/components/inspections/details/CompletedInspectionDetails";
import { toast } from "sonner";

const CompletedInspectionDetails = () => {
  // Hooks
  const { inspectionId } = useParams();

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

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    toast.error("Error fetching inspection details", {
      description: error?.message || "Something went wrong",
    });
  }
  return (
    <DetailPagesRoot className="!overflow-hidden !h-full !space-y-[24px]">
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
                    elementImageURL={
                      element.elementImage ? element.elementImage : ""
                    }
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
