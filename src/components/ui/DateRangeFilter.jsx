import { useState } from "react";
import { DatePicker } from "@mantine/dates";
import { Menu, Tooltip } from "@mantine/core";
import calendarIcon from "../../assets/icons/calendar-icon.svg";
import { convertDateToISOForDateRange } from "../../utils/dateConvert";
import { cn } from "../../utils/cn";

const DateRangeFilter = ({
  filtersData,
  setFiltersData,
  className = "",
  tooltipLabel = "Select Date Range",
}) => {
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
        <div>
          <Tooltip label={tooltipLabel} withArrow>
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
          </Tooltip>
        </div>
      </Menu.Target>
      <Menu.Dropdown className="w-full !p-[20px] !rounded-[8px]">
        <DatePicker
          type="range"
          value={dateRange}
          onChange={(values) => updateFiltersDate(values)}
        />
        {/* Reset Date Range - Button */}
        {filtersData.startdate !== "" && filtersData.enddate !== "" && (
          <div className="flex justify-end mt-3">
            <button
              type="button"
              onClick={() => {
                setDateRange([]);
                setFiltersData((prev) => ({
                  ...prev,
                  startdate: "",
                  enddate: "",
                }));
              }}
              disabled={
                filtersData.startdate === "" && filtersData.enddate === ""
              }
              className="text-[14px] text-[#FF613E] border-[1.5px] border-[#FF613E] hover:text-white hover:bg-[#FF613E] rounded-[8px] p-[6px_12px] w-full disabled:border-gray-300 disabled:text-gray-300 disabled:hover:bg-white disabled:cursor-not-allowed"
            >
              Reset Date Range
            </button>
          </div>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default DateRangeFilter;
