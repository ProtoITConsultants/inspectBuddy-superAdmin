import React, { useEffect } from "react";
import { Autocomplete } from "@mantine/core";
import { COUNTRIES_DATA } from "../../constants/countriesData";

const CountrySelect = ({ countryCode, setCountryCode, disabled }) => {
  const [selectedCountry, setSelectedCountry] = React.useState(
    countryCode && !countryCode === "" ? countryCode.replace("+", "") : "1"
  );

  useEffect(() => {
    setCountryCode(`+${selectedCountry}`);
  }, [selectedCountry, setCountryCode]);

  useEffect(() => {
    if (countryCode) {
      setSelectedCountry(countryCode.replace("+", ""));
    }
  }, [countryCode]);

  return (
    <Autocomplete
      id="country-select"
      className={`min-w-[110px] !h-[48px] !rounded-tl-[8px] !rounded-bl-[8px] !p-0 border ${
        disabled
          ? "!bg-[#f5f5f5] border-[rgba(222,222,222,0.5)]"
          : "bg-[#f3f8ff] border-[#cce2ff]"
      }`}
      value={COUNTRIES_DATA.find(
        (country) => country.phone === selectedCountry
      )}
      options={COUNTRIES_DATA}
      onChange={(e, newValue) => {
        setSelectedCountry(newValue.phone);
      }}
      disabled={disabled ? disabled : false}
    >
      CountrySelect
    </Autocomplete>
  );
};

export default CountrySelect;
