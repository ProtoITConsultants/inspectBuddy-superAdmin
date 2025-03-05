import { useMemo } from "react";

const useMonthStartDates = () => {
  // Calculate the start date of the current month
  const currentMonthStartDate = useMemo(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  }, []);

  // Calculate the start date of the third previous month
  const thirdPreviousMonthStartDate = useMemo(() => {
    const date = new Date(currentMonthStartDate);
    date.setUTCMonth(date.getUTCMonth() - 3);
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
  }, [currentMonthStartDate]);

  // Calculate the start date of the fifth previous month
  const fifthPreviousMonthStartDate = useMemo(() => {
    const date = new Date(currentMonthStartDate);
    date.setUTCMonth(date.getUTCMonth() - 5);
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
  }, [currentMonthStartDate]);

  return {
    currentMonthStartDate,
    thirdPreviousMonthStartDate,
    fifthPreviousMonthStartDate,
  };
};

export default useMonthStartDates;
