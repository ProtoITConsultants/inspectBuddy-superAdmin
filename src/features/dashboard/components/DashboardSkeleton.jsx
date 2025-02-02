import { Skeleton } from "@mantine/core";

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex items-center gap-[25px]">
        {Array(4)
          .fill("")
          .map((_, index) => (
            <Skeleton
              height={210}
              radius={8}
              key={index}
              className="w-full max-w-[330px] min-w-[250px] flex-1"
            />
          ))}
      </div>
      <div className="grid grid-cols-2 gap-[20px] mt-[20px] max-w-[1395px] w-full">
        <Skeleton height={345} radius={8} className="w-full" />
        <Skeleton height={246} radius={8} className="w-full" />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
