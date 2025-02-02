import { Menu } from "@mantine/core";
import logoutIcon from "../../assets/icons/logout-icon.svg";
import arrowDownIcon from "../../assets/icons/arrowDown-icon.svg";
import { useAuthStore } from "../../store/authStore";

const UserNavMenu = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <Menu shadow="md" id="userProfileDropDownNavbar" position="top-end">
      <Menu.Target>
        <button className="sm:px-[12px] px-[8px] sm:h-[48px] h-[40px] rounded-[8px] border-[1.5px] border-[#CCE2FF] flex items-center justify-center gap-[8px]">
          <div className="w-[32px] h-[32px] bg-primary rounded-full flex items-center justify-center">
            <p className="text-white text-[16px] font-bold uppercase">
              {user?.fullname?.split(" ")[0]?.slice(0, 2)}
            </p>
          </div>

          <span className="font-medium text-[16px] text-darkBlue sm:block hidden">
            {/* Show first name of user name */}
            {user?.fullname?.split(" ")[0]}
          </span>
          <img src={arrowDownIcon} alt="arrowDown-icon" />
        </button>
      </Menu.Target>
      <Menu.Dropdown>
        <div className="p-[6px_12px]">
          <p className="font-semibold text-dark-blue opacity-70">
            {user?.fullname}
          </p>
          <span className="text-[14px] text-gray-600">{user?.email}</span>
        </div>

        <Menu.Divider />

        <Menu.Item
          leftSection={
            <img
              src={logoutIcon}
              alt="trash-icon"
              style={{ width: 20, height: 20 }}
            />
          }
          onClick={() => {}}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserNavMenu;
