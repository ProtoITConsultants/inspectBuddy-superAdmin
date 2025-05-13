import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { userDetailsAPIs } from "../../api";
import { toast } from "sonner";
import { ModalRoot } from "../../../../components/ui/Modal";
import Button from "../../../../components/ui/Button";
import { useParams } from "react-router";
import { useTemplateStore } from "../../../../store/templateStore";
import {
  Checkbox,
  Divider,
  Group,
  Stepper,
  Text,
  TextInput,
} from "@mantine/core";
import { ARROW_RIGHT_ICON } from "./../../../../assets/icons/ArrowRightIcon";
import { useForm } from "@mantine/form";
import ElementQuestionCard from "./ElementQuestionCard";
import ElementQuestionModal from "./AddElementQuestionComponents";
import { QUESTIONS_ICONS_LIST } from "../../../../constants/QuestionsIcons";
// import { userTemplatesAPIs } from "../../api/template";
import PreviewQuestion from "./PreviewQuestionElements";
import { useInspectionStore } from "../../../../store/inspectionStore";
import { userInspectionsAPIs } from "../../api/user-inspections";
import {
  useAddExistingQuestionToRoomElement,
  useAddQuestionToRoomElement,
  useDeleteRoomElementQuestions,
  useUpdateSavedQuestion,
} from "../../hooks/inspectionMutations";

