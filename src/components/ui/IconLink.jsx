import { Link } from "react-router";
import { cn } from "../../utils/cn";

const IconLink = ({ id, href, label, icon, className }) => {
  return (
    <Link
      to={href}
      id={id}
      className={cn(
        "flex items-center gap-[8px] p-[8px_10px] border-[1.5px] rounded-[8px] border-[#E5E6EB] w-fit",
        className
      )}
    >
      {icon}
      <p className="text-[12px] text-dark-blue font-medium">{label}</p>
    </Link>
  );
};

export default IconLink;
