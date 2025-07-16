import { TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";

const ReleaseNotesInput = ({ value, onChange, onDelete, isEditing, error }) => {
  return (
    <div className="flex flex-col gap-[5px]">
      <div className="flex items-center gap-4">
        <TextInput
          className="!w-full"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={!isEditing}
        />
        {isEditing && (
          <button type="button" onClick={onDelete}>
            <IconX color="#EC8247" />
          </button>
        )}
      </div>
      <span className="text-[12px] text-[#fa5252]">{error}</span>
    </div>
  );
};

export default ReleaseNotesInput;
