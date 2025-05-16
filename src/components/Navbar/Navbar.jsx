import { Link } from "react-router";
import LogoIcon from "../../assets/logo-icon.svg";
// import notificationIcon from "../../assets/icons/notification-icon.svg";
// import { Divider, Indicator } from "@mantine/core";
import UserNavMenu from "./UserNavMenu";
import { cn } from "../../utils/cn";
import SidebarMobileVersion from "../Sidebar/SidebarMobileVersion";
import { useScrollbarWidth } from "../../hooks/useScrollbarWidth";
import useNavbarTitle from "../../hooks/useNavbarTitle";

const Navbar = ({ withSidebar = false }) => {
  const { pageTitle } = useNavbarTitle();

  const showLogo = !withSidebar || window.innerWidth < 1024;

  useScrollbarWidth();

  return (
    <nav
      className={cn(
        "md:h-[96px] h-[72px] md:px-[32px] px-[20px] flex items-center justify-between bg-white border-b-[1.5px] border-b-[#ECECEC]",
        {
          "w-[calc(100vw-var(--scrollbar-width))]": !withSidebar,
          "w-[calc(100vw-var(--scrollbar-width))] lg:w-[calc(100vw-250px-var(--scrollbar-width))] min-[1630px]:!w-[calc(100vw-305px-var(--scrollbar-width))]":
            withSidebar,
        }
      )}
    >
      <div className="flex items-center gap-[12px]">
        {showLogo && (
          <Link to="/">
            <img src={LogoIcon} alt="logo-icon" />
          </Link>
        )}
        <p className="font-bold sm:text-[24px] text-[20px] text-dark-blue leading-none">
          {pageTitle}
        </p>
      </div>
      <div className="flex items-center md:space-x-[24px] space-x-[16px]">
        {/* <button className="bg-[#F3F8FF] rounded-[8px] w-[40px] h-[40px] flex justify-center items-center">
          <Indicator
            inline
            processing
            color="#2A85FF"
            size={12}
            offset={6}
            withBorder
          >
            <img src={notificationIcon} alt="notification-icon" />
          </Indicator>
        </button> */}
        {/* <Divider
          orientation="vertical"
          size="sm"
          color="#000929"
          className="opacity-10 !h-[40px] md:block hidden !self-auto"
        /> */}
        <UserNavMenu />
        {window.innerWidth < 768 && <SidebarMobileVersion />}
      </div>
    </nav>
  );
};

export default Navbar;
