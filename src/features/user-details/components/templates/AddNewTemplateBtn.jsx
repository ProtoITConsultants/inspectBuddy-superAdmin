import { cn } from "../../../../utils/cn";
import Button from "../../../../components/ui/Button";

const AddNewTemplateBtn = ({ className, onClick }) => {
  return (
    <div className={cn("flex items-center justify-end", className)}>
      <Button
        id="add-new-template-btn"
        type="button"
        buttonType="contained"
        onClick={onClick}
        label="New Template"
        className="text-white p-[12px_16px] bg-primary font-semibold text-[14px] rounded-[8px]"
      />
    </div>
  );
};

export default AddNewTemplateBtn;
