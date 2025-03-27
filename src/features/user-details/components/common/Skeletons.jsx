import { Skeleton } from "@mantine/core";
import DetailPagesRoot from "./../DetailPagesRoot";

/**
 * Skeleton for Inspection/Template Details Screen.
 *
 * This screen displays information skeleton about the inspection or template,
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

/**
 * Skeleton for Inspection/Template Room Details Screen.
 *
 * This screen displays information skeleton about the specific room of inspection or template,
 *
 * @returns {JSX.Element} The rendered details screen with skeleton of room details.
 */
export const RoomDetailsSkeleton = () => (
  <DetailPagesRoot className="!overflow-hidden">
    <div className="w-full h-full flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[16px] w-full">
        <Skeleton height={30} width={250} radius={2} />
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-2">
            <Skeleton height={22} width={100} radius={2} />
            <Skeleton height={48} width={355} radius={8} />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton height={22} width={70} radius={2} />
            <Skeleton height={48} width="100%" radius={8} />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton height={22} width={100} radius={2} />
            <Skeleton height={200} width="100%" radius={8} />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[16px] w-full">
        <div className="flex items-center justify-between">
          <Skeleton height={25} width={150} radius={2} />
          <Skeleton height={25} width={80} radius={2} />
        </div>
        <div className="flex flex-col gap-[16px]">
          <Skeleton height={48} width="100%" radius={8} />
          <Skeleton height={48} width="100%" radius={8} />
          <Skeleton height={30} width={175} radius={4} className="!mx-auto" />
          <Skeleton
            height={48}
            width={216}
            radius={4}
            className="!mx-auto !mt-[16px]"
          />
        </div>
      </div>
    </div>
  </DetailPagesRoot>
);
