import { Skeleton } from "@mantine/core";
import DetailPagesRoot from "../../DetailPagesRoot";
import EditPropertyForm from "./EditPropertyDetails";

const EditPropertySkeletion = () => {
  return (
    <DetailPagesRoot>
      <div className="w-full flex flex-col gap-[24px]">
        <Skeleton radius={"2px"} height={30} width={200} />

        <div className="flex flex-col gap-[8px] sm:w-fit w-full">
          <Skeleton radius={"2px"} height={30} width={100} />
          <Skeleton
            radius={"8px"}
            className="sm:!w-[460px] sm:!h-[218px] !w-full !h-[218px]"
          />
        </div>
        <div className="flex flex-col gap-[16px]">
          <EditPropertyForm.DoubleColumnGrid>
            <div className="flex flex-col gap-[8px]">
              <Skeleton radius={"2px"} height={12} width={60} />
              <Skeleton radius={"8px"} height={48} width="100%" />
            </div>
            <div className="flex flex-col gap-[8px]">
              <Skeleton radius={"2px"} height={12} width={60} />
              <Skeleton radius={"8px"} height={48} width="100%" />
            </div>
            <div className="flex flex-col gap-[8px]">
              <Skeleton radius={"2px"} height={12} width={60} />
              <Skeleton radius={"8px"} height={48} width="100%" />
            </div>
            <div className="flex flex-col gap-[8px]">
              <Skeleton radius={"2px"} height={12} width={60} />
              <Skeleton radius={"8px"} height={48} width="100%" />
            </div>
          </EditPropertyForm.DoubleColumnGrid>
          <EditPropertyForm.TripleColumnGrid>
            <div className="flex flex-col gap-[8px]">
              <Skeleton radius={"2px"} height={12} width={60} />
              <Skeleton radius={"8px"} height={48} width="100%" />
            </div>
            <div className="flex flex-col gap-[8px]">
              <Skeleton radius={"2px"} height={12} width={60} />
              <Skeleton radius={"8px"} height={48} width="100%" />
            </div>
            <div className="flex flex-col gap-[8px]">
              <Skeleton radius={"2px"} height={12} width={60} />
              <Skeleton radius={"8px"} height={48} width="100%" />
            </div>
          </EditPropertyForm.TripleColumnGrid>
          <EditPropertyForm.DoubleColumnGrid>
            <div className="flex flex-col gap-[8px]">
              <Skeleton radius={"2px"} height={12} width={60} />
              <Skeleton radius={"8px"} height={48} width="100%" />
            </div>
            <div className="flex flex-col gap-[8px]">
              <Skeleton radius={"2px"} height={12} width={60} />
              <Skeleton radius={"8px"} height={48} width="100%" />
            </div>
          </EditPropertyForm.DoubleColumnGrid>
          <EditPropertyForm.ActionButtons>
            <Skeleton
              radius={"8px"}
              height={48}
              className="sm:!w-[216px] !w-full"
            />
            <Skeleton
              radius={"8px"}
              height={48}
              className="sm:!w-[216px] !w-full"
            />
          </EditPropertyForm.ActionButtons>
        </div>
      </div>
    </DetailPagesRoot>
  );
};

export default EditPropertySkeletion;
