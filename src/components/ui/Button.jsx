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
        "px-6 py-3 h-12 rounded-lg flex items-center justify-center",
        "text-sm sm:text-base",
        className,
        {
          "bg-gray-400 text-white": disabled && isContained,
          "bg-blue-500 text-white hover:bg-blue-600": !disabled && isContained,
          "border-2 border-gray-400 text-gray-400": disabled && isOutlined,
          "border-2 hover:border-blue-700 text-blue-500":
            !disabled && isOutlined,
        }
      )}
      style={{
        backgroundColor: isContained && !disabled ? buttonColor : undefined,
        color: isContained ? "#FFFFFF" : buttonColor,
        borderColor: isOutlined && !disabled ? borderColor : undefined,
      }}
    >
      {label}
    </button>
  );
};

export default Button;
