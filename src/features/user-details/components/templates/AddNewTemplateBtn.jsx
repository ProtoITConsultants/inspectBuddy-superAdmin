import { Link } from "react-router";
import { cn } from "../../../../utils/cn";

const AddNewTemplateBtn = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-end", className)}>
      <Link
        id="add-template"
        to="add-new-template"
        className="text-white p-[12px_16px] bg-primary font-semibold text-[14px] rounded-[8px]"
      >
        New Template
      </Link>
    </div>
  );
};

export default AddNewTemplateBtn;
