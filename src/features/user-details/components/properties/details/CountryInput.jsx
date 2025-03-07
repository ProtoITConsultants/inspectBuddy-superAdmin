import { Avatar, Group, Select, Text } from "@mantine/core";
import { COUNTRIES_DATA_2 } from "../../../../../constants/countriesData2";
import { useEffect, useState } from "react";

const CountryInput = ({ error, selectedCountry, onCountrySelect }) => {
  const [value, setValue] = useState(null);

  const renderCountryOptions = ({ option }) => {
    return (
      <Group gap="12px" className="!hover:bg-[#E4F0FF]">
        <Avatar
          src={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png`}
          size={20}
          radius="xl"
        />
        <Text className="!text-[14px] !font-medium !text-darkBlue">
          {option.label}
        </Text>
      </Group>
    );
  };

  useEffect(() => {
    const countryObject = COUNTRIES_DATA_2.find(
      (country) => country.label === selectedCountry
    );

    if (countryObject) {
      return setValue(countryObject);
    }

    setValue(null);
  }, [selectedCountry]);

  return (
    <Select
      id="custom-country-select-input"
      label="Country"
      placeholder="Select Country"
      className={`rounded-[8px] !text-[14px]`}
      data={COUNTRIES_DATA_2}
      value={value?.value}
      onChange={(_value, option) => {
        if (option) {
          onCountrySelect(option?.label);
        } else {
          onCountrySelect("");
        }
      }}
      renderOption={renderCountryOptions}
      error={error}
      nothingFoundMessage="Nothing found..."
      searchable
      clearable
    />
  );
};

export default CountryInput;