const DeleteElement = ({
  isModalOpen,
  onCloseModal,
  elementData,
  elementCategory,
}) => {
  // Hooks
  const { templateId, roomId, inspectionId } = useParams();

  // Global States
  const selectedTemplateRoomElements = useTemplateStore(
    (state) => state.selectedTemplateRoomElements
  );
  const setSelectedTemplateRoomElements = useTemplateStore(
    (state) => state.setSelectedTemplateRoomElements
  );
  const selectedInspectionRoomElements = useInspectionStore(
    (state) => state.selectedInspectionRoomElements
  );
  const setSelectedInspectionRoomElements = useInspectionStore(
    (state) => state.setSelectedInspectionRoomElements
  );

  // Local States
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteElement = useMutation({
    mutationFn: () => {
      setIsDeleting(true);
      if (elementCategory === "inspection") {
        return userInspectionsAPIs.deleteRoomElementFromInspection({
          inspectionId,
          roomId,
          elementIdArray: [elementData._id],
        });
      } else {
        return userDetailsAPIs.deleteElementFromTemplate({
          templateId,
          roomId,
          elementIdArray: [elementData._id],
        });
      }
    },
    onSuccess: () => {
      // Updated Element List
      if (elementCategory === "inspection") {
        const updatedElements = selectedInspectionRoomElements.filter(
          (element) => element._id !== elementData._id
        );
        setSelectedInspectionRoomElements(updatedElements);
      } else {
        const updatedElements = selectedTemplateRoomElements.filter(
          (element) => element._id !== elementData._id
        );
        setSelectedTemplateRoomElements(updatedElements);
      }

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

const AddQuestion = ({
  isModalOpen,
  onCloseModal,
  currentElementId,
  elementCategory,
}) => {
  // Hooks
  const { userId, templateId, roomId, inspectionId } = useParams();

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

  const selectedInspectionRoomElements = useInspectionStore(
    (state) => state.selectedInspectionRoomElements
  );
  const setSelectedInspectionRoomElements = useInspectionStore(
    (state) => state.setSelectedInspectionRoomElements
  );

  // Local States
  const [active, setActive] = useState(0);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);

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

  // State to check if the previewed question is being edited or not
  const [isQuestionBeingEdited, setIsQuestionBeingEdited] = useState(false);

  const [showAddOptionsButton, setShowAddOptionsButton] = useState(true);

  // Question To Preview Form
  const questionToPreviewForm = useForm({
    initialValues: {
      text: "",
      options: [],
      type: "",
      shouldSave: false,
      answerRequired: false,
      isDefault: false,
      _id: "",
    },

    text: (value) => (value.length > 0 ? null : "Question is required!"),
    type: (value) => (value ? null : "Type is required!"),
  });

  // New Question Form
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
      type: (value) => (value ? null : "Type is required!"),
    },
  });

  // Mutations
  // const addSelectedQuestionsToElement = useMutation({
  //   mutationFn: () => {
  //     setIsAddingQuestion(true);

  //     // remove the isdefault, __v, _id keys from the selected questions and add shouldSave key with value false
  //     const questions = selectedQuestions.map((question) => {
  //       const filteredEntries = Object.entries(question).filter(
  //         ([key]) => !["isdefault", "__v", "_id", "user"].includes(key)
  //       );

  //       return {
  //         ...Object.fromEntries(filteredEntries),
  //         shouldSave: false,
  //       };
  //     });

  //     return userDetailsAPIs.addSelectedQuestionsToElement({
  //       templateId: templateId,
  //       roomId: roomId,
  //       elementId: currentElementId,
  //       questions: questions,
  //       userId: userId,
  //     });
  //   },

  //   onSuccess: (data) => {
  //     setIsAddingQuestion(false);
  //     // Update the selectedTemplateRoomElements
  //     const updatedElements = selectedTemplateRoomElements.map((element) => {
  //       if (element._id === currentElementId) {
  //         return {
  //           ...element,
  //           checklist: [...element.checklist, ...data.newChecklistItems],
  //         };
  //       }
  //       return element;
  //     });
  //     setSelectedTemplateRoomElements(updatedElements);
  //     setSelectedQuestions([]);
  //     toast.success("Success!", {
  //       description: "Questions added successfully.",
  //       duration: 3000,
  //     });
  //     onCloseModal();
  //   },

  //   onError: (error) => {
  //     toast.error("Error!", {
  //       description: error.message || "Couldn't add questions.",
  //       duration: 3000,
  //     });
  //     setIsAddingQuestion(false);
  //   },
  // });

  //  Add Existing Question to Room Element - Mutation
  const addSelectedQuestionsToElement = useAddExistingQuestionToRoomElement({
    id: elementCategory === "inspection" ? inspectionId : templateId,
    roomId: roomId,
    userId: userId,
    elementId: currentElementId,
    questions: selectedQuestions.map((question) => {
      const filteredEntries = Object.entries(question).filter(
        ([key]) => !["isdefault", "__v", "_id", "user"].includes(key)
      );

      return {
        ...Object.fromEntries(filteredEntries),
        shouldSave: false,
      };
    }),
    elementCategory: elementCategory,
    updateElementQuestions: (data) => {
      if (elementCategory === "inspection") {
        const updatedElements = selectedInspectionRoomElements.map(
          (element) => {
            if (element._id === currentElementId) {
              return {
                ...element,
                checklist: [...element.checklist, ...data.newChecklistItems],
              };
            }
            return element;
          }
        );
        setSelectedInspectionRoomElements(updatedElements);
      } else {
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
      }
      setSelectedQuestions([]);
      onCloseModal();
    },
  });

  // Create New Question - Mutation
  const createNewQuestion = useAddQuestionToRoomElement({
    id: elementCategory === "inspection" ? inspectionId : templateId,
    roomId: roomId,
    userId: userId,
    elementId: currentElementId,
    newQuestionData: newQuestionForm.values,
    elementCategory: elementCategory,
    updateElementQuestions: (data) => {
      const shouldSaveQuestion = newQuestionForm.values.shouldSave;
      if (shouldSaveQuestion) {
        setSavedQuestions(data.newSavedQuestions[0]);
      }
      if (elementCategory === "inspection") {
        const updatedElements = selectedInspectionRoomElements?.map(
          (element) => {
            if (element._id === currentElementId) {
              return {
                ...element,
                checklist: [...element.checklist, ...data.newChecklistItems],
              };
            }
            return element;
          }
        );

        setSelectedInspectionRoomElements(updatedElements);
      } else {
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
      }
      onCloseModal();
    },
  });

  // const createNewQuestion = useMutation({
  //   mutationFn: () =>
  //     userTemplatesAPIs.createNewQuestion({
  //       templateId: templateId,
  //       roomId: roomId,
  //       userId: userId,
  //       elementId: currentElementId,
  //       questions: [newQuestionForm.values],
  //     }),

  //   onSuccess: (data) => {
  //     const shouldSaveQuestion = newQuestionForm.values.shouldSave;

  //     if (shouldSaveQuestion) {
  //       setSavedQuestions(data.newSavedQuestions[0]);
  //     }

  //     const updatedElements = selectedTemplateRoomElements.map((element) => {
  //       if (element._id === currentElementId) {
  //         return {
  //           ...element,
  //           checklist: [...element.checklist, ...data.newChecklistItems],
  //         };
  //       }
  //       return element;
  //     });

  //     setSelectedTemplateRoomElements(updatedElements);
  //     newQuestionForm.reset();
  //     toast.success("Success!", {
  //       description: "Questions added successfully.",
  //       duration: 3000,
  //     });
  //     onCloseModal();
  //   },
  //   onError: (error) => {
  //     toast.error("Error!", {
  //       description: error.message || "Couldn't create new Question.",
  //       duration: 3000,
  //     });
  //   },
  // });

  const updatePreviewedQuestion = useUpdateSavedQuestion({
    userId: userId,
    questionId: questionToPreviewForm.values._id,
    text: questionToPreviewForm.values.text,
    type: questionToPreviewForm.values.type,
    options: questionToPreviewForm.values.options,
    answerRequired: questionToPreviewForm.values.answerRequired,
    updateElementQuestions: (data) => {
      // Update the Saved Questions
      const updatedQuestions = savedQuestions.map((question) => {
        if (question._id === data.questionTemplate._id) {
          return {
            ...question,
            text: data.questionTemplate.text,
            options: data.questionTemplate.options,
            type: data.questionTemplate.type,
            answerRequired: data.questionTemplate.answerRequired,
            isDefault: data.questionTemplate.isDefault,
          };
        }
        return question;
      });

      setSavedQuestions(updatedQuestions);

      // Hide the preview modal
      setActive(0);
      setIsQuestionBeingEdited(false);
    },
  });

  // UseEffect to filter the already added questions
  useEffect(() => {
    if (active === 0) {
      setIsLoadingQuestions(true);

      let currentElement;

      if (elementCategory !== "inspection") {
        // Find the current Element
        currentElement = selectedTemplateRoomElements?.find(
          (element) => element._id === currentElementId
        );
      } else {
        // Find the current Element from Inspection
        currentElement = selectedInspectionRoomElements?.find(
          (element) => element._id === currentElementId
        );
      }

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

      setIsLoadingQuestions(false);
    }

    // Clean up function
    return () => {};
  }, [
    selectedTemplateRoomElements,
    savedQuestions,
    active,
    currentElementId,
    selectedInspectionRoomElements,
    elementCategory,
  ]);

  // Handle Save Option Icon
  const handleSaveOptionIcon = () => {
    const selectedIconId = QUESTIONS_ICONS_LIST.find(
      (icon) => icon.icon === selectedIcon
    ).id;

    if (isQuestionBeingEdited) {
      const updatedOptions = questionToPreviewForm.values.options.map(
        (option, index) => {
          if (index === iconOptionIndex) {
            return {
              ...option,
              iconId: selectedIconId,
            };
          }
          return option;
        }
      );

      // Update the questionToPreviewForm with the new options
      questionToPreviewForm.setFieldValue("options", updatedOptions);

      setActive(3);
    } else {
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
    }

    setSelectedIcon("");
  };

  // Validate New/Previewed Question Data
  const validateQuestionData = () => {
    const form = isQuestionBeingEdited
      ? questionToPreviewForm
      : newQuestionForm;

    // Validation of the options
    // If we do it inside Form, we don't get the updated state of form
    // So, check fails for the first time, when we change type of question
    if (form.values.type !== "textArea" && form.values.options.length < 2) {
      console.log("There is an error");
      form.setFieldError("options", "At least 2 options required!");

      return console.log("At least 2 options required!");
    }

    // Validate the form
    form.validate();

    // Cancel API call if form is invalid
    if (!form.isValid()) {
      return console.log("Form is invalid");
    }

    if (isQuestionBeingEdited) {
      return updatePreviewedQuestion.mutate();
    }

    //  Create New Question
    createNewQuestion.mutate();
  };

  return (
    <ModalRoot
      id="add-template-question-modal"
      openModal={isModalOpen}
      onClose={() => {
        onCloseModal();
        setIsLoadingQuestions(false);
      }}
      loadingOverlay={
        isLoadingQuestions ||
        addSelectedQuestionsToElement.isPending ||
        createNewQuestion.isPending ||
        updatePreviewedQuestion.isPending
      }
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
                questionToPreviewForm.setValues({
                  _id: question._id,
                  text: question.text,
                  options: question.options,
                  type: question.type,
                  shouldSave: question.shouldSave,
                  answerRequired: question.answerRequired,
                  isDefault: question.isDefault,
                });
                setActive(3);
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
              label="Question"
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
              error={newQuestionForm.errors.type}
            />

            {(newQuestionForm.values.type === "radio" ||
              newQuestionForm.values.type === "dropDown") && (
              <ElementQuestionModal.NewQuestionOptionsList
                title="Options"
                minimumText="Add minimum 2 options"
                showAddButton={showAddOptionsButton}
                setShowAddButton={setShowAddOptionsButton}
                error={newQuestionForm.errors.options}
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
                onClick={validateQuestionData}
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
              onClick={() => {
                if (isQuestionBeingEdited) {
                  setActive(3);
                } else {
                  setActive(1);
                }
              }}
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
        <Stepper.Step id="preview-question">
          <ElementQuestionModal.Root>
            <Button
              id="goBack-to-existing-questions"
              onClick={() => {
                setActive(0);
                setIsQuestionBeingEdited(false);
              }}
              type="button"
              buttonType="iconButton"
              icon={
                <ARROW_RIGHT_ICON className="transform rotate-180 w-[20px] h-[20px]" />
              }
              label="Go Back"
              className="!w-fit !font-semibold !h-fit !text-[18px]"
            />
            <Divider className="w-full !border-t-[1.5px]" color="#E4F0FF" />
            <PreviewQuestion.Root>
              {!isQuestionBeingEdited ? (
                <Group className="!flex-col !gap-[8px] !items-start">
                  <Text className="!text-[14px] text-dark-blue !font-medium">
                    Question
                  </Text>
                  <div className="w-full text-[14px] font-medium p-[12px_16px] rounded-[8px] border border-[#cce2ff]">
                    {questionToPreview.text}
                  </div>
                </Group>
              ) : (
                <TextInput
                  className="w-full"
                  label="Question"
                  placeholder="Question..."
                  {...questionToPreviewForm.getInputProps("text")}
                  disabled={!isQuestionBeingEdited}
                />
              )}

              {isQuestionBeingEdited && (
                <ElementQuestionModal.AnswerTypeSelector
                  label="Answer Type"
                  typeOptions={[
                    { label: "Options", value: "radio" },
                    { label: "Text Field", value: "textArea" },
                    { label: "Drop Down", value: "dropDown" },
                  ]}
                  onSelect={(answerType) => {
                    questionToPreviewForm.setFieldValue("type", answerType);
                  }}
                  error={questionToPreviewForm.errors.type}
                  value={questionToPreviewForm.values.type}
                />
              )}

              {questionToPreview.type === "radio" ||
              questionToPreview.type === "dropDown" ? (
                !isQuestionBeingEdited ? (
                  <PreviewQuestion.OptionsList>
                    {questionToPreview.options.map((option, index) => (
                      <PreviewQuestion.OptionCard
                        key={index}
                        optionNumber={index}
                        optionData={option}
                      />
                    ))}
                  </PreviewQuestion.OptionsList>
                ) : (
                  <ElementQuestionModal.NewQuestionOptionsList
                    title="Options"
                    minimumText="Add minimum 2 options"
                    showAddButton={showAddOptionsButton}
                    setShowAddButton={setShowAddOptionsButton}
                    error={questionToPreviewForm.errors.options}
                  >
                    {!showAddOptionsButton && (
                      <ElementQuestionCard.NewOption
                        onSaveNewOption={(newOptionValue) => {
                          setShowAddOptionsButton(true);
                          questionToPreviewForm.setFieldValue("options", [
                            ...questionToPreviewForm.values.options,
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

                    {questionToPreviewForm.values.options.map(
                      (option, index) => (
                        <ElementQuestionCard.ExistingOption
                          key={index}
                          optionNumber={index}
                          optionData={option}
                          onOpenIconModal={() => {
                            setActive(2);
                            setIconOptionIndex(index);
                          }}
                          onDeleteOption={() => {
                            const newOptions =
                              questionToPreviewForm.values.options.filter(
                                (opt, i) => i !== index
                              );
                            questionToPreviewForm.setFieldValue(
                              "options",
                              newOptions
                            );
                          }}
                        />
                      )
                    )}
                  </ElementQuestionModal.NewQuestionOptionsList>
                )
              ) : (
                <TextInput
                  disabled
                  className="w-full"
                  label="Answer"
                  placeholder="Answer..."
                />
              )}

              <Checkbox
                label="Answer is required"
                {...questionToPreviewForm.getInputProps("answerRequired")}
                checked={questionToPreviewForm.values.answerRequired}
                disabled={!isQuestionBeingEdited}
              />

              <ElementQuestionModal.Actions>
                <Button
                  id="edit-previewed-question"
                  type="button"
                  onClick={() => {
                    isQuestionBeingEdited
                      ? validateQuestionData()
                      : setIsQuestionBeingEdited(true);
                  }}
                  buttonType="contained"
                  label={
                    isQuestionBeingEdited ? "Update Question" : "Edit Question"
                  }
                  className="sm:w-[208px] w-full"
                />
                <Button
                  id="goBack-to-existing-questions-list"
                  label="Go Back"
                  className="!text-primary sm:w-[208px] w-full hover:!bg-[#FF613E] hover:!border-[#FF613E]"
                  type="button"
                  buttonType="outlined"
                  borderColor="#CCE2FF"
                  onClick={() => setActive(0)}
                />
              </ElementQuestionModal.Actions>
            </PreviewQuestion.Root>
          </ElementQuestionModal.Root>
        </Stepper.Step>
      </Stepper>
    </ModalRoot>
  );
};

const DeleteQuestion = ({
  isModalOpen,
  onCloseModal,
  currentElementId,
  questionsList,
  elementCategory,
}) => {
  // Hooks
  const { templateId, roomId, inspectionId } = useParams();

  // Global States
  const selectedTemplateRoomElements = useTemplateStore(
    (state) => state.selectedTemplateRoomElements
  );
  const setSelectedTemplateRoomElements = useTemplateStore(
    (state) => state.setSelectedTemplateRoomElements
  );

  const selectedInspectionRoomElements = useInspectionStore(
    (state) => state.selectedInspectionRoomElements
  );
  const setSelectedInspectionRoomElements = useInspectionStore(
    (state) => state.setSelectedInspectionRoomElements
  );

  const [questionsToDeleteIds, setQuestionsToDeleteIds] = useState([]);

  // Hook to Delete Questions from Elements
  const deleteElementQuestion = useDeleteRoomElementQuestions({
    id: elementCategory === "inspection" ? inspectionId : templateId,
    roomId: roomId,
    elementId: currentElementId,
    checklistIdArray: questionsToDeleteIds,
    setShowDeleteQuestionModal: false,
    updatedRoomElements: () => {
      // Updated CheckList Questions
      const updatedChecklist = questionsList.filter((question) => {
        return !questionsToDeleteIds.includes(question._id);
      });
      if (elementCategory === "inspection") {
        // Updated Template Room Elements
        const updatedTemplateRoomElements = selectedInspectionRoomElements.map(
          (roomElement) => {
            if (roomElement._id === currentElementId) {
              return {
                ...roomElement,
                checklist: updatedChecklist,
              };
            }
            return roomElement;
          }
        );

        setSelectedInspectionRoomElements(updatedTemplateRoomElements);
      } else {
        // Updated Template Room Elements
        const updatedTemplateRoomElements = selectedTemplateRoomElements.map(
          (roomElement) => {
            if (roomElement._id === currentElementId) {
              return {
                ...roomElement,
                checklist: updatedChecklist,
              };
            }
            return roomElement;
          }
        );

        setSelectedTemplateRoomElements(updatedTemplateRoomElements);
      }

      //  Reset Local States
      setQuestionsToDeleteIds([]);
      onCloseModal();
    },
    elementCategory: elementCategory,
  });

  return (
    <ModalRoot
      id="delete-template-roomElement-modal"
      openModal={isModalOpen}
      onClose={() => onCloseModal()}
      loadingOverlay={deleteElementQuestion.isPending}
    >
      <h2 className="text-darkBlue font-bold text-[24px]">
        Delete Question from a Room Element
      </h2>
      <div className="mt-[8px] mb-[16px] flex flex-col gap-[16px] max-h-[250px]">
        <p className="text-darkBlue font-medium text-[16px]">
          Please Select Questions from the list that you want to remove from
          checklist?
        </p>
        <div className="flex flex-col gap-[16px] h-full overflow-auto">
          {questionsList?.map((question, index) => (
            <Checkbox
              key={index}
              color="blue"
              label={question?.text}
              onChange={() =>
                setQuestionsToDeleteIds((prev) => [...prev, question._id])
              }
            />
          ))}
        </div>
      </div>

      <Group className="!w-full md:!flex-row !flex-col !justify-center">
        <Button
          id="delete-template-roomElement-questions"
          type="button"
          label="Delete Questions"
          buttonType="contained"
          buttonColor="#FF4D4F"
          className="sm:w-[216px] w-full font-bold !bg-[#FF4D4F] !text-white"
          onClick={deleteElementQuestion.mutate}
        />
        <Button
          type="button"
          label="Cancel"
          buttonType="outlined"
          borderColor="#CCE2FF"
          className="sm:w-[216px] w-full font-bold !text-[#2A85FF]"
          onClick={() => onCloseModal()}
        />
      </Group>
    </ModalRoot>
  );
};

const InspectionModals = {
  DeleteElement,
  AddQuestion,
  DeleteQuestion,
};

export default InspectionModals;
