import { Checkbox, Radio, RadioGroup } from "@mantine/core";
import { VIEW_QUESTION_DETAILS_ICON } from "./../../../../assets/icons/ViewQuestionDetails";
import AddNewItemButton from "./AddNewItemButton";
import { QUESTIONS_ICONS_LIST } from "../../../../constants/QuestionsIcons";
import { DELETE_ICON } from "../../../../assets/icons/DynamicIcons";

// Add Question Modals Root
const Root = ({ children, className }) => {
  return (
    <div
      className={`${
        className ? className : null
      } flex flex-col gap-[16px] h-full`}
    >
      {children}
    </div>
  );
};
// Add Question Modals Header
const Header = ({ title }) => {
  return (
    <h2 className="font-bold md:text-[24px] text-[20px] text-dark-blue">
      {title}
    </h2>
  );
};

// Saved Questions List
const SavedQuestionsList = ({
  questions,
  heading,
  onAddNewQuestionBtnClick,
  setSelectedQuestions,
  onPreviewQuestionDetail,
  onClickDeleteSavedQuestion,
}) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <p className="font-medium text-dark-blue text-[16px]">{heading}</p>

      {/* Show this text if there are no saved Question */}
      {questions.length === 0 && (
        <p className="text-[14px] text-gray-dark">
          No saved questions found! Click on the button below to create new
          question.
        </p>
      )}

      <div className="flex flex-col gap-[16px] max-h-[110px] h-full overflow-auto">
        {questions?.map((question, index) => (
          <div className="flex justify-between items-center" key={question._id}>
            <Checkbox
              label={index + 1 + "." + " " + question.text}
              disabled={question.disabled}
              checked={question.disabled}
              onChange={() => {
                // add question to selected questions array
                setSelectedQuestions((prev) => [...prev, question]);
              }}
            />
            <div className="flex items-center gap-[12px]">
              <button
                type="button"
                onClick={() => onPreviewQuestionDetail(question)}
              >
                <VIEW_QUESTION_DETAILS_ICON />
              </button>
              <button
                type="button"
                onClick={() => onClickDeleteSavedQuestion(question)}
              >
                <DELETE_ICON className="text-gray-500 w-[20px]" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <AddNewItemButton
        title="Create New Question"
        showButton={true}
        onClick={onAddNewQuestionBtnClick}
        className="!text-[14px] !font-medium"
      />
    </div>
  );
};

// Modal Actions for Add Question
const Actions = ({ children }) => (
  <div className="flex items-center justify-center mt-[16px] md:gap-[24px] gap-[12px] flex-wrap">
    {children}
  </div>
);

// Create New Question Modal Elements
const AnswerTypeSelector = ({ label, typeOptions, onSelect, error, value }) => {
  return (
    <div className="space-y-[8px]">
      <p className="text-darkBlue font-medium text-[14px]">{label}</p>
      <RadioGroup value={value} onChange={onSelect}>
        <div className="flex md:flex-row flex-col gap-[16px]">
          {typeOptions.map((type) => (
            <Radio label={type.label} value={type.value} key={type.label} />
          ))}
        </div>
        {error && (
          <p className="text-[#fa5252] text-[12px] font-medium mt-[5px]">
            {error}
          </p>
        )}
      </RadioGroup>
    </div>
  );
};

const NewQuestionOptionsList = ({
  children,
  title,
  minimumText,
  showAddButton,
  setShowAddButton,
  error,
}) => {
  return (
    <div className="space-y-[8px]">
      <p className="text-darkBlue font-medium text-[14px]">
        {title}&nbsp;
        <span className="text-[#7A8094]">({minimumText})</span>
      </p>
      <div
        className="grid grid-cols-2 gap-x-[20px] gap-y-[8px] max-h-[105px] overflow-auto"
        id="newQuestionOptionsList"
      >
        {children}
      </div>
      <AddNewItemButton
        title="Add Option"
        showButton={showAddButton}
        onClick={() => setShowAddButton(false)}
      />
      {error && (
        <p className="text-[#fa5252] text-[12px] font-medium mt-[5px]">
          {error}
        </p>
      )}
    </div>
  );
};

const OptionIconsList = ({ selectedIcon, onIconSelect }) => (
  <div className="flex flex-col gap-[12px]">
    <p className="text-[16px] font-medium text-dark-blue">Select Icons</p>
    <div className="flex items-center gap-[8px] flex-wrap mt-[12px]">
      {QUESTIONS_ICONS_LIST.map(({ id, icon }) => (
        <button
          key={id}
          className={`hover:bg-[#DFECFF] p-[4px] h-[35px] w-[35px] flex items-center justify-center ${
            selectedIcon === icon ? "bg-[#DFECFF]" : "bg-white"
          }`}
          onClick={() => onIconSelect(icon)}
        >
          {icon}
        </button>
      ))}
    </div>
  </div>
);

const ElementQuestionModal = {
  Root,
  Header,
  SavedQuestionsList,
  Actions,
  AnswerTypeSelector,
  NewQuestionOptionsList,
  OptionIconsList,
};

export default ElementQuestionModal;
