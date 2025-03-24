import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { userDetailsAPIs } from "../../api";
import { toast } from "sonner";
import { ModalRoot } from "../../../../components/ui/Modal";
import Button from "../../../../components/ui/Button";
import { useParams } from "react-router";
import { useTemplateStore } from "../../../../store/templateStore";
import { Checkbox, Stepper } from "@mantine/core";
import { VIEW_QUESTION_DETAILS_ICON } from "../../../../assets/icons/ViewQuestionDetails";
import AddNewItemButton from "./AddNewItemButton";

const DeleteElement = ({ isModalOpen, onCloseModal, elementData }) => {
  // Hooks
  const { templateId, roomId } = useParams();

  // Global States
  const selectedTemplateRoomElements = useTemplateStore(
    (state) => state.selectedTemplateRoomElements
  );
  const setSelectedTemplateRoomElements = useTemplateStore(
    (state) => state.setSelectedTemplateRoomElements
  );

  // Local States
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteElement = useMutation({
    mutationFn: () => {
      setIsDeleting(true);
      return userDetailsAPIs.deleteElementFromTemplate({
        templateId,
        roomId,
        elementIdArray: [elementData._id],
      });
    },
    onSuccess: () => {
      // Updated Element List
      const updatedElements = selectedTemplateRoomElements.filter(
        (element) => element._id !== elementData._id
      );
      setSelectedTemplateRoomElements(updatedElements);

      onCloseModal();
      setIsDeleting(false);
      toast.success("Success!", {
        description: "Element deleted successfully.",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't delete element.",
        duration: 3000,
      });
      setIsDeleting(false);
    },
  });

  return (
    <ModalRoot
      id="delete-template-roomElement-modal"
      openModal={isModalOpen}
      onClose={() => {
        setIsDeleting(false);
        onCloseModal();
      }}
      loadingOverlay={isDeleting}
    >
      <div className="text-dark-blue flex flex-col sm:gap-[24px] gap-[12px]">
        <h2 className="font-bold text-[24px]">Confirmation</h2>
        <p className="text-[16px] font-medium">
          Please Confirm that you want to delete&nbsp;
          <b>{elementData.name}</b>?
        </p>
      </div>

      <div className="flex items-center justify-center gap-[24px] mt-[32px]">
        <Button
          id="delete-room-btn"
          label="Confirm"
          type="button"
          buttonColor="#FF4D4F"
          className="sm:w-[216px] w-full font-bold !bg-[#FF4D4F] !text-white"
          buttonType="filled"
          onClick={deleteElement.mutate}
        />
        <Button
          id="cancel-delete-room-btn"
          label="Cancel"
          type="button"
          borderColor="#CCE2FF"
          className="sm:w-[216px] w-full font-bold !text-[#2A85FF]"
          buttonType="outlined"
          onClick={onCloseModal}
        />
      </div>
    </ModalRoot>
  );
};

