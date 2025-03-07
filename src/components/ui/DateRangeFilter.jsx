import { useState } from "react";
import { DatePicker } from "@mantine/dates";
import { Menu } from "@mantine/core";
import calendarIcon from "../../assets/icons/calendar-icon.svg";
import { convertDateToISOForDateRange } from "../../utils/dateConvert";
import { cn } from "../../utils/cn";

const DateRangeFilter = ({ filtersData, setFiltersData, className = "" }) => {
  // Local States
  const [dateRange, setDateRange] = useState([
    filtersData.startdate,
    filtersData.enddate,
  ]);

  // Function to handle date range change
  const updateFiltersDate = (dateValues) => {
    if (dateValues[0] === null && dateValues[1] === null) {
      setDateRange([]);
      return setFiltersData((prev) => ({
        ...prev,
        startdate: "",
        enddate: "",
      }));
    }

    setDateRange(dateValues);
    if (dateValues[1] === null) {
      return;
    } else {
      const { startDate, endDate } = convertDateToISOForDateRange(
        new Date(dateValues[0]),
        new Date(dateValues[1])
      );
      setFiltersData((prev) => ({
        ...prev,
        startdate: startDate,
        enddate: endDate,
      }));
    }
  };

  return (
    <Menu
      shadow="md"
      position="bottom-end"
      withArrow
      transitionProps={{ transition: "fade-right", duration: 150 }}
      className={cn(className)}
    >
      <Menu.Target className="border-[1.5px] border-[#DAEAFF] rounded-[8px] py-[8px] sm:px-[16px] px-[8px] w-fit">
        <div className="flex items-center gap-[8px] hover:cursor-pointer">
          <img
            src={calendarIcon}
            alt="calendar icon"
            className="w-[16px] h-auto"
          />
          {dateRange[0] && dateRange[1] ? (
            <p className="text-dark-blue font-medium sm:text-[14px] text-[12px]">
              {dateRange[0] &&
                new Date(dateRange[0]).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}
              {dateRange[1] &&
                ` - ${new Date(dateRange[1]).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                })}`}
            </p>
          ) : (
            <p className="text-[14px] text-dark-blue">Select Date</p>
          )}
        </div>
      </Menu.Target>
      <Menu.Dropdown className="w-full !p-[20px] !rounded-[8px]">
        <DatePicker
          type="range"
          value={dateRange}
          onChange={(values) => updateFiltersDate(values)}
        />
      </Menu.Dropdown>
    </Menu>
  );
};

export default DateRangeFilter;
