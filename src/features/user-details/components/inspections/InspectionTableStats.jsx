import { cn } from "../../../../utils/cn";
import AddInspectionMenu from "./AddInspectionMenu";

const InspectionTableStats = ({ children, isLoadingData }) => {
  return (
    <section
      className={cn(
        "p-[24px_16px] border-b-[1.5px] border-[#CCE2FF] flex sm:flex-row flex-col sm:justify-between gap-y-[16px]"
      )}
    >
      <div className="xl:flex gap-[10px] justify-between items-center py-0 max-w-[785px] w-full grid grid-cols-2">
        {children}
      </div>
      <AddInspectionMenu disabled={isLoadingData} />
    </section>
  );
};

export default InspectionTableStats;
