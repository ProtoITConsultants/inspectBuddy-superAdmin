import { useParams } from "react-router";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import { useQuery } from "@tanstack/react-query";
import { userDetailsAPIs } from "../../../../features/user-details/api";
import { toast } from "sonner";

import {
  AssignedCategoriesSection,
  SwitchItem,
  UserDetailsGrid,
  UserDetailsItem,
} from "../../../../features/user-details/components/sub-users/details/ViewDetailsForm";
import SubUserDetailsSkeleton from "../../../../features/user-details/components/sub-users/details/subUserDetailsSkeleton";

const ViewSubUser = () => {
  // Hooks
  const { subUserId } = useParams();

  // Query to fetch user Details
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["subUserDetailsQuery", subUserId],
    queryFn: () =>
      userDetailsAPIs.fetchSubUserDetails({ subUserId: subUserId }),
  });

  if (isError) {
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Sub User's Details.`,
      duration: 3000,
    });
  }

  if (isPending) {
    return <SubUserDetailsSkeleton />;
  }

  return (
    <DetailPagesRoot>
      <UserDetailsGrid>
        <UserDetailsItem title="Name" value={data.subUser.fullname} />
        <UserDetailsItem title="Email" value={data.subUser.email} />
        <UserDetailsItem title="Address" value={data.subUser.address} />
        <UserDetailsItem
          title="Phone Number"
          value={"+" + data.subUser.phoneNumber}
        />
        <AssignedCategoriesSection
          assignedCategories={data.subUser.assignedCategories}
        />
        <SwitchItem
          label="Allow user to start inspection from scratch"
          checked={data.subUser.canInspectFromScratch}
          disabled
        />
        <SwitchItem
          label="Allow user to create question for inspection"
          checked={data.subUser.canCreateInspectionQuestions}
          disabled
        />
      </UserDetailsGrid>
    </DetailPagesRoot>
  );
};

export default ViewSubUser;
