import { Checkbox, Tooltip } from "@mantine/core";
import { INFO_ICON } from "../../../../assets/icons/InfoIcon";
import { TICK_ICON } from "../../../../assets/icons/TickIcon";
import { CROSS_ICON } from "../../../../assets/icons/CrossIcon";
import UPLOAD_ICON from "./../../../../assets/icons/UploadIcon";

const Form = ({ children, formHeading, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full h-full flex flex-col gap-[24px]"
    >
      <h1 className="text-dark-blue font-bold text-[24px]">{formHeading}</h1>
      {children}
    </form>
  );
};
const FormSection = ({ children, sectionId }) => {
  return (
    <div id={sectionId} className="flex flex-col gap-[16px] w-full">
      {children}
    </div>
  );
};
const FormSectionHeader = ({
  handleSaveRearrangedElement,
  handleCancelNewElementSave,
  onClickRearrange,
  rearrangeElements,
  hasRearrangeBtn,
  toolTipLabel,
  sectionHeading,
}) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-[4px]">
        <h2 className="text-darkBlue font-bold text-[20px]">
          {sectionHeading}
        </h2>
        <Tooltip label={toolTipLabel} className="hover:cursor-pointer">
          <div>
            <INFO_ICON />
          </div>
        </Tooltip>
      </div>
      {rearrangeElements ? (
        <SaveActionBtn
          onSave={handleSaveRearrangedElement}
          onCancel={handleCancelNewElementSave}
        />
      ) : (
        <button
          className={`border-none outline-none text-primary text-[16px] font-semibold ${
            hasRearrangeBtn ? "block" : "hidden"
          }`}
          onClick={onClickRearrange}
        >
          Rearrange
        </button>
      )}
    </div>
  );
};
const FormSectionBody = ({ children }) => {
  return (
    <div className="flex flex-col gap-[16px] flex-1 overflow-hidden">
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
const TemplateRoomImageInput = ({ isChecked, onChange }) => (
  <div className="flex flex-col gap-[8px]">
    <div className="flex flex-col gap-[8px]">
      <p className="text-darkBlue text-[14px] font-medium">Room Images</p>
      <div
        className={`rounded-[8px]  w-full sm:h-[200px] h-fit flex justify-center items-center p-[12px] bg-[#EEEEEE] hover:cursor-not-allowed`}
      >
        <div
          className={` font-medium text-[14px] border-2 flex items-center justify-center gap-[8px] rounded-[8px] h-fit px-[20px] py-[12px] z-1 max-h-[45px] text-white border-[#DEDEDE] bg-[#CBCBCB]`}
        >
          <UPLOAD_ICON />
          <span>Select Image</span>
        </div>
      </div>
    </div>
    <Checkbox
      label="At least 1 room image is required."
      checked={isChecked}
      onChange={onChange}
    />
  </div>
);

const FormActions = ({ children }) => (
  <div className="flex sm:flex-row flex-col gap-[24px] justify-center items-center">
    {children}
  </div>
);

const EditRoomDetails = {
  Form,
  FormSection,
  FormSectionHeader,
  FormSectionBody,
  TemplateRoomImageInput,
  FormActions,
};

export default EditRoomDetails;
