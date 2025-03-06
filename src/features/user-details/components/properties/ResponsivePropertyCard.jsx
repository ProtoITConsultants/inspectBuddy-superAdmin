import { Link } from "react-router";
import { convertDateFormate } from "../../services/convertDateFormate";

const ResponsivePropertyCard = ({ propertyData }) => {
  return (
    <Link
      to={`details/${propertyData._id}`}
      className={`flex w-full rounded-[8px] md:h-[120px] h-[85px] bg-white border-[1.5px] border-[#E4F0FF] gap-[24px] items-center shadow-sm`}
    >
      <img
        src={propertyData.image.url}
        alt="property"
        className="md:w-[120px] w-[85px] h-full object-cover rounded-l-[8px]"
      />

      <div className="flex flex-col justify-between md:pr-[20px] pr-[10px] md:py-[16px] py-[8px] h-full w-full">
        <div className="w-full">
          <h2 className="text-dark-blue font-semibold text-[14px]">
            {propertyData.name}
          </h2>
          <p className="text-[#6C727F] text-[12px]">
            {propertyData.address.unit +
              ", " +
              propertyData.address.street +
              ", " +
              propertyData.address.city}
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
