import {
  closestCorners,
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Accordion, Checkbox, Textarea, Tooltip } from "@mantine/core";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DELETE_ICON } from "../../../../assets/icons/DynamicIcons";
import { REARRANGE_ITEM_ICON } from "../../../../assets/icons/RearrangeIcon";
// import { useTemplateStore } from "../../../../store/templateStore";
import { DEFAULT_ELEMENT_IMAGE } from "../../../../assets/icons/DefaultElementImage";
import { INFO_ICON } from "../../../../assets/icons/InfoIcon";
import Button from "../../../../components/ui/Button";
import { ADD_ICON } from "../../../../assets/icons/AddIcon";
import { useForm } from "@mantine/form";
import { QUESTIONS_ICONS_LIST } from "../../../../constants/QuestionsIcons";
import { IconChevronDown } from "@tabler/icons-react";
import { CSS } from "@dnd-kit/utilities";
import InspectionModals from "./InspectionModals";
import { cn } from "../../../../utils/cn";
import ElementQuestion from "../inspections/details/ElementQuestion";
import { useInspectionStore } from "../../../../store/inspectionStore";
import { EDIT_DETAILS_ICON } from "../../../../assets/icons/EditIcon";
import imageCompression from "browser-image-compression";
import { useMutation } from "@tanstack/react-query";
import { userInspectionsAPIs } from "../../api/user-inspections";
import { useParams } from "react-router";
import LoadingBackdrop from "../../../../components/ui/LoadingBackdrop";
import debounce from "lodash.debounce";

const Root = ({ children, items, onRearrangeItems }) => {
  // Global States
  const getRoomElementPosition = useMemo(
    () => (id) => items?.findIndex((element) => element?._id === id),
    [items]
  );

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragEnd = useCallback(
    ({ active, over }) => {
      if (!over) return;

      if (active.id !== over.id) {
        const newRoomsData = arrayMove(
          items,
          getRoomElementPosition(active.id),
          getRoomElementPosition(over.id)
        );

        onRearrangeItems(newRoomsData);
      }
    },
    [items, getRoomElementPosition, onRearrangeItems]
  );

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext
        items={items.map((element) => element._id)}
        strategy={verticalListSortingStrategy}
        sensors={sensors}
      >
        <Accordion
          id={`room-element-items-accordion`}
          radius="md"
          classNames={{
            chevron:
              "!text-[#6c727f] !text-[15px] templateRoomElementAccordian",
          }}
          transitionDuration={500}
          className="w-full space-y-[16px]"
          variant="filled"
        >
          {children}
        </Accordion>
      </SortableContext>
    </DndContext>
  );
};

