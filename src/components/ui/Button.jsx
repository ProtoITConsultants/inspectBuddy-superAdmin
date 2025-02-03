import { Loader } from "@mantine/core";
import { cn } from "./../../utils/cn";

const Button = ({
  id,
  label,
  type = "button",
  onClick,
  disabled = false,
  className = "",
  buttonType = "contained",
  buttonColor = "#2A85FF",
  borderColor = "#2A85FF",
  isLoading = false,
}) => {
  const isContained = buttonType === "contained";
  const isOutlined = buttonType === "outlined";
  return (
    <button
      id={id || undefined}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "px-6 py-3 h-12 rounded-lg flex items-center justify-center hover:cursor-pointer disabled:hover:cursor-not-allowed",
        className,
        {
          "bg-light-gray text-white": disabled && isContained,
          "bg-primary text-white hover:!bg-dark-primary":
            !disabled && isContained,
          "border-2 !border-light-gray !text-light-gray":
            disabled && isOutlined,
          "border-2 hover:border-primary text-primary hover:!text-white hover:bg-primary":
            !disabled && isOutlined,
        }
      )}
      style={{
        backgroundColor: isContained && !disabled ? buttonColor : undefined,
        color: isContained ? "#FFFFFF" : buttonColor,
        borderColor: isOutlined && !disabled ? borderColor : undefined,
      }}
    >
      {isLoading ? (
        <Loader color={!disabled && isContained ? "white" : "gray"} size="sm" />
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
