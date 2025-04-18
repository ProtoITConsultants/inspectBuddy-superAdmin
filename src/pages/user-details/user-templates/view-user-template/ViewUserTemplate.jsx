import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { userDetailsAPIs } from "../../../../features/user-details/api";
import { toast } from "sonner";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import ViewTemplate from "../../../../features/user-details/components/templates/details/ViewUserTemplate";
import ViewTemplateSkeleton from "../../../../features/user-details/components/templates/details/ViewTemplateSkeleton";
const ViewUserTemplate = () => {
  // Hooks
  const { templateId } = useParams();

  // Query To Fetch Template Details
  const {
    data: templateData,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ["templateDetailsQuery", templateId],
    queryFn: () =>
      userDetailsAPIs.fetchTemplateDetails({ templateId: templateId }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isError) {
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Template Details.`,
      duration: 3000,
    });
  }

  if (isPending) {
    return <ViewTemplateSkeleton />;
  }

  return (
    <DetailPagesRoot className="!overflow-hidden">
      <ViewTemplate.Header
        templateName={templateData?.name}
        createdOn={templateData?.createdAt}
        updatedOn={templateData?.updatedAt}
      />
      <ViewTemplate.RoomsRoot>
        {templateData?.rooms?.length > 0 ? (
          templateData?.rooms?.map((room) => (
            <ViewTemplate.RoomCard
              key={room._id}
              roomName={room.name}
              elementsCount={room.elementCount}
            />
          ))
        ) : (
          <p className="text-[16px] text-dark-gray text-center mx-auto max-w-[400px]">
            No Rooms Added for this Template. Please Click on the{" "}
            <b>Edit Details</b> button and Start Adding Rooms!
          </p>
        )}
      </ViewTemplate.RoomsRoot>
    </DetailPagesRoot>
  );
};

export default ViewUserTemplate;
