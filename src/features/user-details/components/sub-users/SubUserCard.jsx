import { Link } from "react-router";
import AssignedCategoriesCard from "./AssignedCategoriesCard";
import { DELETE_ICON } from "../../../../assets/icons/DynamicIcons";

const SubUserCard = ({ memberData, totalCategories }) => {
  return (
    <div className="flex flex-col justify-between md:pr-[20px] p-[12px] w-full rounded-[8px] bg-white gap-[12px] items-center shadow-custom">
      <div className="w-full flex justify-between">
        <h2 className="text-dark-blue font-semibold text-[14px]">
          {memberData.userName}
        </h2>

        <div className="flex items-center justify-center gap-[8px]">
          <Link
            to={`details/${memberData._id}`}
            className="px-[16px] py-[10px] rounded-[8px] border-[#E5E6EB] border-[1.5px] text-dark-blue font-medium text-[14px] w-fit"
          >
            <span>View Details</span>
          </Link>
          <button type="button" onClick={() => {}}>
            <DELETE_ICON className="text-[#8885AA]" />
          </button>
        </div>
      </div>
      <div className="w-full flex justify-between items-end">
        <AssignedCategoriesCard
          assignedCategories={memberData.categoriesAssigned}
          totalCategories={totalCategories}
        />
        <p className="text-[14px] text-[#6C727F]">
          Last Online:&nbsp;{memberData.lastOnline}
        </p>
      </div>
    </div>
  );
};

export default SubUserCard;
