import { Link } from "react-router";
import { convertDateFormate } from "../../services/convertDateFormate";
import { DEFAULT_PROPERTY_ICON } from "../../../../assets/icons/DefaultPropertyIcon";

const ResponsivePropertyCard = ({ propertyData }) => {
  return (
    <Link
      to={`details/${propertyData._id}`}
      className={`flex w-full rounded-[8px] md:h-[120px] h-[85px] bg-white border-[1.5px] border-[#E4F0FF] gap-[24px] items-center shadow-sm`}
    >
      {propertyData?.image?.url ? (
        <img
          src={propertyData?.image?.url}
          alt="property"
          className="md:w-[120px] w-[85px] h-full object-cover rounded-l-[8px]"
        />
      ) : (
        <div>
          <DEFAULT_PROPERTY_ICON className="md:h-[120px] h-[85px] w-auto" />
        </div>
      )}

      <div className="flex flex-col justify-between md:pr-[20px] pr-[10px] md:py-[16px] py-[8px] h-full w-full">
        <div className="w-full">
          <h2 className="text-dark-blue font-semibold text-[14px]">
            {propertyData.address.street + ", " + propertyData.name}
          </h2>
          <p className="text-[#6C727F] text-[12px]">
            {propertyData?.address?.city +
              ", " +
              propertyData?.address?.state +
              ", " +
              propertyData?.address?.zip +
              ", " +
              propertyData?.address?.country}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-medium text-primary">
            {propertyData.category.value}
          </p>
          <p className="text-[14px] text-[#6C727F]">
            {convertDateFormate.localeDate(propertyData.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ResponsivePropertyCard;
