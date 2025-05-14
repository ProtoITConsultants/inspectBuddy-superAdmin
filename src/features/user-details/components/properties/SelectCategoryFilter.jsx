import { Group, Select } from "@mantine/core";
import React, { useState } from "react";
import AddPropertyCategoryModal from "./AddPropertyCategoryModal";
import { PROPERTY_CATEGORY_ICONS } from "./../../../../constants/propertyCategoryIcons";
import {
  CATEGORY_ADD_ICON,
  CATEGORY_NON_ICON,
} from "./../../../../assets/icons/PropertyCategoryIcons";
import EditPropertyCategoryModal from "./EditPropertyCategoryModal";
import { EDIT_DETAILS_ICON } from "../../../../assets/icons/EditIcon";
import { DELETE_ICON } from "../../../../assets/icons/DynamicIcons";
import DeletePropertyCategoryModal from "./DeletePropertyCategoryModal";

export const SelectCategoryFilter = ({
  filterOptions,
  onChange,
  initialValue,
}) => {
  const [showAddPropertyCategoryModal, setShowAddPropertyCategoryModal] =
    useState(false);

  const [updateCategoryModalData, setUpdateCategoryModalData] = useState({
    isModalOpen: false,
    categoryData: {},
  });
  const [deleteCategoryModalData, setDeleteCategoryModalData] = useState({
    isModalOpen: false,
    categoryData: {},
  });

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
      <EditPropertyCategoryModal
        isModalOpen={updateCategoryModalData.isModalOpen}
        onCloseModal={() =>
          setUpdateCategoryModalData({
            isModalOpen: false,
            categoryData: {},
          })
        }
        categoryData={updateCategoryModalData.categoryData}
      />
      <DeletePropertyCategoryModal
        isModalOpen={deleteCategoryModalData.isModalOpen}
        onCloseModal={() =>
          setDeleteCategoryModalData({
            isModalOpen: false,
            categoryData: {},
          })
        }
        categoryData={deleteCategoryModalData.categoryData}
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
              <Group flex="1" gap="8px" className="text-dark-blue">
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
              gap="24px"
              className={`${
                category.option.value === filterValue
                  ? "text-primary"
                  : "text-dark-blue"
              } !justify-between`}
            >
              <div className="flex items-center gap-[8px]">
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
                <p className="text-[14px] font-medium">
                  {category.option.label}
                </p>
              </div>
              {category.option.value !== "all" && (
                <div className="flex items-center gap-[8px]">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setUpdateCategoryModalData({
                        isModalOpen: true,
                        categoryData: {
                          categoryId: category.option._id,
                          value: category.option.value,
                          iconId: iconId,
                        },
                      });
                    }}
                  >
                    <EDIT_DETAILS_ICON className="w-[18px] text-gray-500" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteCategoryModalData({
                        isModalOpen: true,
                        categoryData: {
                          categoryId: category.option._id,
                          name: category.option.label,
                        },
                      });
                    }}
                  >
                    <DELETE_ICON className="w-[18px] text-[#FF613E]" />
                  </button>
                </div>
              )}
            </Group>
          );
        }}
      />
    </React.Fragment>
  );
};
