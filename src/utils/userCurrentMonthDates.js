function useCurrentMonthDates() {
  const now = new Date();

  // Get the start of the month
  const startOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
  );
  const startOfMonthISO = startOfMonth.toISOString();

  // Get the end of the month
  const endOfMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59)
  );
  const endOfMonthISO = endOfMonth.toISOString();

  return { startOfMonthISO, endOfMonthISO };
}

export default useCurrentMonthDates;
