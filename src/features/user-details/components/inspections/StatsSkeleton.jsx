import { Select, Skeleton } from "@mantine/core";
import React from "react";

const StatsSkeleton = () => {
  return (
    <React.Fragment>
      {/* Dropdown to select date Range */}
      <section className="flex flex-col">
        <h2 className={`text-dark-blue font-bold text-[16px]`}>
          Properties Inspected
        </h2>
        <Select
          id="select-filter"
          className="w-fit"
          disabled
          placeholder="Select Date Range"
        />
      </section>
      <div className="border-r-[1.5px] border-[#CCE2FF] h-[40px] w-[1px] mx-[16px] xl:block hidden"></div>
      {Array(3)
        .fill(0)
        .map((_, index) => (
          <React.Fragment key={index}>
            <Skeleton
              height={46.48}
              width={150}
              radius="sm"
              className={`${
                index > 1 &&
                "xl:border-none xl:pb-0 pt-[10px] w-fit border-t border-[#CCE2FF]"
              }`}
            />
            {index < 2 && (
              <div className="border-r-[1.5px] border-[#CCE2FF] h-[40px] w-[1px] mx-[16px] xl:block hidden"></div>
            )}
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default StatsSkeleton;
