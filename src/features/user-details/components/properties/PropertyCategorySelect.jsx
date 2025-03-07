import { Group, Select } from "@mantine/core";
import {
  CATEGORY_ADD_ICON,
  CATEGORY_NON_ICON,
} from "../../../../assets/icons/PropertyCategoryIcons";
import { PROPERTY_CATEGORY_ICONS } from "../../../../constants/propertyCategoryIcons";

const PropertyCategorySelect = ({ options, value, error, onChange }) => {
  return (
    <Select
      id="property-category-select"
      label="Category"
      placeholder="Select Category"
      error={error}
      value={value?.value}
      data={[...options, { value: "add-category", label: "Add a Category" }]} // Add custom option
      nothingFoundMessage="Nothing found..."
      clearable
      searchable
      renderOption={(category) => {
        if (category.option.label === "Add a Category") {
          return (
            <Group flex="1" gap="16px" className="text-darkBlue">
              <CATEGORY_ADD_ICON className="opacity-50" />
              <p className="text-[14px] font-medium">{category.option.label}</p>
            </Group>
          );
        }

        const PROPERTY_CATEGORIES = [
          { _id: 1, value: "Residential", iconId: "2" },
          { _id: 2, value: "Commercial", iconId: "5" },
        ];

        const iconId = PROPERTY_CATEGORIES.find(
          (cat) => cat.value === category.option.value
        )?.iconId;

        const userAddedIconId = options.find(
          (cat) => cat.value === category.option.value
        )?.iconId;

        const IconComponent = PROPERTY_CATEGORY_ICONS.find(
          (icon) => icon.id === iconId || icon.id === userAddedIconId
        )?.Icon;

        return (
          <Group
            flex="1"
            gap="16px"
            className={`${
              category.option.value === value ? "text-primary" : "text-darkBlue"
            }`}
          >
            {IconComponent ? (
              <IconComponent
                className={`${
                  category.option.value === value ? "opacity-100" : "opacity-50"
                }`}
              />
            ) : (
              <CATEGORY_NON_ICON
                className={`${
                  category.option.value === value ? "opacity-100" : "opacity-50"
                }`}
              />
            )}
            <p className="text-[14px] font-medium">{category.option.label}</p>
          </Group>
        );
      }}
      comboboxProps={{
        transitionProps: { transition: "pop", duration: 200 },
      }}
      onChange={onChange}
    />
  );
};

export default PropertyCategorySelect;
