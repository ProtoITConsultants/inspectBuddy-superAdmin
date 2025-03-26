import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { userDetailsAPIs } from "../../api";
import { toast } from "sonner";
import { ModalRoot } from "../../../../components/ui/Modal";
import Button from "../../../../components/ui/Button";
import { useParams } from "react-router";
import { useTemplateStore } from "../../../../store/templateStore";
import { Checkbox, Divider, Stepper, TextInput } from "@mantine/core";
import { ARROW_RIGHT_ICON } from "./../../../../assets/icons/ArrowRightIcon";
import { useForm } from "@mantine/form";
import ElementQuestionCard from "./ElementQuestionCard";
import ElementQuestionModal from "./AddElementQuestionComponents";
import { QUESTIONS_ICONS_LIST } from "../../../../constants/QuestionsIcons";
import { userTemplatesAPIs } from "../../api/template";

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

const AddQuestion = ({ isModalOpen, onCloseModal, currentElementId }) => {
  // Hooks
  const { userId, templateId, roomId } = useParams();

  // Global States
  const savedQuestions = useTemplateStore((state) => state.savedQuestions);
  const setSavedQuestions = useTemplateStore(
    (state) => state.setSavedQuestions
  );
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

  // state to save the selectedIcon for the option
  const [iconOptionIndex, setIconOptionIndex] = useState();
  const [selectedIcon, setSelectedIcon] = useState("");

  const [showAddOptionsButton, setShowAddOptionsButton] = useState(true);
  const newQuestionForm = useForm({
    initialValues: {
      text: "",
      options: [],
      type: "",
      shouldSave: false,
      answerRequired: false,
    },

    validate: {
      text: (value) => (value.length > 0 ? null : "Question is required!"),
      options: (value, values) =>
        values.type !== "textArea" && value.length === 0
          ? "Options are required for checkbox!"
          : null,
      type: (value) => (value.length > 0 ? null : "Type is required!"),
    },
  });

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

  const createNewQuestion = useMutation({
    mutationFn: () => {
      // Validate the form
      newQuestionForm.validate();

      // Cancel API call if form is invalid
      if (!newQuestionForm.isValid()) {
        return console.log("Form is invalid");
      }

      // Call API
      return userTemplatesAPIs.createNewQuestion({
        templateId: templateId,
        roomId: roomId,
        userId: userId,
        elementId: currentElementId,
        questions: [newQuestionForm.values],
      });
    },
    onSuccess: (data) => {
      const shouldSaveQuestion = newQuestionForm.values.shouldSave;

      if (shouldSaveQuestion) {
        setSavedQuestions(data.newSavedQuestions[0]);
      }

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

      newQuestionForm.reset();
      toast.success("Success!", {
        description: "Questions added successfully.",
        duration: 3000,
      });
      onCloseModal();
    },
    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't create new Question.",
        duration: 3000,
      });
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

  // Handle Save Option Icon
  const handleSaveOptionIcon = () => {
    const selectedIconId = QUESTIONS_ICONS_LIST.find(
      (icon) => icon.icon === selectedIcon
    ).id;

    const newOptions = newQuestionForm.values.options.map((option, index) => {
      if (index === iconOptionIndex) {
        return {
          ...option,
          iconId: selectedIconId,
        };
      }
      return option;
    });

    // Update the newQuestionData with the new options
    newQuestionForm.setFieldValue("options", newOptions);

    setActive(1);
    setSelectedIcon("");
  };

  return (
    <ModalRoot
      id="add-template-question-modal"
      openModal={isModalOpen}
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
          <ElementQuestionModal.Root>
            <ElementQuestionModal.Header title="Add questions to checklist" />
            <ElementQuestionModal.SavedQuestionsList
              questions={existingQuestions}
              heading="Please Select Questions from the list that you want to add to checklist?"
              onAddNewQuestionBtnClick={() => setActive(1)}
              setSelectedQuestions={setSelectedQuestions}
              onPreviewQuestionDetail={(question) => {
                setQuestionToPreview(question);
                setActive(2);
              }}
            />
            <ElementQuestionModal.Actions>
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
            </ElementQuestionModal.Actions>
          </ElementQuestionModal.Root>
        </Stepper.Step>
        <Stepper.Step id="create-new-question">
          <ElementQuestionModal.Root>
            <Button
              id="goBack-to-existing-questions"
              onClick={() => setActive(0)}
              type="button"
              buttonType="iconButton"
              icon={
                <ARROW_RIGHT_ICON className="transform rotate-180 w-[20px] h-[20px]" />
              }
              label="Go Back"
              className="!w-fit !font-semibold !h-fit !text-[18px]"
            />
            <Divider className="w-full !border-t-[1.5px]" color="#E4F0FF" />
            <TextInput
              label="New Question"
              placeholder="Enter New Question"
              {...newQuestionForm.getInputProps("text")}
              className="w-full font-medium"
            />
            <Checkbox
              label="Save this question."
              {...newQuestionForm.getInputProps("shouldSave")}
              checked={newQuestionForm.values.shouldSave}
            />
            <ElementQuestionModal.AnswerTypeSelector
              label="Answer Type"
              typeOptions={[
                { label: "Options", value: "radio" },
                { label: "Text Field", value: "textArea" },
                { label: "Drop Down", value: "dropDown" },
              ]}
              onSelect={(answerType) => {
                newQuestionForm.setFieldValue("type", answerType);
              }}
            />

            {(newQuestionForm.values.type === "radio" ||
              newQuestionForm.values.type === "dropDown") && (
              <ElementQuestionModal.NewQuestionOptionsList
                title="Options"
                minimumText="Add minimum 2 options"
                showAddButton={showAddOptionsButton}
                setShowAddButton={setShowAddOptionsButton}
              >
                {!showAddOptionsButton && (
                  <ElementQuestionCard.NewOption
                    onSaveNewOption={(newOptionValue) => {
                      setShowAddOptionsButton(true);
                      newQuestionForm.setFieldValue("options", [
                        ...newQuestionForm.values.options,
                        {
                          option: newOptionValue.text,
                          iconId: "",
                        },
                      ]);
                    }}
                    onCancelNewOption={() => {
                      setShowAddOptionsButton(true);
                    }}
                  />
                )}

                {newQuestionForm.values.options.map((option, index) => (
                  <ElementQuestionCard.ExistingOption
                    key={index}
                    optionNumber={index}
                    optionData={option}
                    onOpenIconModal={() => {
                      setActive(2);
                      setIconOptionIndex(index);
                    }}
                    onDeleteOption={() => {
                      const newOptions = newQuestionForm.values.options.filter(
                        (opt, i) => i !== index
                      );
                      newQuestionForm.setFieldValue("options", newOptions);
                    }}
                  />
                ))}
              </ElementQuestionModal.NewQuestionOptionsList>
            )}

            <Checkbox
              label="Answer is required"
              {...newQuestionForm.getInputProps("isRequired")}
              checked={newQuestionForm.values.isRequired}
            />

            <ElementQuestionModal.Actions>
              <Button
                id="add-new-questions"
                type="button"
                onClick={createNewQuestion.mutate}
                buttonType="contained"
                label="Add New Question"
                className="sm:w-[208px] w-full"
              />
              <Button
                id="cancel-add-new-questions"
                label="Cancel"
                className="!text-primary sm:w-[208px] w-full hover:!bg-[#FF613E] hover:!border-[#FF613E]"
                type="button"
                buttonType="outlined"
                borderColor="#CCE2FF"
                onClick={() => {
                  setActive(0);
                  newQuestionForm.reset();
                }}
              />
            </ElementQuestionModal.Actions>
          </ElementQuestionModal.Root>
        </Stepper.Step>
        <Stepper.Step id="question-icon-modal">
          <ElementQuestionModal.Root>
            <Button
              id="goBack-to-existing-questions"
              onClick={() => setActive(1)}
              type="button"
              buttonType="iconButton"
              icon={
                <ARROW_RIGHT_ICON className="transform rotate-180 w-[20px] h-[20px]" />
              }
              label="Go Back"
              className="!w-fit !font-semibold !h-fit !text-[18px]"
            />
            <Divider className="w-full !border-t-[1.5px]" color="#E4F0FF" />
            <ElementQuestionModal.OptionIconsList
              selectedIcon={selectedIcon}
              onIconSelect={(icon) => setSelectedIcon(icon)}
            />
            <ElementQuestionModal.Actions>
              <Button
                id="add-icon-to-question"
                type="button"
                onClick={handleSaveOptionIcon}
                buttonType="contained"
                label="Save"
                className="sm:w-[208px] w-full"
              />
              <Button
                id="cancel-add-icon-to-question"
                label="Cancel"
                className="!text-primary sm:w-[208px] w-full hover:!bg-[#FF613E] hover:!border-[#FF613E]"
                type="button"
                buttonType="outlined"
                borderColor="#CCE2FF"
                onClick={() => setActive(1)}
              />
            </ElementQuestionModal.Actions>
          </ElementQuestionModal.Root>
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
