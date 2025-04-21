import { VIEW_DETAIL_ICON } from "../../../assets/icons/DynamicIcons";
import IconLink from "../../../components/ui/IconLink";

const ResponsiveRequestCard = ({ requestData }) => {
  return (
    <div className="p-[8px_12px] rounded-[8px] shadow-custom bg-white flex flex-col gap-[12px] md:hidden border border-[#DAEAFF]">
      <div className="flex w-full justify-between">
        <h2 className="xs:text-[16px] text-[14px] font-semibold text-dark-blue">
          {requestData.fullname}
        </h2>
        <IconLink
          id="view-restore-request-details"
          href={`details/${requestData._id}?type=TEMPLATE`}
          icon={<VIEW_DETAIL_ICON className="h-[16px]" />}
          label="View Details"
        />
      </div>
      <p className="text-[14px] font-regular text-[#6C727F]">
        {requestData.email}
      </p>
    </div>
  );
};

export default ResponsiveRequestCard;
