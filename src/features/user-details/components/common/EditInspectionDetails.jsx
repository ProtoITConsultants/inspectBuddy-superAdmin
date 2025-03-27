import { cn } from "../../../../utils/cn";
import { ADD_ICON } from "./../../../../assets/icons/AddIcon";
import {
  DISABLED_TICK_ICON,
  TICK_ICON,
} from "./../../../../assets/icons/TickIcon";
import { CROSS_ICON } from "./../../../../assets/icons/CrossIcon";
import React, { useCallback, useEffect, useState } from "react";

// Dragable DND Library
import { CSS } from "@dnd-kit/utilities";
import {
  closestCorners,
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { DELETE_ICON } from "../../../../assets/icons/DynamicIcons";
import { Link } from "react-router";
import { REARRANGE_ITEM_ICON } from "../../../../assets/icons/RearrangeIcon";
import { ARROW_RIGHT_ICON } from "../../../../assets/icons/ArrowRight";

const Root = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col gap-[24px] h-full", className)}>
      {children}
    </div>
  );
};

const SaveActionBtn = ({ onSave, onCancel }) => {
  return (
    <div className="flex gap-[16px] items-center">
      <button
        className="border-none outline-none focus:outline-none"
        onClick={onSave}
      >
        <TICK_ICON />
      </button>
      <button
        className="border-none outline-none focus:outline-none"
        onClick={onCancel}
      >
        <CROSS_ICON />
      </button>
    </div>
  );
};

const RearrangeElementsBtn = ({ onClick }) => {
  return (
    <button
      className={`border-none outline-none text-primary text-[16px] !font-semibold`}
      onClick={onClick}
    >
      Rearrange
    </button>
  );
};

const AddNewItemBtn = ({ onClick, title, showButton }) => {
  return (
    <button
      className={`flex items-center gap-[4px] text-primary !font-semibold text-[18px] mx-auto ${
        showButton ? "block" : "hidden"
      }`}
      type="button"
      onClick={onClick}
    >
      <ADD_ICON />
      <span>{title}</span>
    </button>
  );
};

const Header = ({ children, className, heading }) => (
  <div className={cn("flex items-center justify-between", className)}>
    <h1 className="text-dark-blue font-bold text-[24px] capitalize leading-none">
      {heading}
    </h1>
    {children}
  </div>
);

const NewRoomCard = ({ onCancel, onSaveNewItem }) => {
  const [newItemName, setNewItemName] = useState("");

  return (
    <div className={`flex items-center gap-[12px] w-full`}>
      <div
        className={`bg-white border rounded-[8px] px-[16px] py-[12px] border-[#CCE2FF] flex justify-between items-center hover:cursor-pointer flex-1 transition-all duration-300 gap-[16px]`}
      >
        <input
          className="border-none outline-none focus:outline-none flex-1 caret-primary text-darkBlue font-medium text-[16px]"
          id="new-room-input-field"
          name="new-room-input-field"
          onChange={(e) => setNewItemName(e.target.value)}
          value={newItemName}
          placeholder="Add Room Name"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && newItemName.length > 2) {
              onSaveNewItem(newItemName);
            }
          }}
        />
        <button
          className="border-none outline-none focus:outline-none"
          onClick={() => {
            onSaveNewItem(newItemName);
            setNewItemName("");
          }}
          type="button"
          disabled={!newItemName}
        >
          {!newItemName ? <DISABLED_TICK_ICON /> : <TICK_ICON />}
        </button>
        <button
          className="border-none outline-none focus:outline-none"
          onClick={() => {
            onCancel();
            setNewItemName("");
          }}
          type="button"
        >
          <CROSS_ICON />
        </button>
      </div>
    </div>
  );
};

const EditInspectionBody = ({ children }) => (
  <div className="flex flex-col gap-[16px] h-fit !max-h-[calc(100%-152px)] overflow-auto">
    {children}
  </div>
);

const EditActions = ({ children }) => (
  <div className="flex md:flex-row flex-col items-center justify-center md:gap-[24px] gap-[16px] mt-[8px]">
    {children}
  </div>
);

const NoRoomsMessage = () => {
  return (
    <div className={`flex justify-center items-center`}>
      <p className="text-dark-blue text-[16px] text-center">
        No Room found! <br />
        Click on the button below to add a room!.
      </p>
    </div>
  );
};

