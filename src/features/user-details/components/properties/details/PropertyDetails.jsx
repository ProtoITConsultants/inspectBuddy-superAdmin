import { Link } from "react-router";
import { EDIT_DETAILS_ICON } from "../../../../../assets/icons/EditIcon";
import Button from "../../../../../components/ui/Button";
import { DELETE_ICON } from "../../../../../assets/icons/DynamicIcons";

export const PropertyDetailsContainer = ({ children }) => {
  return (
    <div className="w-full max-w-[890px] lg:border-[1.5px] border-[#E4F0FF] rounded-[8px] pb-[24px]">
      {children}
    </div>
  );
};

export const PropertyDetailsHeader = ({ propertyImageURL }) => {
  return (
    <img
      src={propertyImageURL}
      alt="property"
      className="w-full md:h-[310px] h-[145px] object-cover object-center rounded-t-[8px]"
    />
  );
};

export const PropertyDetailsBody = ({ children }) => {
  return (
    <div className="flex flex-col gap-[24px] lg:mt-[32px] mt-[16px]">
      {children}
    </div>
  );
};

export const PropertyDetails = ({ propertyDetails }) => {
  return (
    <div className="md:flex items-center justify-between lg:px-[32px]">
      <div className="text-darkBlue">
        <h1 className="lg:text-[32px] md:text-[28px] text-[20px] font-bold">
          {propertyDetails?.name}
        </h1>
        <p className="opacity-50 md:text-[16px] text-[14px]">
          {`${propertyDetails?.address?.unit}, ${propertyDetails?.address?.street}, ${propertyDetails?.address?.city}, ${propertyDetails?.address?.state}, ${propertyDetails?.address?.country}`}
        </p>
      </div>

      <div className="flex md:gap-[8px] gap-[16px] md:mt-0 mt-[24px]">
        <Link
          to={`edit-property`}
          className="px-[10px] py-[8px] rounded-[8px] border-[1.5px] border-[#cce2ff] flex items-center justify-center gap-[8px] md:w-fit w-full"
        >
          <EDIT_DETAILS_ICON className="text-[#9EA3AE] h-[22px] w-[22px]" />
          <p className="text-dark-blue font-medium text-[14px]">Edit Details</p>
        </Link>
        <Button
          id="delete-report-btn"
          label="Delete Property"
          buttonType="iconButton"
          icon={<DELETE_ICON className="text-[#FF613E] h-[22px] w-[22px]" />}
          type="button"
          onClick={() => {}}
          className="flex items-center !gap-[8px] !p-[8px_10px] border-[1.5px] rounded-[8px] !border-[#FF613E] w-fit !text-[#FF613E] !text-[14px] h-fit !font-medium"
        />
      </div>
    </div>
  );
};

export const PropertyDetailsItem = ({ label, value, className }) => {
  return (
    <div className={`flex flex-col gap-[12px] ${className ? className : null}`}>
      <p className="text-[16px] text-darkBlue font-medium opacity-50 leading-none">
        {label}
      </p>
      <p className="text-[16px] text-darkBlue font-bold leading-none">
        {value}
      </p>
    </div>
  );
};

export const PropertyDetailsGrid = ({ children }) => {
  return (
    <div className="lg:mx-[32px] border-[1.5px] border-[#cce2ff] rounded-[8px] grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-[16px] gap-y-[24px] lg:p-[24px] md:p-[18px] p-[12px]">
      {children}
    </div>
  );
};

export const InspectionStatsItem = ({ label, value, className }) => {
  return (
    <div className={`flex flex-col gap-[12px] ${className}`}>
      <p className="text-[14px] text-darkBlue font-medium leading-none">
        {label}
      </p>
      <p
        className={`${
          typeof value === "string"
            ? " text-[16px] text-gray-dark font-normal"
            : "lg:text-[32px] md:text-[24px] text-[20px] text-darkBlue font-bold"
        }  leading-none`}
      >
        {value}
      </p>
    </div>
  );
};

export const PropertyInspectionStats = ({
  totalInspections,
  daysSinceLastInspection,
  daysSinceLastCompletedInspection,
}) => {
  return (
    <div className="border-y-[1.5px] border-t-[#cce2ff] border-b-[#cce2ff] lg:px-[32px] py-[24px] grid md:grid-cols-9 grid-cols-2 md:gap-[24px] gap-[16px]">
      <InspectionStatsItem
        label="Total Inspections"
        value={totalInspections}
        className={"md:col-span-3 col-span-1"}
      />
      <InspectionStatsItem
        label="Days Since Last Inspection"
        value={daysSinceLastInspection}
        className={"md:col-span-3 col-span-1"}
      />
      <InspectionStatsItem
        label="Days Since Last Completed Inspection"
        value={daysSinceLastCompletedInspection}
        className={"md:col-span-3 col-span-2"}
      />
    </div>
  );
};
