import { useCallback } from "react";
import { RadioGroup, Select, TextInput } from "@mantine/core";
import { QUESTIONS_ICONS_LIST } from "../../../../../constants/QuestionsIcons";

const Radio = ({ label, options, isRequired, value, onChange }) => {
  // Memoizing the icons list to avoid unnecessary recalculations on re-renders
  const getIcon = useCallback((iconId) => {
    return QUESTIONS_ICONS_LIST.find((icon) => icon?.id === Number(iconId))
      ?.icon;
  }, []);

  // Optimizing the onChange handler to be stable
  const handleOnChange = useCallback(
    (optionValue) => {
      onChange(optionValue);
    },
    [onChange]
  );

  return (
    <RadioGroup
      name={label + "radio-question"}
      value={value}
      label={label}
      withAsterisk={isRequired}
    >
      <div className="bg-[rgba(42,133,255,0.14)] flex p-[4px] rounded-[8px] h-[65px] w-fit mt-[8px]">
        {options.map((option, index) => {
          const isSelected = value === option.option;
          const icon = option.iconId ? getIcon(option.iconId) : null;

          return (
            <div
              key={option._id}
              className="md:w-[183px] sm:w-[120px] w-fit flex justify-center items-center"
            >
              <input
                type="radio"
                id={option.option + "-" + index}
                name="radio-option"
                value={value}
                hidden
                onChange={() => handleOnChange(option.option)}
                checked={isSelected}
              />
              <label
                htmlFor={option.option + "-" + index}
                className={`p-[8px] flex flex-col items-center justify-center gap-[4px] h-full hover:cursor-pointer ${
                  isSelected ? "bg-primary text-white" : "text-gray-dark"
                } rounded-[8px] w-full sm:p-0 px-[30px] py-[9px]`}
              >
                {icon ? (
                  <div className="w-[20px] h-[20px] flex justify-center items-center">
                    {icon}
                  </div>
                ) : (
                  <div
                    className={`border rounded-full w-[20px] h-[20px] flex justify-center items-center ${
                      isSelected ? "border-white" : "border-gray-dark"
                    }`}
                  >
                    <p className="text-[12px] font-medium leading-none">
                      {option.option
                        ?.trim()
                        .split(" ")[0]
                        .charAt(0)
                        .toUpperCase()}
                    </p>
                  </div>
                )}
                <span className="m-0 p-0 text-[12px] font-medium leading-none">
                  {option.option}
                </span>
              </label>
            </div>
          );
        })}
      </div>
    </RadioGroup>
  );
};

const TextArea = ({ label, isRequired, valueRef }) => {
  return (
    <TextInput
      id="room-question-text-area-answer"
      label={label}
      placeholder="Answer"
      multiline
      required={isRequired}
      {...valueRef}
    />
  );
};

const DropDown = ({ label, options, isRequired, valueRef }) => {
  return (
    <Select
      id="room-question-drop-down"
      label={label}
      placeholder="Select Answer"
      data={options.map((option) => option.option)}
      className="w-full"
      clearable
      withAsterisk={isRequired}
      {...valueRef}
    />
  );
};

const ElementQuestion = {
  Radio,
  TextArea,
  DropDown,
};

export default ElementQuestion;
