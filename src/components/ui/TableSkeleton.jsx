import { Skeleton } from "@mantine/core";

const TableSkeleton = () => {
  return Array(4)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="border-b-[1.5px] border-[#E4F0FF] pb-[24px]">
        <Skeleton height={68} radius="sm" />
      </div>
    ));
};

export default TableSkeleton;
