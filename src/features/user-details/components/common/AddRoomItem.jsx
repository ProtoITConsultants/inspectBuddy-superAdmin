import { useState } from "react";
import { CROSS_ICON } from "../../../../assets/icons/CrossIcon";
import {
  DISABLED_TICK_ICON,
  TICK_ICON,
} from "../../../../assets/icons/TickIcon";

const AddRoomItem = ({ onCancel, onSaveNewItem, placeholder }) => {
  const [newItemName, setNewItemName] = useState("");

  return (
    <div className={`flex items-center gap-[12px] w-full`}>
      <div
        className={`bg-white border rounded-[8px] px-[16px] py-[12px] border-[#CCE2FF] flex justify-between items-center hover:cursor-pointer flex-1 transition-all duration-300 gap-[16px]`}
      >
        <input
          className="border-none outline-none focus:outline-none flex-1 caret-primary text-darkBlue font-medium text-[16px]"
          id="new-item-input-field"
          name="new-item-input-field"
          onChange={(e) => setNewItemName(e.target.value)}
          value={newItemName}
          placeholder={placeholder}
          autoFocus
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

export default AddRoomItem;
