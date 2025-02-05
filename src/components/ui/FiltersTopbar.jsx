import { cn } from "../../utils/cn";

const FiltersTopbar = ({ children, className = "" }) => {
  return (
    <section
      className={cn(
        "border border-[#CCE2FF] rounded-[8px] p-[8px_12px] md:flex items-center justify-between relative sm:gap-[16px] gap-[12px] grid grid-cols-2",
        className
      )}
    >
      {children}
    </section>
  );
};

export default FiltersTopbar;
