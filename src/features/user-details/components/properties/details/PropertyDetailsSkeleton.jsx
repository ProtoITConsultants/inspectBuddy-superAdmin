import { Skeleton } from "@mantine/core";
import DetailPagesRoot from "../../DetailPagesRoot";
import { PropertyDetailsBody } from "./PropertyDetails";

const PropertyDetailsSkeleton = () => {
  return (
    <DetailPagesRoot className="max-w-[892px]">
      <Skeleton
        width={"100%"}
        radius={"8px"}
        className="lg:!h-[310px] !h-[200px]"
      />
      <PropertyDetailsBody>
        <div className="md:flex items-center justify-between lg:px-[32px]">
          <Skeleton height={75} width={280} radius={"8px"} />
          <Skeleton height={75} width={290} radius={"8px"} />
        </div>
        <div className="lg:px-[32px]">
          <Skeleton height={165} width="100%" radius={"8px"} />
        </div>
        <Skeleton height={108} width="100%" radius={"8px"} />
      </PropertyDetailsBody>
    </DetailPagesRoot>
  );
};

export default PropertyDetailsSkeleton;