const SortableRoomsList = ({ children, roomsData, onDragEnd }) => {
  const getRoomPosition = (id) => {
    return roomsData.findIndex((room) => room?._id === id);
  };

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  const handleDragEnd = useCallback(
    ({ active, over }) => {
      if (!over) return;
      if (active.id !== over.id) {
        const oldIndex = getRoomPosition(active.id);
        const newIndex = getRoomPosition(over.id);
        const updatedRoomsArray = arrayMove(roomsData, oldIndex, newIndex);
        onDragEnd(updatedRoomsArray);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roomsData, onDragEnd]
  );

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext
        items={roomsData.map((room) => room?._id)} // Use unique IDs for items
        strategy={verticalListSortingStrategy}
        sensors={sensors}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};

const SortableRoomCard = ({ id, rearrangingRooms, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: rearrangingRooms ? CSS.Transform.toString(transform) : undefined,
    transition: rearrangingRooms ? transition : undefined,
  };

  return (
    <div
      ref={rearrangingRooms ? setNodeRef : null}
      {...(rearrangingRooms ? attributes : {})}
      {...(rearrangingRooms ? listeners : {})}
      style={style}
    >
      {children}
    </div>
  );
};

const ExistingRoomCard = ({
  itemData,
  rearrangingRooms,
  onClickDeleteRoom,
}) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setShowDeleteIcon(true);
    }

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setShowDeleteIcon(true);
      } else {
        setShowDeleteIcon(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <div
      className={`space-x-[12px] flex items-center ${
        showDeleteIcon && !rearrangingRooms ? "w-[calc(100%-10px)]" : "w-full"
      } md:transition-all md:duration-300`}
      onMouseEnter={() => setShowDeleteIcon(true)}
      onMouseLeave={() => setShowDeleteIcon(false)}
      style={{
        touchAction: "none",
      }}
    >
      {rearrangingRooms ? (
        <React.Fragment>
          <REARRANGE_ITEM_ICON className="hover:cursor-grab" />
          <div
            className={`bg-[#F3F8FF] border rounded-[8px] px-[16px] py-[12px] border-[#CCE2FF] flex justify-between items-center hover:cursor-pointer flex-1 transition-all duration-300 `}
          >
            <p className="text-darkBlue font-medium text-[16px]">
              {itemData?.name}
            </p>

            <div className="flex items-center gap-x-[60px]">
              <p className="text-[#6C727F] text-[14px] font-medium">
                {itemData?.elementCount}&nbsp;
                {itemData?.elementCount > 1 ? "Elements" : "Element"}
              </p>
              <ARROW_RIGHT_ICON />
            </div>
          </div>
        </React.Fragment>
      ) : (
        <Link
          to={`room/${itemData?._id}`}
          state={{
            elementsData: itemData?.elements,
            roomName: itemData?.name,
            roomId: itemData?.roomId,
          }}
          className={`border rounded-[8px] px-[16px] py-[12px] flex justify-between items-center hover:cursor-pointer flex-1 transition-all duration-300 ${
            itemData.isCompleted
              ? "bg-[#E8F3E4] border-[#55c35392] "
              : "border-[#CCE2FF] bg-[#F3F8FF]"
          }`}
        >
          <p className="text-darkBlue font-medium text-[16px]">
            {itemData?.name}
          </p>
          <div className="flex items-center md:gap-x-[60px] gap-x-[32px]">
            <p className="text-[#6C727F] text-[14px] font-medium">
              {itemData?.elementCount}&nbsp;
              {itemData?.elementCount > 1 ? "Elements" : "Element"}
            </p>
            <ARROW_RIGHT_ICON />
          </div>
        </Link>
      )}

      {showDeleteIcon && !rearrangingRooms && (
        <div
          className="transition-all duration-300 opacity-100 hover:cursor-pointer"
          onClick={onClickDeleteRoom}
        >
          <DELETE_ICON className="text-[#FF613E]" />
        </div>
      )}
    </div>
  );
};

const EditInspection = {
  Root,
  NewRoomCard,
  EditInspectionBody,
  EditActions,
  Header,
  SaveActionBtn,
  RearrangeElementsBtn,
  AddNewItemBtn,
  NoRoomsMessage,
  SortableRoomsList,
  SortableRoomCard,
  ExistingRoomCard,
};

export default EditInspection;
