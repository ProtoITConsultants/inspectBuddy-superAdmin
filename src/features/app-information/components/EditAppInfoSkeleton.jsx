import { Skeleton } from "@mantine/core";

const EditAppInfoSkeleton = () => {
  return (
    <div className="flex flex-col md:gap-8 gap-4 w-full max-w-[792px]">
      {/* App Details */}
      <div className="flex flex-col gap-2">
        <Skeleton height={30} width={100} radius={2} />
        <Skeleton height={172} width="100%" radius={8} />
      </div>

      {/* App Versions */}
      <div className="flex flex-col gap-2">
        <Skeleton height={30} width={100} radius={2} />
        <div className="flex flex-col gap-2 max-w-[285px]">
          <Skeleton height={25} width={80} radius={2} />
          <Skeleton height={42} width="100%" radius={8} />
        </div>
        <div className="flex flex-col gap-2 max-w-[285px]">
          <Skeleton height={25} width={80} radius={2} />
          <Skeleton height={42} width="100%" radius={8} />
        </div>
        <div className="flex flex-col gap-2 max-w-[285px]">
          <Skeleton height={25} width={80} radius={2} />
          <Skeleton height={42} width="100%" radius={8} />
        </div>
      </div>

      {/* Release Notes */}
      <div className="flex flex-col gap-2">
        <Skeleton height={30} width={170} radius={2} />
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} height={42} width="100%" radius={8} />
        ))}
        <Skeleton height={30} width={150} radius={2} />
      </div>

      {/* Contact */}
      <div className="flex flex-col gap-2">
        <Skeleton height={30} width={100} radius={2} />
        <div className="flex flex-col gap-2 max-w-[285px]">
          <Skeleton height={20} width={80} radius={2} />
          <Skeleton height={42} width="100%" radius={8} />
        </div>
        <div className="flex flex-col gap-2 max-w-[285px]">
          <Skeleton height={20} width={80} radius={2} />
          <Skeleton height={42} width="100%" radius={8} />
        </div>
      </div>
    </div>
  );
};

export default EditAppInfoSkeleton;
