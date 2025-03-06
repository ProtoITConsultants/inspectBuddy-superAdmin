import { Switch } from "@mantine/core";

export const UserDetailsGrid = ({ children }) => {
  return (
    <div className="md:grid grid-cols-2 flex flex-col md:gap-x-[24px] gap-y-[16px]">
      {children}
    </div>
  );
};

export const UserDetailsItem = ({ title, value }) => {
  return (
    <div className="flex flex-col gap-[8px]">
      <p className="text-[16px] text-darkBlue font-medium">{title}</p>
      <div className="text-[16px] text-[#777B8B] font-medium p-[12px_16px] bg-[#EEEEEE] border border-[#DEDEDE] rounded-[8px]">
        {value}
      </div>
    </div>
  );
};

const UserSelectedCategoriesChip = ({ label }) => {
  return (
    <div className="text-[14px] text-[#777B8B] font-medium bg-[#DCDCDC] rounded-[8px] p-[8px] w-fit">
      {label}
    </div>
  );
};

export const AssignedCategoriesSection = ({ assignedCategories }) => {
  return (
    <div className="flex flex-col gap-[8px] col-span-2">
      <p className="text-[16px] text-darkBlue font-medium">
        Assigned Categories
      </p>
      <div className="flex items-center gap-[8px]">
        {assignedCategories.map((category) => (
          <UserSelectedCategoriesChip
            key={category._id}
            label={category.value}
          />
        ))}
      </div>
    </div>
  );
};

export const SwitchItem = ({ label, checked, onChange, disabled }) => {
  return (
    <div className="col-span-2">
      <Switch
        checked={checked}
        label={label}
        onChange={onChange ? onChange : () => {}}
        disabled={disabled ? disabled : false}
      />
    </div>
  );
};
