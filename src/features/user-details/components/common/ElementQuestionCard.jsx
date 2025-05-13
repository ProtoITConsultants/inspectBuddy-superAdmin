import { CROSS_ICON } from "../../../../assets/icons/CrossIcon";
import {
  DISABLED_TICK_ICON,
  TICK_ICON,
} from "../../../../assets/icons/TickIcon";
import { QUESTIONS_ICONS_LIST } from "./../../../../constants/QuestionsIcons";
import { DELETE_ICON } from "./../../../../assets/icons/DynamicIcons";
import { useState } from "react";

const ExistingOption = ({
  optionNumber,
  optionData,
  onDeleteOption,
  onOpenIconModal,
}) => {
  return (
    <div className="w-full flex items-center gap-[12px]">
      <div
        className={`flex-1 rounded-[8px] border border-[#cce2ff] bg-[#f3f8ff] py-[12px] px-[16px] flex items-center justify-between`}
      >
        <p className="text-darkBlue font-medium text-[14px]">
          {optionNumber + 1}. {optionData.option}
        </p>
        {optionData.iconId ? (
          <div className="flex items-center gap-[8px]">
            <p className={`text-[#6C727F] text-[14px] font-semibold`}>Icon:</p>
            {
              QUESTIONS_ICONS_LIST.find((icon) => icon.id == optionData.iconId)
                .icon
            }
          </div>
        ) : (
          <button
            className={`text-[#6C727F] text-[14px] font-semibold`}
            onClick={onOpenIconModal}
          >
            Add Icon
          </button>
        )}
      </div>
      <button
        type="button"
        className="outline-none border-none"
        onClick={onDeleteOption}
      >
        <DELETE_ICON className="text-[#6C727F]" />
      </button>
    </div>
  );
};

const NewOption = ({ onSaveNewOption, onCancelNewOption }) => {
  const [newOptionValue, setNewOptionValue] = useState({
    option: "",
    iconId: "",
  });

  return (
    <div
      className={`bg-white border rounded-[8px] px-[16px] py-[12.5px] border-[#CCE2FF] flex justify-between items-center hover:cursor-pointer flex-1 transition-all duration-300 gap-[8px]`}
    >
      <input
        className="border-none outline-none focus:outline-none flex-1 caret-primary text-darkBlue font-medium text-[14px]"
        id="new-room-input-field"
        name="new-room-input-field"
        onChange={(e) =>
          setNewOptionValue({
            ...newOptionValue,
            text: e.target.value,
          })
        }
        value={newOptionValue.text}
        placeholder="Add Option"
        autoFocus
      />
      <button
        className="border-none outline-none focus:outline-none"
        onClick={() => {
          onSaveNewOption(newOptionValue);
          setNewOptionValue({ option: "", iconId: "" });
        }}
      >
        {!newOptionValue.text ? <DISABLED_TICK_ICON /> : <TICK_ICON />}
      </button>
      <button
        className="border-none outline-none focus:outline-none"
        onClick={() => {
          onCancelNewOption();
          setNewOptionValue({
            option: "",
            iconId: "",
          });
        }}
      >
        <CROSS_ICON />
      </button>
    </div>
  );
};

const ElementQuestionCard = {
  ExistingOption,
  NewOption,
};

export default ElementQuestionCard;
