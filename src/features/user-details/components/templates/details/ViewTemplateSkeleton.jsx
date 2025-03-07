import { Skeleton } from "@mantine/core";
import DetailPagesRoot from "../../DetailPagesRoot";

const ViewTemplateSkeleton = () => {
  return (
    <DetailPagesRoot>
      <div className="flex flex-col gap-[8px]">
        <Skeleton width="350px" height={40} radius="4px" />
        <Skeleton width="190px" height={28} radius="4px" />
        <Skeleton width="190px" height={28} radius="4px" />
      </div>
      <div className="flex flex-col gap-[24px] md:mt-[32px] mt-[24px]">
        <Skeleton width="110px" height={30} radius="4px" />
        <div className="flex flex-col gap-[16px] md:h-[calc(100%-208px)] h-[calc(100%-187.97px)] overflow-auto">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <Skeleton key={index} width="100%" height={48} radius="8px" />
            ))}
        </div>
      </div>
    </DetailPagesRoot>
  );
};

export default ViewTemplateSkeleton;
