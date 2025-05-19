import { Skeleton } from "@mantine/core";
import DetailPagesRoot from "../DetailPagesRoot";

const CompletedInspectionSkeleton = () => {
  return (
    <DetailPagesRoot className="!overflow-hidden !h-full">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-2">
          <Skeleton
            height={40}
            width="100%"
            radius="md"
            className="max-w-[440px]"
          />
          <Skeleton
            height={26}
            width="100%"
            radius="md"
            className="max-w-[190px]"
          />
          <Skeleton
            height={26}
            width="100%"
            radius="md"
            className="max-w-[190px]"
          />
        </div>

        <div className="flex flex-col gap-[24px]">
          <Skeleton height={200} width="100%" radius="md" />
          <Skeleton height={200} width="100%" radius="md" />
        </div>
      </div>
    </DetailPagesRoot>
  );
};

export default CompletedInspectionSkeleton;
