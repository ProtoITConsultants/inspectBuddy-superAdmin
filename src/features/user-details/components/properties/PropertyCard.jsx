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
        <DEFAULT_PROPERTY_ICON className="rounded-[8px] w-[64px] h-[48px]" />
      )}

      <div>
        <p className="text-[16px] font-bold text-dark-blue">{propertyName}</p>
        <p className="text-[14px] text-tertiary">
          {propertyAddress.unit +
            ", " +
            propertyAddress.street +
            ", " +
            propertyAddress.city}
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;
