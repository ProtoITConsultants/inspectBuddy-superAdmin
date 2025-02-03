import ReportsGeneratedIcon from "../../../assets/icons/reports-generated.svg";
import PropertiesIcon from "../../../assets/icons/dashboard-properties.svg";
import InspectionsDoneIcon from "../../../assets/icons/inspections-done.svg";

const Root = ({ children }) => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-[20px] mt-[20px] max-w-[1395px] w-full">
      {children}
    </div>
  );
};

const InspectionsSection = ({ children }) => {
  return (
    <div className="sm:border-[1.5px] border-[#CCE2FF] rounded-[8px] sm:p-[24px] flex flex-col gap-[24px]">
      <InspectionSectionHeader />
      <div className="grid grid-cols-2 sm:gap-[24px] gap-[16px]">
        {children}
      </div>
    </div>
  );
};

const InspectionSectionHeader = () => {
  return (
    <div className="lg:block flex flex-col gap-[4px]">
      <h1 className="lg:text-[24px] text-[20px] font-bold text-darkBlue">
        OverView
      </h1>
      <div className="flex lg:flex-row flex-col text-[14px] lg:gap-[8px] gap-[2px]">
        <p className="opacity-70 text-darkBlue">
          Inspections & Reports overview!
        </p>
      </div>
    </div>
  );
};

const InspectionsOverview = ({ inspectionsDone }) => {
  return (
    <div className="border-[1.5px] border-[#CCE2FF] rounded-[8px] sm:p-[24px] p-[12px] flex flex-col gap-[16px]">
      <img
        src={InspectionsDoneIcon}
        alt="inspections-icon"
        className="max-w-[56px]"
      />
      <div className="flex flex-col gap-[12px] text-darkBlue">
        <p className="font-medium md:text-[16px] text-[14px]">
          Inspections Done
        </p>
        <p className="font-bold xl:text-[32px] md:text-[28px] sm:text-[24px] text-[20px]">
          {inspectionsDone}
        </p>
      </div>
    </div>
  );
};

const ReportsGeneratedOverview = ({ reportsGenerated }) => {
  return (
    <div className="border-[1.5px] border-[#CCE2FF] rounded-[8px] sm:p-[24px] p-[12px] flex flex-col gap-[16px]">
      <img
        src={ReportsGeneratedIcon}
        alt="reports-icon"
        className="max-w-[56px]"
      />
      <div className="flex flex-col gap-[12px] text-darkBlue">
        <p className="font-medium md:text-[16px] text-[14px]">
          Reports Generated
        </p>
        <p className="font-bold xl:text-[32px] md:text-[28px] sm:text-[24px] text-[20px]">
          {reportsGenerated}
        </p>
      </div>
    </div>
  );
};

// Properties Section - Components
const PropertiesSection = ({ propertiesData }) => {
  return (
    <div className="border-[1.5px] border-[#CCE2FF] rounded-[8px] sm:p-[24px] p-[16px_12px] flex flex-col gap-[24px] h-fit">
      <div className="flex md:flex-row flex-col md:gap-[24px] gap-[12px] md:justify-between md:items-end">
        <div className="flex gap-[16px]">
          <img src={PropertiesIcon} alt="properties-icon" />
          <div className="flex flex-col md:justify-between gap-[4px] text-darkBlue">
            <h2 className="font-bold xl:text-[32px] md:text-[28px] sm:text-[24px] text-[20px]">
              {propertiesData.totalProperties}
            </h2>
            <p className="font-medium md:text-[16px] text-[14px] opacity-70">
              Total Properties added by all users
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#F3F8FF] rounded-[8px] p-[16px] flex items-center gap-[12px] justify-between">
        <div className="text-center text-darkBlue w-[calc(50%-1px)]">
          <h2 className="font-bold lg:text-[24px] md:[text-18px] text-[16px]">
            {propertiesData.inspectedProperties}
          </h2>
          <p className="font-medium md:text-[16px] sm:text-[14px] text-[12px] opacity-70">
            Inspected
          </p>
        </div>
        <div className="w-[2px] bg-[#CCE2FF] h-[48px]"></div>
        <div className="text-center text-darkBlue w-[calc(50%-1px)]">
          <h2 className="font-bold lg:text-[24px] md:[text-18px] text-[16px]">
            {propertiesData.nonInspectedProperties}
          </h2>
          <p className="font-medium md:text-[16px] sm:text-[14px] text-[12px] opacity-70">
            Non-Inspected
          </p>
        </div>
      </div>
    </div>
  );
};

const Analytics = {
  Root,
  InspectionsSection,
  InspectionsOverview,
  ReportsGeneratedOverview,
  PropertiesSection,
};

export default Analytics;
