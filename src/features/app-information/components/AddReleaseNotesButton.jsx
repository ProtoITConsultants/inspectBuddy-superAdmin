import { ADD_ICON } from "./../../../assets/icons/AddIcon";

const AddReleaseNotesButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 text-primary w-fit"
    >
      <ADD_ICON className="w-4 h-4" />
      <span className="text-md">Add a New Note</span>
    </button>
  );
};

export default AddReleaseNotesButton;
