import { Link } from "react-router";
import arrowBackIcon from "../../assets/icons/arrow-back.svg";

const NoSidebarBackButton = ({ children }) => {
  return (
    <div className="bg-white md:px-[32px] px-[20px] h-[68px] flex items-center justify-between border-b-[1.5px] border-[#E4F0FF] fixed md:top-[96px] top-[72px] z-[10] w-full">
      <Link
        to={-1}
        className="flex items-center gap-[16px] font-bold text-[14px] text-[#6C727F] hover:text-gray-dark hover:underline"
      >
        <img src={arrowBackIcon} alt="arrow-back-icon" />
        <p>Go Back</p>
      </Link>
      {children}
    </div>
  );
};

export default NoSidebarBackButton;
