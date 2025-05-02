export const getRequestStatusColor = (status) => {
  const statusColors = {
    PENDING: "bg-[rgba(205,192,81,0.14)] text-[#CDC051]",
    ACCEPTED: "bg-[rgba(90,166,63,0.14)] text-[#5AA63F]",
    REJECTED: "bg-[rgba(255,0,0,0.14)] text-[#FF0000]",
  };

  return statusColors[status] || "bg-[rgba(0,0,0,14)] text-[#000000]";
};
