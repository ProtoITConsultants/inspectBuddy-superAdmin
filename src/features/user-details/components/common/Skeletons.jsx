import { Skeleton } from "@mantine/core";
import DetailPagesRoot from "./../DetailPagesRoot";

/**
 * Skeleton for Inspection/Template Details Screen.
 *
 * This screen displays detailed information about the inspection or template,
 * including room cards that show individual room details and their statuses.
 *
 * @returns {JSX.Element} The rendered details screen with skeleton room cards.
 */
export const InspectionRoomsSkeleton = () => (
  <DetailPagesRoot>
    <div className="flex flex-col gap-[24px] h-full">
      <div className="flex items-center justify-between">
        <Skeleton radius={4} width={100} height={30} />
        <Skeleton radius={4} width={100} height={30} />
      </div>
      <div className="flex flex-col gap-[16px] h-fit">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} radius={8} width="100%" height={48} />
        ))}
      </div>
    </div>
  </DetailPagesRoot>
);
