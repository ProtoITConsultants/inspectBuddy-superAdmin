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
        templateName="Residential Template"
        createdOn="Dec 9, 2024"
        updatedOn="Dec 11, 2024"
      />
      <ViewTemplate.RoomsRoot>
        {templateData?.map((room) => (
          <ViewTemplate.RoomCard
            key={room._id}
            roomName={room.name}
            elementsCount={room.elementCount}
          />
        ))}
      </ViewTemplate.RoomsRoot>
    </DetailPagesRoot>
  );
};

export default ViewUserTemplate;
