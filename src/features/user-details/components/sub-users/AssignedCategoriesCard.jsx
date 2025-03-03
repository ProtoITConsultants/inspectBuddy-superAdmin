import { Tooltip } from "@mantine/core";

const AssignedCategoriesCard = ({ assignedCategories, totalCategories }) => {
  const assignedCategoriesCount = assignedCategories.length;

  const tooltipCategories = assignedCategories.map(
    (category) => category.value
  );

  return (
    <Tooltip
      label={tooltipCategories.join(", ")}
      multiline
      w={200}
      transitionProps={{ transition: "pop-bottom-left", duration: 300 }}
    >
      <div className="p-[8px] bg-[#2a85ff24] rounded-[8px] hover:cursor-pointer h-fit">
        <p className="text-[14px] font-bold text-primary">
          {assignedCategoriesCount < totalCategories
            ? assignedCategoriesCount
            : "All"}
          &nbsp;
          {assignedCategoriesCount > 1 ? "Categories" : "Category"}
        </p>
      </div>
    </Tooltip>
  );
};

export default AssignedCategoriesCard;
