import { ADD_ICON } from "../../../../assets/icons/AddIcon";

const AddNewItemButton = ({ onClick, title, showButton }) => {
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

export default AddNewItemButton;
