import { useState } from "react";
import { USERS_SUBSCRIPTIONS_TYPE } from "../../../../constants/filters";
import { Select } from "@mantine/core";
import "./SubscriptionFilter.css";

const SubscriptionFilter = ({ handleFilterChange }) => {
  const [value, setValue] = useState(USERS_SUBSCRIPTIONS_TYPE[0] || null);

  const handleChange = (option) => {
    if (!option) return;
    setValue(option);
    handleFilterChange(option.value);
  };

  return (
    <Select
      value={value?.value}
      onChange={(_value, option) => handleChange(option)}
      data={USERS_SUBSCRIPTIONS_TYPE}
      withCheckIcon={false}
      comboboxProps={{
        transitionProps: { transition: "pop", duration: 200 },
        dropdownPadding: 8,
        radius: 8,
        offset: 2,
      }}
      //   rightSection={<IconChevronDown size={18} className="text-[#6C727F]" />}
    />
  );
};

export default SubscriptionFilter;
