import { Link } from "react-router";
import arrowBackIcon from "../../assets/icons/arrow-back.svg";
import EditUserInfoIcon from "../../assets/icons/edit-icon.svg";
import { useUserDetailsStore } from "../../store/userDetailsStore";
import UserDetailsSidebarMobile from "../../features/user-details/components/Sidebar/UserDetailsSidebarMobile";

const BackButton = ({ isUserDetailsScreen = false }) => {
  // Global States
  const editingUserDetails = useUserDetailsStore(
    (state) => state.editingUserDetails
  );
  const setEditingUserDetails = useUserDetailsStore(
    (state) => state.setEditingUserDetails
  );

  return (
    <div className="bg-white md:px-[32px] px-[20px] h-[68px] flex items-center justify-between border-b-[1.5px] border-[#E4F0FF] fixed md:top-[96px] top-[72px] z-[10] w-full">
      <Link
        to={-1}
        className="flex items-center gap-[16px] font-bold text-[14px] text-[#6C727F] hover:text-gray-dark hover:underline"
      >
        <img src={arrowBackIcon} alt="arrow-back-icon" />
        <p>Go Back</p>
      </Link>

      <UserDetailsSidebarMobile />
      {isUserDetailsScreen && !editingUserDetails && (
        <button
          type="button"
          className="flex items-center gap-[8px] p-[10px_16px] rounded-[8px] border-[1.5px] border-[#cce2ff]"
          onClick={() => setEditingUserDetails(true)}
        >
          <img
            src={EditUserInfoIcon}
            alt="Edit Icons"
            className="w-[16px] h-[16px]"
          />
          <p className="text-[14px] font-medium text-darkBlue">Edit Details</p>
        </button>
      )}
    </div>
  );
};

export default BackButton;
