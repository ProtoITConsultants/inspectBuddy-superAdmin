import { useState } from "react";
import { Select } from "@mantine/core";

const FilterSelect = ({ options, onChange }) => {
  const [value, setValue] = useState(options[0] || null);

  const handleChange = (option) => {
    if (!option) return;
    setValue(option);
    onChange(option.value);
  };

  return (
    <Select
      id="select-filter"
      value={value?.value}
      onChange={(_value, option) => handleChange(option)}
      data={options}
      withCheckIcon={false}
      comboboxProps={{
        transitionProps: { transition: "pop", duration: 200 },
        dropdownPadding: 8,
        radius: 8,
        offset: 2,
        position: "bottom-start",
      }}
      renderOption={(item) => (
        <div key={item.option._id}>
          {item.option.label !== "All Members" &&
            item.option.label !== "Unassigned" &&
            "Assigned to "}
          {item.option.label}
        </div>
      )}
    />
  );
};

export default FilterSelect;
