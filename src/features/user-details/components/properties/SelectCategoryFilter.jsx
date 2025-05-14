import { Group, Select } from "@mantine/core";
import React, { useState } from "react";
import AddPropertyCategoryModal from "./AddPropertyCategoryModal";
import { PROPERTY_CATEGORY_ICONS } from "./../../../../constants/propertyCategoryIcons";
import {
  CATEGORY_ADD_ICON,
  CATEGORY_NON_ICON,
} from "./../../../../assets/icons/PropertyCategoryIcons";

export const SelectCategoryFilter = ({
  filterOptions,
  onChange,
  initialValue,
}) => {
  const [showAddPropertyCategoryModal, setShowAddPropertyCategoryModal] =
    useState(false);

  // Set initial filterValue as an empty string
  const [filterValue, setFilterValue] = useState(initialValue);

  const handleChange = (selectedValue) => {
    if (!selectedValue) return;

    if (selectedValue === "add-category") {
      setShowAddPropertyCategoryModal(true);
      return;
    }

    setFilterValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <React.Fragment>
      <AddPropertyCategoryModal
        isModalOpen={showAddPropertyCategoryModal}
        onCloseModal={() => {
          setShowAddPropertyCategoryModal(false);
        }}
      />
      <Select
        id="categories-select-filter-all-properties"
        value={filterValue}
        placeholder="Select a Category"
        onChange={(value) => handleChange(value)}
        data={[
          ...filterOptions,
          { label: "Add a Category", value: "add-category" },
        ]}
        classNames={{
          // dropdown: "!w-fit",
          input: "!p-0 !border-0 !h-fit !bg-transparent !rounded-0",
          dropdown: "!w-fit",
        }}
        comboboxProps={{
          transitionProps: { transition: "pop", duration: 200 },
          dropdownPadding: 8,
          radius: 8,
          offset: 2,
          position: "bottom-start",
        }}
        renderOption={(category) => {
          if (category.option.label === "Add a Category") {
            return (
              <Group flex="1" gap="16px" className="text-darkBlue">
                <CATEGORY_ADD_ICON className="opacity-50" />
                <p className="text-[14px] font-medium">
                  {category.option.label}
                </p>
              </Group>
            );
          }

          const iconId = filterOptions.find(
            (cat) => cat.value === category.option.value
          )?.iconId;

          const userAddedIconId = filterOptions.find(
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
                category.option.value === filterValue
                  ? "text-primary"
                  : "text-darkBlue"
              }`}
            >
              {IconComponent ? (
                <IconComponent
                  className={`${
                    category.option.value === filterValue
                      ? "opacity-100"
                      : "opacity-50"
                  }`}
                />
              ) : (
                <CATEGORY_NON_ICON
                  className={`${
                    category.option.value === filterValue
                      ? "opacity-100"
                      : "opacity-50"
                  }`}
                />
              )}
              <p className="text-[14px] font-medium">{category.option.label}</p>
            </Group>
          );
        }}
      />
    </React.Fragment>
  );
};
