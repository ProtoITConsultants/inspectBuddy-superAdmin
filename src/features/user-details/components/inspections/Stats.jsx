import { Select } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { INSPECTION_DATE_RANGE_FILTER } from "../../../../constants/filters";

// Stats Item Card
const StatItem = ({ title, detail, className = "" }) => (
  <div className={className}>
    <h2
      className={`${
        title.bold
          ? "text-darkBlue font-bold text-[16px]"
          : "text-[#6C727F] text-[14px] font-medium"
      }`}
    >
      {title.text}
    </h2>
    <p
      className={`${
        !detail.bold
          ? "text-[#6C727F] text-[14px] font-medium"
          : "text-darkBlue font-bold text-[16px]"
      }`}
    >
      {detail.text === -999 ? "unlimited" : detail.text}
    </p>
  </div>
);

const Stats = ({ onDateRangeChange, statsData }) => {
  const [value, setValue] = useState(null);
  const [stats, setStats] = useState([]);

  const handleChange = (option) => {
    if (!option) {
      setValue(null);
      onDateRangeChange("default");
      return;
    }
    setValue(option);
    onDateRangeChange(option.value);
  };

  useEffect(() => {
    if (statsData) {
      const {
        totalInspectionCount,
        totalCompletedInspectionCount,
        remainingInspectionCount,
      } = statsData;

      const formattedData = [
        {
          title: { text: "Total Inspections", bold: false },
          detail: {
            text: totalInspectionCount,
            bold: true,
          },
        },
        {
          title: { text: "Completed by me", bold: false },
          detail: {
            text: totalCompletedInspectionCount,
            bold: true,
          },
        },
        {
          title: { text: "Available Inspections", bold: false },
          detail: {
            text: remainingInspectionCount,
            bold: true,
          },
        },
      ];

      setStats(formattedData);
    }

    // Clean up function
    return () => {};
  }, [statsData]);

  return (
    <React.Fragment>
      <section className="flex flex-col">
        <h2 className={`text-dark-blue font-bold text-[16px]`}>
          Properties Inspected
        </h2>
        <Select
          id="select-filter"
          className="w-fit"
          placeholder="Select Date Range"
          data={INSPECTION_DATE_RANGE_FILTER}
          value={value?.value || null}
          onChange={(_value, option) => handleChange(option)}
          comboboxProps={{
            transitionProps: { transition: "pop", duration: 200 },
            dropdownPadding: 8,
            radius: 8,
            offset: 2,
            position: "bottom-start",
          }}
        />
      </section>
      <div className="border-r-[1.5px] border-[#CCE2FF] h-[40px] w-[1px] mx-[16px] xl:block hidden"></div>
      {stats.map((item, index) => (
        <React.Fragment key={index}>
          <StatItem
            title={item.title}
            detail={item.detail}
            className={`${
              index > 1 &&
              "xl:border-none xl:pb-0 pt-[10px] w-fit border-t border-[#CCE2FF]"
            }`}
          />
          {index < stats?.length - 1 && (
            <div className="border-r-[1.5px] border-[#CCE2FF] h-[40px] w-[1px] mx-[16px] xl:block hidden"></div>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default Stats;
