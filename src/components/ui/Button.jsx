import { Loader } from "@mantine/core";
import { cn } from "./../../utils/cn";

/**
 * Reusable Button Component
 *
 * @param {Object} props - The props for the Button component.
 * @param {string} [props.id] - The ID for the button.
 * @param {string} [props.label] - The text label displayed inside the button.
 * @param {"button" | "submit" | "reset"} [props.type="button"] - The button type (default: "button").
 * @param {Function} [props.onClick] - Click event handler function.
 * @param {boolean} [props.disabled=false] - Whether the button is disabled (default: false).
 * @param {string} [props.className=""] - Additional CSS classes for custom styling.
 * @param {"contained" | "outlined" | "iconButton"} [props.buttonType="contained"] - The style type of the button.
 * @param {string} [props.buttonColor="#2A85FF"] - Background color for the button (default: "#2A85FF").
 * @param {string} [props.borderColor="#2A85FF"] - Border color for outlined buttons (default: "#2A85FF").
 * @param {boolean} [props.isLoading=false] - Whether the button is in a loading state (default: false).
 * @param {React.ReactNode} [props.icon] - Icon element to be displayed inside the button.
 *
 * @returns {JSX.Element} A styled button component.
 */

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
  icon,
}) => {
  const isContained = buttonType === "contained";
  const isOutlined = buttonType === "outlined";
  const isIconButton = buttonType === "iconButton";

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
          "p-[0] bg-white": isIconButton,
          "bg-light-gray text-white": disabled && isContained,
          "bg-primary text-white": !disabled && isContained,
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
        <div className="flex items-center gap-[8px]">
          {icon}
          {label}
        </div>
      )}
    </button>
  );
};

export default Button;
