import { useQuery } from "@tanstack/react-query";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import FinalizeInspection from "../../../../features/user-details/components/inspections/details/FinalizeInspection";
import { userInspectionsAPIs } from "../../../../features/user-details/api/user-inspections";
import { useParams } from "react-router";
import { toast } from "sonner";
import { convertDateFormate } from "../../../../features/user-details/services/convertDateFormate";
import { CALENDAR_ICON } from "./../../../../assets/icons/CalendarIcon";
import { ARROW_RIGHT_ICON } from "../../../../assets/icons/ArrowRight";

const FinalizeUserInspection = () => {
  // Hook
  const { inspectionId } = useParams();

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["finalize-user-inspection-query"],
    queryFn: () =>
      userInspectionsAPIs.fetchInspectionDetails({
        inspectionId,
      }),
  });

  if (isError) {
    toast.error("Could not fetch inspection details", {
      description: error?.message || "Something went wrong",
    });
  }

  if (isPending) {
    return <div>Loading....</div>;
  }

  return (
    <DetailPagesRoot className="!overflow-hidden !h-full">
      <FinalizeInspection.Root>
        <FinalizeInspection.Header heading="Finalising the Inspection" />
        <FinalizeInspection.ReportSection>
          <FinalizeInspection.TextField
            label="Report Name"
            value={data?.name}
            className="sm:col-span-1 col-span-2"
          />
          <FinalizeInspection.IconField
            label="Selected Property"
            value={data?.property?.name}
            icon={<ARROW_RIGHT_ICON className="text-[#9EA3AE] rotate-90" />}
            className="sm:col-span-1 col-span-2"
          />
          <FinalizeInspection.IconField
            label="Date of Inspection"
            className="col-span-2"
            icon={<CALENDAR_ICON className="text-[#9EA3AE]" />}
            value={convertDateFormate.inspectionDetails(data?.inspectionDate)}
          />
        </FinalizeInspection.ReportSection>
        <FinalizeInspection.SignatureSection>
          <FinalizeInspection.TextField
            label="Name"
            value={data?.inspectorName}
            className="sm:col-span-1 col-span-2"
          />
          <FinalizeInspection.IconField
            label="Role"
            value={data?.inspectorRole}
            icon={<ARROW_RIGHT_ICON className="text-[#9EA3AE] rotate-90" />}
            className="sm:col-span-1 col-span-2"
          />
          <FinalizeInspection.CollaboratorsSection>
            {data?.collaborators?.length < 1 ? (
              <p className="text-[12px] text-gray-500">
                No Collaborators added yet.
              </p>
            ) : (
              data?.collaborators?.map((collaborator) => (
                <FinalizeInspection.CollaboratorField
                  key={collaborator._id}
                  name={collaborator?.collaboratorName}
                  role={collaborator?.collaboratorRole}
                  className="bg-[#EEEEEE] border-[#dedede]"
                />
              ))
            )}
          </FinalizeInspection.CollaboratorsSection>
        </FinalizeInspection.SignatureSection>
      </FinalizeInspection.Root>
    </DetailPagesRoot>
  );
};

export default FinalizeUserInspection;
