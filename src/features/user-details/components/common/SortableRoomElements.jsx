/* eslint-disable react-hooks/exhaustive-deps */
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
import { Accordion, Checkbox, TextInput, Tooltip } from "@mantine/core";
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

const Root = ({ children, elementsData, setElementsData }) => {
  const getRoomElementPosition = useMemo(
    () => (id) => elementsData?.findIndex((element) => element._id === id),
    [elementsData] // Only re-compute if elementsData changes
  );

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragEnd = useCallback(
    ({ active, over }) => {
      if (!over) return;

      if (active.id !== over.id) {
        const newRoomsData = arrayMove(
          elementsData,
          getRoomElementPosition(active.id),
          getRoomElementPosition(over.id)
        );

        setElementsData(newRoomsData);
      }
    },
    [elementsData, setElementsData]
  );

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext
        items={elementsData?.map((element) => element._id)}
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
          //   chevron={<IconChevronRight />}
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
          <div
            className="transition-all duration-300 opacity-100 hover:cursor-pointer"
            onClick={() => setShowDeleteConfirmationModal(true)}
          >
            <DELETE_ICON className="text-[#FF613E]" />
          </div>
        )}
      </div>
    </React.Fragment>
  );
});

const ElementDetail = ({ elementQuestions, imageRequired }) => {
  // form
  const elementForm = useForm({
    initialValues: {
      elementNotes: "",
      elementImage: "",
      elementImageIsRequired: imageRequired || false,
      elementQuestions: [],
    },
  });

  // local states

  //  Use Effect to update the element questions state
  const formRef = useRef(elementForm);
  useEffect(() => {
    formRef.current.setFieldValue("elementQuestions", elementQuestions);
    formRef.current.setFieldValue("elementImageIsRequired", imageRequired);

    // clean up
    return () => {};
  }, [elementQuestions, imageRequired]);

  return (
    <React.Fragment>
      <div
        className={`p-[12px_16px] flex flex-col gap-[16px] border-t border-[#cce2ff]`}
      >
        <div className="flex flex-col gap-[8px]">
          <p className="text-[14px] font-semibold text-darkBlue">
            Element Image
          </p>
          <div className="flex items-center gap-[16px]">
            <DEFAULT_ELEMENT_IMAGE />
            <button
              className="bg-[#CBCBCB] font-bold px-[24px] py-[12px] md:text-[16px] text-[14px] text-white hover:cursor-not-allowed rounded-[8px]"
              disabled
            >
              Add an Image
            </button>
          </div>
          <Checkbox
            label="Make it Required"
            checked={elementForm.values.elementImageIsRequired}
            {...elementForm.getInputProps("elementImageIsRequired")}
          />
        </div>

        <TextInput
          label="Notes"
          placeholder="Write a note"
          disabled
          className="w-full font-medium"
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
              elementForm.values.elementQuestions.map((option, index) => (
                <div key={index}>
                  {option?.type === "radio" ? (
                    <RadioQuestion
                      questionNumber={index + 1}
                      question={option?.text}
                      isRequired={option?.answerRequired}
                      options={option?.options}
                    />
                  ) : option?.type === "textArea" ? (
                    <TextAreaQuestion
                      question={option?.text}
                      questionNumber={index + 1}
                      isRequired={option?.answerRequired}
                    />
                  ) : option?.type === "dropDown" ? (
                    <DropDownQuestion
                      questionNumber={index + 1}
                      question={option?.text}
                      isRequired={option?.answerRequired}
                    />
                  ) : null}
                </div>
              ))
            )}

            <div className="flex items-center gap-[16px] md:justify-start justify-between">
              <button
                className={`flex items-center gap-[4px] text-primary !font-semibold`}
                type="button"
                onClick={() => {}}
              >
                <ADD_ICON className="!w-[16px] !h-[16px]" />
                <span className="text-[14px]">Add new Question</span>
              </button>
              <Button
                id="remove-element-questions"
                buttonType="iconButton"
                label="Remove Question"
                type="button"
                onClick={() => {}}
                icon={
                  <DELETE_ICON className="text-[#FF613E] !w-[16px] !h-[16px]" />
                }
                className="flex items-center !gap-[8px] w-fit !text-[#FF613E] !text-[14px] h-fit !font-semibold !p-0"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

// Element Questions According to type
const RadioQuestion = ({ question, options, questionNumber, isRequired }) => (
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
                  {option?.option?.trim().split(" ")[0].charAt(0).toUpperCase()}
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
