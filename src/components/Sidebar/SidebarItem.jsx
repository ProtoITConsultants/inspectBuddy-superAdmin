import { Link, useLocation } from "react-router";
import { cn } from "../../utils/cn";

const SidebarItem = ({ title, Icon, link }) => {
  const location = useLocation();
  const isActiveLink = link === location.pathname;

  return (
    <Link
      to={link}
      className={cn(
        "rounded-[8px] px-[10px] py-[8px] lg:w-full w-fit flex items-center",
        isActiveLink ? "bg-[#E4F0FF]" : "hover:bg-[#E4F0FF]"
      )}
    >
      <div className="flex space-x-[12px] items-center">
        <Icon
          className={cn(isActiveLink ? "text-primary" : "text-[#8885AA]")}
        />
        <p
          className={cn(
            "text-[16px] lg:block hidden",
            isActiveLink
              ? "font-bold text-primary"
              : "font-medium text-[#8885AA]"
          )}
        >
          {title}
        </p>
      </div>
    </Link>
  );
};

export default SidebarItem;
