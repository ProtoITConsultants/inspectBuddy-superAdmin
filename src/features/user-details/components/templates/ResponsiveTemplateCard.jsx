import { Link } from "react-router";
import TemplateCategoryCard from "./TemplateCategoryCard";
import { convertDateFormate } from "../../services/convertDateFormate";

const ResponsiveTemplateCard = ({ templateData, onCloneTemplate }) => {
  return (
    <div className="flex flex-col gap-[12px] shadow-sm p-[8px_12px] rounded-[8px] border-[1.5px] border-[#E4F0FF]">
      <div className="flex justify-between">
        <h2 className="text-darkBlue font-semibold text-[14px]">
          {templateData.name}
        </h2>
        <div className="flex items-center gap-[8px]">
          <Link
            to={`details/${templateData._id}`}
            className="px-[16px] py-[10px] rounded-[8px] border-[#E5E6EB] border-[1.5px] text-darkBlue font-medium text-[14px] w-fit"
          >
            <span>View</span>
          </Link>
          <button
            className={`border-[#E5E6EB] border-[1.5px] hover:bg-[#E5e6eb] px-[16px] py-[10px] rounded-[8px] flex items-center justify-center gap-[8px] font-medium text-[14px] w-fit h-full`}
            type="button"
            onClick={onCloneTemplate}
          >
            <p className={`text-darkBlue text-[14px] font-medium leading-none`}>
              Clone
            </p>
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        <TemplateCategoryCard
          templateType={
            templateData.isDefault
              ? "default"
              : templateData.isDraft
              ? "draft"
              : "published"
          }
        />
        <p className="sm:text-[14px] text-[12px] text-[#6C727F]">
          Updated on
          <br />
          {convertDateFormate.internationalDate(templateData.updatedAt)}
        </p>
      </div>
    </div>
  );
};

export default ResponsiveTemplateCard;
