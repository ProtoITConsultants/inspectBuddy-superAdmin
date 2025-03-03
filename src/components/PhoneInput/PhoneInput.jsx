import { IMaskInput } from "react-imask";
import { Autocomplete, Avatar, Group, Input } from "@mantine/core";
import { COUNTRIES_DATA } from "../../constants/countriesData";
import { useMemo } from "react";

const PhoneInput = ({
  id,
  label,
  formValueRef,
  value,
  disabled = false,
  errorText,
  countryCode,
  setCountryCode,
}) => {
  const renderAutocompleteOption = ({ option }) => {
    return (
      <Group gap="sm">
        <Avatar
          src={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png`}
          size={20}
          radius="xl"
        />
        <p>+{option.label}</p>
      </Group>
    );
  };

  const selectedValue = useMemo(() => {
    return countryCode ? countryCode.replace("+", "") : "";
  }, [countryCode]);

  return (
    <div id={id} className="flex flex-col gap-[8px]">
      <p className="text-[14px]">{label}</p>
      <div className="flex flex-col gap-[5px]">
        <div className="flex items-center">
          <Autocomplete
            id="countries-select"
            data={COUNTRIES_DATA}
            value={selectedValue}
            disabled={disabled}
            maxDropdownHeight={300}
            renderOption={renderAutocompleteOption}
            className="w-[120px]"
            onChange={(value) => {
              setCountryCode(`+${value}`);
            }}
          />
          <Input
            id="phone-number-input"
            placeholder={!disabled ? "(555) 555-1234" : "Enter Phone Number"}
            {...formValueRef}
            className="w-full font-medium flex-1"
            value={value}
            component={IMaskInput}
            mask="(000) 000-0000"
            disabled={disabled}
          />
        </div>
        {errorText && <p className="text-[#fa5252] text-[12px]">{errorText}</p>}
      </div>
    </div>
  );
};

export default PhoneInput;
