const InspectionStatusCard = ({ status }) => {
  const lowerCaseStatus = status.toLowerCase();

  return (
    <p
      className={`lg:text-[14px] text-[10px] font-bold p-[8px] rounded-[8px] h-fit ${
        lowerCaseStatus === "in progress"
          ? "bg-[rgba(90,166,63,0.14)] text-[#5AA63F]"
          : lowerCaseStatus === "completed"
          ? "bg-[rgba(42,133,255,0.14)] text-primary"
          : lowerCaseStatus === "drafted"
          ? "bg-[rgba(236,130,71,0.14)] text-[#EC8247]"
          : ""
      } w-fit capitalize`}
    >
      {status}
    </p>
  );
};

export default InspectionStatusCard;
