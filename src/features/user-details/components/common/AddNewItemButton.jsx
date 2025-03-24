import { ADD_ICON } from "../../../../assets/icons/AddIcon";
import { cn } from "../../../../utils/cn";

const AddNewItemButton = ({ onClick, title, showButton, className = "" }) => {
  return (
    <button
      className={cn(
        `items-center gap-[4px] text-primary !font-semibold text-[18px]`,
        {
          flex: showButton,
          hidden: !showButton,
        },
        className
      )}
      type="button"
      onClick={onClick}
    >
      <ADD_ICON />
      <span>{title}</span>
    </button>
  );
};

export default AddNewItemButton;
