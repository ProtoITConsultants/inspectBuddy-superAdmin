import { cn } from "../../../../utils/cn";

const TemplateCategoryCard = ({ templateType }) => {
  const isDefault = templateType === "default";
  const isDraft = templateType === "draft";
  const isPublished = templateType === "published";

  const baseClasses =
    "h-[35px] w-fit flex justify-center items-center rounded-[8px] p-[8px]";

  const categoryClasses = cn(
    baseClasses,
    isDefault && "text-[#5AA63F] bg-[#5aa63f24]",
    isDraft && "text-[#ec8247] bg-[#ec824724]",
    isPublished && "text-primary bg-[#2a85ff24]"
  );

  const label = isDefault
    ? "Default Template"
    : isDraft
    ? "Drafted"
    : "Published";

  return (
    <div className={categoryClasses}>
      <p className="text-[12px] font-medium leading-none text-center">
        {label}
      </p>
    </div>
  );
};

export default TemplateCategoryCard;
