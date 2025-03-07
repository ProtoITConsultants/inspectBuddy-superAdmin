import { ARROW_RIGHT_ICON } from "../../../../../assets/icons/ArrowRight";

const Header = ({ templateName, createdOn, updatedOn }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <h1 className="text-dark-blue font-bold md:text-[32px] text-[24px]">
        {templateName}
      </h1>
      <p className="text-[16px] text-dark-blue font-medium opacity-50">
        Created on: {createdOn}
      </p>
      <p className="text-[16px] text-dark-blue font-medium opacity-50">
        Last updated on: {updatedOn}
      </p>
    </div>
  );
};

const RoomsRoot = ({ children }) => (
  <div className="flex flex-col gap-[24px] md:mt-[32px] mt-[24px] h-full">
    <h2 className="text-dark-blue text-[24px] font-bold">Rooms</h2>
    <div className="flex flex-col gap-[16px] md:h-[calc(100%-208px)] h-[calc(100%-187.97px)] overflow-auto">
      {children}
    </div>
  </div>
);

const RoomCard = ({ roomName, elementsCount }) => (
  <div className="flex items-center justify-between p-[12px_16px] rounded-[8px] border border-[#CCE2FF] bg-[#F3F8FF]">
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

const ViewTemplate = {
  Header,
  RoomsRoot,
  RoomCard,
};

export default ViewTemplate;
