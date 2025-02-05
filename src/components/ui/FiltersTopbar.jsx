import { cn } from "../../utils/cn";

const FiltersTopbar = ({ children, className = "" }) => {
  return (
    <section
      className={cn(
        "border border-[#CCE2FF] rounded-[8px] py-[8px] px-[12px] md:h-[56px] md:flex items-center justify-between relative sm:gap-[16px] gap-[12px] grid grid-cols-2",
        className
      )}
    >
      {children}
    </section>
  );
};

export default FiltersTopbar;
