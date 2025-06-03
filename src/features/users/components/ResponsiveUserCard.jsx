import {
  DELETE_ICON,
  VIEW_DETAIL_ICON,
} from "../../../assets/icons/DynamicIcons";
import Button from "../../../components/ui/Button";
import IconLink from "../../../components/ui/IconLink";
import UserSubscriptionCard from "./UserSubscriptionCard";

const ResponsiveUserCard = ({ userData: user, onClickDeleteUserButton }) => {
  return (
    <div className="w1150:hidden grid grid-cols-2 justify-between items-start gap-[20px] md:p-[12px_16px] p-[8px_12px] rounded-lg bg-white shadow-custom border border-[#cce2ff3d]">
      <div className="flex flex-col gap-[12px] justify-between">
        <p className="md:text-[18px] text-[16px] md:font-bold font-medium text-dark-blue">
          {user.fullname}
        </p>
        <UserSubscriptionCard subscriptionPlan={user.role} />
      </div>
      <div className="flex flex-col gap-[12px] justify-between items-end h-full">
        <div className="flex items-center justify-end gap-[8px]">
          <IconLink
            href={`/user-details/${user._id}`}
            icon={<VIEW_DETAIL_ICON className="h-[16px]" />}
            label="View Details"
            className="whitespace-nowrap !h-fit"
          />
          <Button
            id="delete-user-btn"
            buttonType="iconButton"
            icon={<DELETE_ICON className="text-[#FF613E]" />}
            type="button"
            onClick={onClickDeleteUserButton}
            className="!w-fit !h-fit !bg-transparent !p-0"
          />
        </div>
        <p className="font-bold text-[#6C727F]">
          ${user?.subscriptionAmount}
          {user.subscriptionType === "YEAR" ||
          user.subscriptionType === "YEARLY"
            ? "/year"
            : "/month"}
        </p>
      </div>
    </div>
  );
};

export default ResponsiveUserCard;
