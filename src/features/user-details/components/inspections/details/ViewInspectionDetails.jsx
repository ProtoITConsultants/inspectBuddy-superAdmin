import { ARROW_RIGHT_ICON } from "../../../../../assets/icons/ArrowRight";
import { cn } from "../../../../../utils/cn";
import { convertDateFormate } from "../../../services/convertDateFormate";

const Header = ({ templateName, createdOn, updatedOn }) => {
  const formattedCreationDate = convertDateFormate.inspectionDetails(createdOn);
  const formattedUpdateDate = convertDateFormate.inspectionDetails(updatedOn);

  return (
    <div className="flex flex-col gap-[8px]">
      <h1 className="text-dark-blue font-bold md:text-[32px] text-[24px]">
        {templateName}
      </h1>
      <p className="text-[16px] text-dark-blue font-medium opacity-50">
        Created on: {formattedCreationDate}
      </p>
      <p className="text-[16px] text-dark-blue font-medium opacity-50">
        Last updated on: {formattedUpdateDate}
      </p>
    </div>
  );
};

const RoomsList = ({ children, heading }) => (
  <div className="flex flex-col gap-[24px] md:mt-[32px] mt-[24px] h-full">
    <h2 className="text-dark-blue text-[24px] font-bold">{heading}</h2>
    <div className="flex flex-col gap-[16px]">{children}</div>
  </div>
);

const RoomCard = ({ roomName, elementsCount, isRoomCompleted }) => (
  <div
    className={cn(
      "flex items-center justify-between p-[12px_16px] rounded-[8px] border",
      {
        "border-[#CCE2FF] bg-[#F3F8FF]": !isRoomCompleted,
        "border-[#b0d4a3] bg-[#E8F3E4]": isRoomCompleted,
      }
    )}
  >
    <p className="text-[16px] text-dark-blue font-medium">{roomName}</p>
    <div className="flex items-center md:gap-[50px] gap-[32px]">
      <p className="text-[14px] text-[#6C727F] font-medium">
        {elementsCount > 1
          ? `${elementsCount} Elements`
          : `${elementsCount} Element`}
      </p>
      <ARROW_RIGHT_ICON className="text-[#6c727f]" />
    </div>
  </div>
);

const ViewInspection = {
  Header,
  RoomsList,
  RoomCard,
};

export default ViewInspection;
