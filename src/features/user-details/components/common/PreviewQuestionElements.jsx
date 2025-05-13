import { QUESTIONS_ICONS_LIST } from "../../../../constants/QuestionsIcons";

const Root = ({ children }) => (
  <div className="flex flex-col gap-[16px]">{children}</div>
);

const OptionsList = ({ children }) => (
  <div className="space-y-[8px]">
    <p className="text-dark-blue font-medium text-[14px]">Answer Options</p>
    <div
      className="grid grid-cols-2 gap-x-[20px] gap-y-[8px] max-h-[105px] overflow-auto"
      id="previewQuestionOptionsList"
    >
      {children}
    </div>
  </div>
);

const OptionCard = ({ optionNumber, optionData }) => (
  <div className="w-full flex items-center gap-[12px]">
    <div
      className={`flex-1 rounded-[8px] border border-[#cce2ff] bg-[#f3f8ff] py-[12px] px-[16px] flex items-center justify-between`}
    >
      <p className="text-dark-blue font-medium text-[14px]">
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
        <p className="text-[14px] font-medium text-[#6c727f]">No Icon</p>
      )}
    </div>
  </div>
);

const PreviewQuestion = {
  Root,
  OptionsList,
  OptionCard,
};

export default PreviewQuestion;