const RoomElement = React.memo(function RoomElement({
  id,
  element,
  rearrangingElements,
  elementCategory,
  onEditElementName,
  children,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = useMemo(
    () => ({
      transform: rearrangingElements
        ? CSS.Transform.toString(transform)
        : undefined,
      transition: rearrangingElements ? transition : undefined,
      width: "100%",
      touchAction: "none",
    }),
    [rearrangingElements, transform, transition]
  );

  const [accordionOpen, setAccordionOpen] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);

  // show Delete icon will be true if the window with if less tban 768px
  useEffect(() => {
    const updateShowDeleteIcon = () => {
      if (window.innerWidth < 768) {
        setShowDeleteIcon(true);
      }
    };

    updateShowDeleteIcon();

    window.addEventListener("resize", updateShowDeleteIcon);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateShowDeleteIcon);
    };
  }, []);

  return (
    <React.Fragment>
      {showDeleteConfirmationModal && (
        <InspectionModals.DeleteElement
          isModalOpen={showDeleteConfirmationModal}
          onCloseModal={() => setShowDeleteConfirmationModal(false)}
          elementData={{
            _id: element._id,
            name: element.name,
          }}
          onDeleteSuccess={() => {
            setShowDeleteConfirmationModal(false);
          }}
          elementCategory={elementCategory}
        />
      )}

      <div
        ref={rearrangingElements ? setNodeRef : null}
        {...(rearrangingElements ? attributes : {})}
        {...(rearrangingElements ? listeners : {})}
        style={style}
        className={`gap-[12px] flex items-center ${
          showDeleteIcon && !rearrangingElements
            ? "!w-[calc(100%-10px)]"
            : "!w-full"
        } ${!rearrangingElements ? "md:transition-all md:duration-300" : ""}`}
        onMouseEnter={() => {
          if (!accordionOpen && !showDeleteIcon) {
            setShowDeleteIcon(true);
          }
        }}
        onMouseLeave={() => {
          if (showDeleteIcon) {
            setShowDeleteIcon(false);
          }
        }}
      >
        {rearrangingElements && (
          <REARRANGE_ITEM_ICON className="hover:cursor-grab" />
        )}
        <div
          className={`flex-1 !border !border-[#CCE2FF] !rounded-[8px] !overflow-hidden`}
        >
          <Accordion.Item value={String(id)}>
            <Accordion.Control
              className={`!text-[16px] !text-dark-blue !font-medium`}
              onClick={() => {
                setAccordionOpen(!accordionOpen);
                window.innerWidth < 768
                  ? setShowDeleteIcon(!showDeleteIcon)
                  : setShowDeleteIcon(false);
              }}
            >
              <div className="flex items-center justify-between md:pr-[60px] pr-[20px]">
                {element.name}
                <p className="text-[#6C727F] text-[14px] font-medium">
                  {element?.checklist.length}&nbsp;
                  {element?.checklist.length > 1 ? "Questions" : "Question"}
                </p>
              </div>
            </Accordion.Control>
            <Accordion.Panel id={id}>{children}</Accordion.Panel>
          </Accordion.Item>
        </div>
        {showDeleteIcon && !rearrangingElements && (
          <>
            <button
              type="button"
              className="transition-all duration-300 opacity-100 hover:cursor-pointer"
              onClick={() => onEditElementName()}
            >
              <EDIT_DETAILS_ICON className="w-[20px] text-gray-500" />
            </button>
            <div
              className="transition-all duration-300 opacity-100 hover:cursor-pointer"
              onClick={() => setShowDeleteConfirmationModal(true)}
            >
              <DELETE_ICON className="text-[#FF613E]" />
            </div>
          </>
        )}
      </div>
    </React.Fragment>
  );
});

