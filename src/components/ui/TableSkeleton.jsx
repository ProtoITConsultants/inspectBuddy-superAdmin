import { Skeleton } from "@mantine/core";

const TableSkeleton = ({ itemsLength = 2, skeletonHeight = 48 }) => {
  return Array(itemsLength)
    .fill(0)
    .map((_, index) => (
      <Skeleton key={index} height={skeletonHeight} radius="sm" />
    ));
};

export default TableSkeleton;
