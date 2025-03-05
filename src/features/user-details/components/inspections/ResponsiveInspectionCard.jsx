import { convertDateFormate } from "../../services/convertDateFormate";
import InspectionStatusCard from "./InspectionStatusCard";
import Button from "../../../../components/ui/Button";
import { GENERATE_REPORT_ICON } from "../../../../assets/icons/DynamicIcons";
import { Link } from "react-router";

const ResponsiveInspectionCard = ({ inspectionData }) => {
  return (
    <Link
      to={`details/${inspectionData._id}`}
      className="rounded-[8px] w-full border border-[#e4f0ff] shadow-custom flex gap-[18px]"
    >
      <img
        src={inspectionData?.property?.image?.url}
        alt="propert image"
        className="rounded-l-[8px] object-cover lg:w-[120px] lg:h-[125px] w-[100px] min-h-[100px] h-full"
      />

      <div className="flex flex-col justify-between w-full gap-[8px] md:py-[12px] md:pr-[12px] py-[8px] pr-[10px]">
        <div className="flex w-full justify-between gap-[12px]">
          <h2 className="font-bold lg:text-[16px] md:text-[14px] text-darkBlue capitalize leading-none">
            {inspectionData?.name}
          </h2>
          <Button
            id="generate-report-btn"
            buttonType="iconButton"
            label="Generate Report"
            icon={<GENERATE_REPORT_ICON className="text-[#9EA3AE]" />}
            type="button"
            onClick={() => {}}
            disabled={!inspectionData?.isInspectionCompleted}
            className="flex items-center !gap-[8px] !p-[8px_10px] border-[1.5px] rounded-[8px] !border-[#E5E6EB] w-fit !text-dark-blue !text-[12px] h-fit !font-medium"
          />
        </div>

        <div className="flex w-full justify-between items-end gap-[12px]">
          <InspectionStatusCard
            status={
              inspectionData?.isDraft
                ? "drafted"
                : inspectionData?.isInspectionCompleted
                ? "completed"
                : "in progress"
            }
          />
          <p className="text-[#6C727F] lg:text-[14px] text-[12px]">
            Updated on
            <br />
            {convertDateFormate.localeDate(inspectionData?.updatedAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ResponsiveInspectionCard;
