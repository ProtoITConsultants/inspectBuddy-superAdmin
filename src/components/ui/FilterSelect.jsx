import { useState } from "react";
import { Select } from "@mantine/core";

const FilterSelect = ({
  options,
  onChange,
  initialValue,
  placeholder,
  isSubUserFilter = false,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (option) => {
    // Pass "All Members" to parent - Subusers Page
    if (!option && isSubUserFilter) {
      setValue(null);
      onChange("All Members");
      return;
    }
    // If no option is selected return - Other than Subusers
    if (!option) return;
    // Pass selected option to parent
    setValue(option);
    onChange(option.value);
  };

  return (
    <Select
      id="select-filter"
      value={value?.value || null}
      onChange={(_value, option) => handleChange(option)}
      placeholder={placeholder}
      data={options}
      withCheckIcon={isSubUserFilter}
      comboboxProps={{
        transitionProps: { transition: "pop", duration: 200 },
        dropdownPadding: 8,
        radius: 8,
        offset: 2,
        position: "bottom-start",
      }}
      // renderOption={(item) => (
      //   <div key={item.option._id}>{item.option.label}</div>
      // )}
      allowDeselect={isSubUserFilter}
    />
  );
};

export default FilterSelect;