// Add Question Modals Root
const QuestionModalRoot = ({ children, className }) => {
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
const QuestionModalHeader = ({ title }) => {
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
            <button
              type="button"
              onClick={() => onPreviewQuestionDetail(question)}
            >
              <VIEW_QUESTION_DETAILS_ICON />
            </button>
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
const AddQuestionModalActions = ({ children }) => (
  <div className="flex items-center justify-center mt-[16px] md:gap-[24px] gap-[12px] flex-wrap">
    {children}
  </div>
);

const AddQuestion = ({ isModalOpen, onCloseModal, currentElementId }) => {
  // Hooks
  const { userId, templateId, roomId } = useParams();

  // Global States
  const savedQuestions = useTemplateStore((state) => state.savedQuestions);
  const selectedTemplateRoomElements = useTemplateStore(
    (state) => state.selectedTemplateRoomElements
  );
  const setSelectedTemplateRoomElements = useTemplateStore(
    (state) => state.setSelectedTemplateRoomElements
  );

  // Local States
  const [active, setActive] = useState(0);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  // This Array will contain the updated questuions list
  // Already Added Questions contain extra field (disabled: true)
  const [existingQuestions, setExistingQuestions] = useState([]);

  // State to contain the selected questions
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // State to contain the to be previewed question
  const [questionToPreview, setQuestionToPreview] = useState({});

  // Mutations
  const addSelectedQuestionsToElement = useMutation({
    mutationFn: () => {
      setIsAddingQuestion(true);

      // remove the isdefault, __v, _id keys from the selected questions and add shouldSave key with value false
      const questions = selectedQuestions.map((question) => {
        const filteredEntries = Object.entries(question).filter(
          ([key]) => !["isdefault", "__v", "_id", "user"].includes(key)
        );

        return {
          ...Object.fromEntries(filteredEntries),
          shouldSave: false,
        };
      });

      return userDetailsAPIs.addSelectedQuestionsToElement({
        templateId: templateId,
        roomId: roomId,
        elementId: currentElementId,
        questions: questions,
        userId: userId,
      });
    },

    onSuccess: (data) => {
      setIsAddingQuestion(false);
      // Update the selectedTemplateRoomElements
      const updatedElements = selectedTemplateRoomElements.map((element) => {
        if (element._id === currentElementId) {
          return {
            ...element,
            checklist: [...element.checklist, ...data.newChecklistItems],
          };
        }
        return element;
      });
      setSelectedTemplateRoomElements(updatedElements);
      setSelectedQuestions([]);
      toast.success("Success!", {
        description: "Questions added successfully.",
        duration: 3000,
      });
      onCloseModal();
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't add questions.",
        duration: 3000,
      });
      setIsAddingQuestion(false);
    },
  });

  // UseEffect to filter the already added questions
  useEffect(() => {
    if (active === 0) {
      setIsAddingQuestion(true);

      // Find the current Element
      const currentElement = selectedTemplateRoomElements?.find(
        (element) => element._id === currentElementId
      );

      if (!currentElement) return; // Skip if no element found

      // Create a Set for quicker lookup of existing questions
      const existingQuestionsSet = new Set(
        currentElement?.checklist?.map((item) => item.text)
      );

      // Find the questions that are already added and disable them
      const filteredQuestions = savedQuestions?.map((question) => {
        if (existingQuestionsSet.has(question.text)) {
          return { ...question, disabled: true };
        }
        return question;
      });

      // Only update state if there's a change
      if (filteredQuestions) {
        setExistingQuestions(filteredQuestions);
      }

      setIsAddingQuestion(false);
    }

    // Clean up function
    return () => {};
  }, [selectedTemplateRoomElements, savedQuestions, active, currentElementId]);

  return (
    <ModalRoot
      id="add-template-question-modal"
      openModal={true}
      onClose={() => {
        onCloseModal();
        setIsAddingQuestion(false);
      }}
      loadingOverlay={isAddingQuestion}
    >
      <Stepper
        styles={{
          steps: {
            display: "none",
          },
          content: {
            padding: 0,
          },
        }}
        active={active}
        onStepClick={setActive}
      >
        <Stepper.Step id="saved-questions">
          <QuestionModalRoot>
            <QuestionModalHeader title="Add questions to checklist" />
            <SavedQuestionsList
              questions={existingQuestions}
              heading="Please Select Questions from the list that you want to add to checklist?"
              onAddNewQuestionBtnClick={() => setActive(1)}
              setSelectedQuestions={setSelectedQuestions}
              onPreviewQuestionDetail={(question) => {
                setQuestionToPreview(question);
                setActive(2);
              }}
            />
            <AddQuestionModalActions>
              <Button
                id="add-selected-questions"
                type="button"
                onClick={addSelectedQuestionsToElement.mutate}
                buttonType="contained"
                label="Confirm"
                className="sm:w-[208px] w-full"
              />
              <Button
                id="cancel-add-selected-questions"
                label="Cancel"
                className="!text-primary sm:w-[208px] w-full hover:!bg-[#FF613E] hover:!border-[#FF613E]"
                type="button"
                buttonType="outlined"
                borderColor="#CCE2FF"
                onClick={() => onCloseModal()}
              />
            </AddQuestionModalActions>
          </QuestionModalRoot>
        </Stepper.Step>
        <Stepper.Step id="create-new-question">
          Create New Question
        </Stepper.Step>
        <Stepper.Step id="preview-question">Preview Question</Stepper.Step>
      </Stepper>
    </ModalRoot>
  );
};

const InspectionModals = {
  DeleteElement,
  AddQuestion,
};

export default InspectionModals;
