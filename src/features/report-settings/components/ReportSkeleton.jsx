import { Skeleton } from "@mantine/core";

const ReportSkeleton = () => {
  return (
    <>
      <Skeleton height={22} width={120} radius="sm" />
      <Skeleton height={15} width={250} mt={8} radius="sm" />
      <Skeleton height={205} mt={8} radius="sm" />
      <Skeleton height={48} width={215} mt={32} radius="sm" />
    </>
  );
};

export default ReportSkeleton;
