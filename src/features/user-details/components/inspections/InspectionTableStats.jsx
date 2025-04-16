import React, { useState } from "react";
import { cn } from "../../../../utils/cn";
import AddInspectionMenu from "./AddInspectionMenu";
import AddInspectionModal from "./AddInspectionModal";

const InspectionTableStats = ({ children, isLoadingData }) => {
  // Local States
  const [newInspectionModalData, setNewInspectionModalData] = useState({
    openModal: false,
    inspectionType: "",
  });

  return (
    <React.Fragment>
      {
        // Add Inspection Modal
        <AddInspectionModal
          isModalOpen={newInspectionModalData.openModal}
          onCloseModal={() =>
            setNewInspectionModalData({ openModal: false, inspectionType: "" })
          }
          inspectionType={newInspectionModalData.inspectionType}
        />
      }
      <section
        className={cn(
          "p-[24px_16px] border-b-[1.5px] border-[#CCE2FF] flex sm:flex-row flex-col items-center sm:justify-between gap-y-[16px]"
        )}
      >
        <div className="xl:flex gap-[10px] justify-between items-center py-0 max-w-[785px] w-full grid grid-cols-2">
          {children}
        </div>
        <AddInspectionMenu
          disabled={isLoadingData}
          onSelectInspectionType={(type) =>
            setNewInspectionModalData({ openModal: true, inspectionType: type })
          }
        />
      </section>
    </React.Fragment>
  );
};

export default InspectionTableStats;
