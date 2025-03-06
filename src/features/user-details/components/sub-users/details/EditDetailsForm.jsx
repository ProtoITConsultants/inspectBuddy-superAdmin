import { Input } from "@mantine/core";
import { IMaskInput } from "react-imask";

export const SubUserFormGrid = ({ children, onSubmit }) => {
  return (
    <form
      className="md:grid grid-cols-2 flex flex-col md:gap-x-[24px] gap-y-[16px]"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export const SubUserActions = ({ children }) => {
  return (
    <div className="flex md:flex-row flex-col items-center justify-center gap-[24px] col-span-2 mt-[16px]">
      {children}
    </div>
  );
};

export const SubUserPhoneNumber = ({
  label,
  placeholder,
  className,
  props,
  error,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-[8px]">
        <p className="text-[14px] text-dark-blue font-medium">{label}</p>
        <Input
          id="subUserPhoneNumber"
          component={IMaskInput}
          mask="+1 (000) 000-00-00"
          placeholder={placeholder}
          {...props}
          className={className}
        />
      </div>
      {error && <p className="text-[#fa5252] text-[12px] mt-[5px]">{error}</p>}
    </div>
  );
};
