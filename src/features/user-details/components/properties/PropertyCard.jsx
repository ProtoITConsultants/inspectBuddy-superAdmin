import { DEFAULT_PROPERTY_ICON } from "./../../../../assets/icons/DefaultPropertyIcon";

const PropertyCard = ({ propertyData }) => {
  const { propertyName, propertyAddress, propertyImageURL } = propertyData;

  return (
    <div className="flex items-center gap-[16px]">
      {propertyImageURL ? (
        <img
          src={propertyImageURL}
          alt="Property"
          className="w-[64px] h-[48px] object-cover rounded-[8px]"
        />
      ) : (
        <div className="w-[64px] h-[48px] bg-[#DDEBFF] rounded-[8px] flex items-center justify-center">
          <DEFAULT_PROPERTY_ICON className="w-[64px] !h-[48px]" />
        </div>
      )}

      <div>
        <p className="text-[16px] font-bold text-dark-blue line-clamp-1">
          {propertyName}
        </p>
        <p className="text-[14px] text-tertiary line-clamp-1">
          {propertyAddress}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
