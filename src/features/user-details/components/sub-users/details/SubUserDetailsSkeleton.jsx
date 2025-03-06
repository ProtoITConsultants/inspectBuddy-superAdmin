import { Skeleton } from "@mantine/core";
import DetailPagesRoot from "../../DetailPagesRoot";
import { UserDetailsGrid } from "./ViewDetailsForm";

const SubUserDetailsSkeleton = () => {
  return (
    <DetailPagesRoot>
      <UserDetailsGrid>
        <div className="flex flex-col gap-[4px]">
          <Skeleton width="150px" height={24} radius="2px" />
          <Skeleton width="100%" height={48} radius="4px" />
        </div>
        <div className="flex flex-col gap-[4px]">
          <Skeleton width="150px" height={24} radius="2px" />
          <Skeleton width="100%" height={48} radius="4px" />
        </div>
        <div className="flex flex-col gap-[4px]">
          <Skeleton width="150px" height={24} radius="2px" />
          <Skeleton width="100%" height={48} radius="4px" />
        </div>
        <div className="flex flex-col gap-[4px]">
          <Skeleton width="150px" height={24} radius="2px" />
          <Skeleton width="100%" height={48} radius="4px" />
        </div>
        <div className="flex flex-col gap-[4px] col-span-2">
          <Skeleton width="250px" height={24} radius="2px" />
          <Skeleton width="100%" height={48} radius="4px" />
        </div>
        <Skeleton
          width="100%"
          height={24}
          radius="4px"
          className="col-span-2"
        />
        <Skeleton
          width="100%"
          height={24}
          radius="4px"
          className="col-span-2"
        />
      </UserDetailsGrid>
    </DetailPagesRoot>
  );
};

export default SubUserDetailsSkeleton;
