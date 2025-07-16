import { EDIT_DETAILS_ICON } from "../../../../assets/icons/EditIcon";
import "./EditAppInfoButton.css";

const EditAppInfoButton = ({ onClick }) => {
  return (
    <div id="edit-app-info-button-container">
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-2 text-dark-blue p-[10px_16px] rounded-lg border border-[#CCE2FF] hover:shadow transition-all duration-200"
      >
        <EDIT_DETAILS_ICON className="w-4 h-4 opacity-50" />
        <span className="text-md">Edit Details</span>
      </button>
    </div>
  );
};

export default EditAppInfoButton;
