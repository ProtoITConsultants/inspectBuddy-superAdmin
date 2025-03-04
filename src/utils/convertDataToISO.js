// Function to convert date to ISO
export const convertDateToISO = (startDate, endDate) => {
  const start = new Date(
    Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
  );

  const end = new Date(
    Date.UTC(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      23,
      59,
      59
    )
  );

  return { startDate: start.toISOString(), endDate: end.toISOString() };
};
