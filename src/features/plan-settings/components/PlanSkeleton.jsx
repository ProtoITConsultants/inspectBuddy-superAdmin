import { Skeleton } from "@mantine/core";

const PlanSkeleton = () => {
  return (
    <div className="mt-[24px] flex flex-col md:gap-[32px] sm:gap-[24px] gap-[20px]">
      <div className="flex flex-col md:gap-[20px] gap[16px]">
        <Skeleton height={30} width={140} radius="sm" />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[16px]">
          <Skeleton height={48} radius="sm" />
          <Skeleton height={48} radius="sm" />
        </div>
      </div>
      <div className="flex flex-col md:gap-[20px] gap[16px]">
        <Skeleton height={30} width={275} radius="sm" />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[16px]">
          <Skeleton height={48} radius="sm" />
          <Skeleton height={48} radius="sm" />
          <Skeleton height={48} radius="sm" className="col-span-2" />
        </div>
      </div>
      <div className="flex flex-col md:gap-[20px] gap[16px]">
        <Skeleton height={30} width={220} radius="sm" />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[16px]">
          <Skeleton height={48} radius="sm" />
          <Skeleton height={48} radius="sm" />
        </div>
      </div>
      <div className="flex flex-col md:gap-[20px] gap[16px]">
        <Skeleton height={30} width={130} radius="sm" />
        <Skeleton height={48} radius="sm" />
      </div>
      <div className="flex flex-col md:gap-[20px] gap[16px]">
        <Skeleton height={48} radius="sm" />
      </div>
    </div>
  );
};

export default PlanSkeleton;