const ElementDetail = ({
  elementQuestions,
  imageRequired,
  elementId,
  makeInputsDisabled,
  elementCategory,
  elementImage,
  elementNotes,
}) => {
  const { inspectionId, roomId, userId } = useParams();

  // Global States
  const selectedInspectionRoomElements = useInspectionStore(
    (state) => state.selectedInspectionRoomElements
  );
  const setSelectedInspectionRoomElements = useInspectionStore(
    (state) => state.setSelectedInspectionRoomElements
  );

  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);

  // form
  const elementForm = useForm({
    initialValues: {
      elementNotes: "",
      elementImage: "",
      elementImageIsRequired: imageRequired || false,
      elementQuestions: [],
    },
  });

  //  Use Effect to update the element questions state
  const formRef = useRef(elementForm);
  useEffect(() => {
    formRef.current.setFieldValue("elementQuestions", elementQuestions);
    formRef.current.setFieldValue("elementImageIsRequired", imageRequired);
    if (elementCategory === "inspection") {
      formRef.current.setFieldValue("elementImage", elementImage || "");
      formRef.current.setFieldValue("elementNotes", elementNotes);
    }
    // clean up
    return () => {};
  }, [elementQuestions, imageRequired, elementCategory]);

  const updateElementImage = useMutation({
    mutationFn: async (e) => {
      const imageFile = e.target.files[0];
      const inputFile = e.target;

      // Image Compression Options
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(imageFile, options);

        // Reset the input field value so onChange can be triggered again if the same image is uploaded
        inputFile.value = null;

        return userInspectionsAPIs.updateRoomElementImage({
          userId,
          inspectionId,
          roomId,
          elementId,
          image: compressedFile,
        });
      } catch (error) {
        console.log("Error in Compression: ", error);
        throw new Error("Image compression failed");
      }
    },

    onSuccess: (data) => {
      const updatedElementData = selectedInspectionRoomElements.map((room) => {
        if (room._id === elementId) {
          return {
            ...room,
            image: data?.newImage,
          };
        }
        return room;
      });

      setSelectedInspectionRoomElements(updatedElementData);

      // Update the form value
      formRef.current.setFieldValue("elementImage", data?.newImage);
    },
  });

  // Handle Change Question Answer
  const handleChangeAnswer = (questionData) => {
    const { questionId, answer } = questionData;

    const updatedElementQuestions = elementForm.values.elementQuestions.map(
      (question) =>
        question._id === questionId ? { ...question, answer: answer } : question
    );

    elementForm.setFieldValue("elementQuestions", updatedElementQuestions);

    const updatedRoomElements = selectedInspectionRoomElements.map((room) => {
      if (room._id === elementId) {
        return { ...room, checklist: updatedElementQuestions };
      }
      return room;
    });

    setSelectedInspectionRoomElements(updatedRoomElements);
  };

  const handleChangeElementNotes = useCallback(
    debounce(({ text }) => {
      const updatedRoomElements = selectedInspectionRoomElements.map(
        (element) => {
          if (element._id === elementId) {
            return {
              ...element,
              note: text,
            };
          }
          return element;
        }
      );

      setSelectedInspectionRoomElements(updatedRoomElements);
    }, 500),
    [selectedInspectionRoomElements, elementId]
  );

  return (
    <React.Fragment>
      {updateElementImage.isPending && <LoadingBackdrop />}

      {showAddQuestionModal && (
        <InspectionModals.AddQuestion
          isModalOpen={showAddQuestionModal}
          onCloseModal={() => setShowAddQuestionModal(false)}
          currentElementId={elementId}
          elementCategory={elementCategory}
        />
      )}

      {showDeleteQuestionModal && (
        <InspectionModals.DeleteQuestion
          isModalOpen={showDeleteQuestionModal}
          onCloseModal={() => setShowDeleteQuestionModal(false)}
          currentElementId={elementId}
          questionsList={elementQuestions}
          elementCategory={elementCategory}
        />
      )}
      <div
        className={`p-[12px_16px] flex flex-col gap-[16px] border-t border-[#cce2ff]`}
      >
        <div className="flex flex-col gap-[8px]">
          <p className="text-[14px] font-semibold text-darkBlue">
            Element Image{imageRequired && ` *`}
          </p>
          <div className="flex items-center gap-[16px]">
            {elementForm?.values?.elementImage?.url ? (
              <img
                src={elementForm.values.elementImage?.url}
                alt="element-img"
                className="w-[100px] h-[100px] rounded-sm object-cover"
              />
            ) : (
              <DEFAULT_ELEMENT_IMAGE />
            )}

            {!makeInputsDisabled ? (
              <React.Fragment>
                <input
                  type="file"
                  accept="/image/*"
                  hidden
                  id={`${elementId}-img`}
                  onChange={(e) => updateElementImage.mutate(e)}
                />
                <label
                  htmlFor={`${elementId}-img`}
                  className="bg-primary font-bold px-[24px] py-[12px] md:text-[16px] text-[14px] text-white cursor-pointer rounded-[8px]"
                >
                  {elementForm.values.elementImage
                    ? "Change Image"
                    : "Add an Image"}
                </label>
              </React.Fragment>
            ) : (
              <div
                className={cn(
                  "font-bold px-[24px] py-[12px] md:text-[16px] text-[14px] text-white hover:cursor-not-allowed rounded-[8px] bg-[#CBCBCB]"
                )}
              >
                Add an Image
              </div>
            )}
          </div>
          {makeInputsDisabled && (
            <Checkbox
              label="Make it Required"
              checked={elementForm.values.elementImageIsRequired}
              {...elementForm.getInputProps("elementImageIsRequired")}
            />
          )}
        </div>

        <Textarea
          label="Notes"
          placeholder="Write a note"
          disabled={makeInputsDisabled}
          value={elementForm.values.elementNotes}
          error={elementForm.errors.elementNotes}
          onChange={(e) => {
            elementForm.setFieldValue("elementNotes", e.target.value);

            handleChangeElementNotes({
              text: e.target.value,
            });
          }}
          // {...elementForm.getInputProps("elementNotes")}
          className="w-full font-medium"
          autosize
        />
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[4px]">
            <h2 className="text-darkBlue font-semibold text-[14px]">
              Checklist
            </h2>
            <Tooltip
              label="Add answers to all questions below!"
              className="hover:cursor-pointer"
            >
              <div>
                <INFO_ICON />
              </div>
            </Tooltip>
          </div>

          <div className="flex flex-col gap-[16px]">
            {elementForm.values.elementQuestions.length < 1 ? (
              <div className="text-[14px] text-gray-500">
                No questions added! Add questions by clicking the button below.
              </div>
            ) : (
              elementForm.values.elementQuestions.map((option, index) => {
                // console.log("Option", option);
                return (
                  <div key={index}>
                    {option?.type === "radio" ? (
                      !makeInputsDisabled ? (
                        <ElementQuestion.Radio
                          id={option?._id}
                          label={`${index + 1}. ${option?.text}`}
                          isRequired={option?.answerRequired}
                          options={option?.options}
                          value={option?.answer}
                          onChange={(value) => {
                            handleChangeAnswer({
                              questionId: option?._id,
                              answer: value,
                            });
                          }}
                        />
                      ) : (
                        <RadioQuestion
                          questionNumber={index + 1}
                          question={option?.text}
                          isRequired={option?.answerRequired}
                          options={option?.options}
                        />
                      )
                    ) : option?.type === "textArea" ? (
                      makeInputsDisabled ? (
                        <TextAreaQuestion
                          question={option?.text}
                          questionNumber={index + 1}
                          isRequired={option?.answerRequired}
                        />
                      ) : (
                        <ElementQuestion.TextArea
                          label={`${index + 1}. ${option?.text}`}
                          isRequired={option?.answerRequired}
                          value={option?.answer}
                          onChange={(value) => {
                            const updatedChecklist =
                              elementForm.values.elementQuestions.map(
                                (question) => {
                                  if (question._id === option._id) {
                                    return {
                                      ...question,
                                      answer: value,
                                    };
                                  }
                                  return question;
                                }
                              );

                            elementForm.setFieldValue(
                              "elementQuestions",
                              updatedChecklist
                            );

                            const updatedRoomElements =
                              selectedInspectionRoomElements.map((room) => {
                                if (room._id === elementId) {
                                  return {
                                    ...room,
                                    checklist: updatedChecklist,
                                  };
                                }
                                return room;
                              });

                            setSelectedInspectionRoomElements(
                              updatedRoomElements
                            );
                          }}
                        />
                      )
                    ) : option?.type === "dropDown" ? (
                      makeInputsDisabled ? (
                        <DropDownQuestion
                          questionNumber={index + 1}
                          question={option?.text}
                          isRequired={option?.answerRequired}
                        />
                      ) : (
                        <ElementQuestion.DropDown
                          label={`${index + 1}. ${option?.text}`}
                          isRequired={option?.answerRequired}
                          options={option?.options}
                          value={option?.answer}
                          onChange={(value) => {
                            const updatedChecklist =
                              elementForm.values.elementQuestions.map(
                                (question) => {
                                  if (question._id === option._id) {
                                    return {
                                      ...question,
                                      answer: value,
                                    };
                                  }
                                  return question;
                                }
                              );

                            elementForm.setFieldValue(
                              "elementQuestions",
                              updatedChecklist
                            );

                            const updatedRoomElements =
                              selectedInspectionRoomElements.map((room) => {
                                if (room._id === elementId) {
                                  return {
                                    ...room,
                                    checklist: updatedChecklist,
                                  };
                                }
                                return room;
                              });

                            setSelectedInspectionRoomElements(
                              updatedRoomElements
                            );
                          }}
                        />
                      )
                    ) : null}
                  </div>
                );
              })
            )}

            <div className="flex items-center gap-[16px] md:justify-start justify-between">
              <button
                className={`flex items-center gap-[4px] text-primary !font-semibold`}
                type="button"
                onClick={() => setShowAddQuestionModal(true)}
              >
                <ADD_ICON className="!w-[16px] !h-[16px]" />
                <span className="text-[14px]">Add new Question</span>
              </button>
              <Button
                id="remove-element-questions"
                buttonType="iconButton"
                label="Remove Question"
                type="button"
                onClick={() => setShowDeleteQuestionModal(true)}
                icon={
                  <DELETE_ICON className="text-[#FF613E] !w-[16px] !h-[16px]" />
                }
                className="flex items-center !gap-[8px] w-fit !text-[#FF613E] !text-[14px] h-fit !font-semibold !p-0 !bg-transparent"
                disabled={elementForm.values.elementQuestions.length < 1}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

// Element Questions According to type
const RadioQuestion = ({ question, options, questionNumber, isRequired }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-[14px] font-medium text-darkBlue">
        {questionNumber}. {question}
        {isRequired && " *"}
      </p>
      <div className="bg-[#EEEEEE] flex p-[4px] rounded-[8px] h-[65px] w-fit opacity-60 hover:cursor-not-allowed">
        {options.map((option) => (
          <div
            key={option._id}
            className="md:w-[183px] sm:w-[120px] w-fit flex justify-center items-center"
          >
            <div
              className={`p-[8px] flex flex-col items-center justify-center gap-[4px] h-full text-gray-dark rounded-[8px] w-full sm:p-0 px-[30px] py-[9px]`}
            >
              {option.iconId ? (
                <div className="w-[20px] h-[20px] flex justify-center items-center">
                  {
                    QUESTIONS_ICONS_LIST.find(
                      (icon) => icon?.id === Number(option.iconId)
                    )?.icon
                  }
                </div>
              ) : (
                <div
                  className={`border rounded-full w-[20px] h-[20px] flex justify-center items-center border-gray-dark`}
                >
                  <p className="text-[12px] font-medium leading-none">
                    {option?.option
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TextAreaQuestion = ({ question, questionNumber, isRequired }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-[14px] font-medium">
        {questionNumber}. {question}
        {isRequired && " *"}
      </p>
      <div className="w-full h-[48px] flex items-center bg-[#eeeeee] border border-[#dedede] rounded-[8px] p-[12px_16px] opacity-60">
        <p className="text-[14px] text-darkBlue font-medium opacity-50">
          Answer
        </p>
      </div>
    </div>
  );
};

const DropDownQuestion = ({ question, questionNumber, isRequired }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-[14px] font-medium">
        {questionNumber}. {question}
        {isRequired && " *"}
      </p>
      <div className="w-full h-[48px] flex items-center justify-between bg-[#eeeeee] border border-[#dedede] rounded-[8px] p-[12px_16px] opacity-60">
        <p className="text-[14px] text-darkBlue font-medium opacity-50">
          Select Answer
        </p>
        <IconChevronDown className="text-[#9EA3AE]" />
      </div>
    </div>
  );
};

const SortableItemsList = {
  Root,
  RoomElement,
  ElementDetail,
};

export default SortableItemsList;
