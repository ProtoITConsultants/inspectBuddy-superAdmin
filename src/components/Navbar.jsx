import { useEffect } from "react";
import { Link } from "react-router";
import LogoIcon from "../assets/logo-icon.svg";
import notificationIcon from "../assets/icons/notification-icon.svg";
import { Divider, Indicator } from "@mantine/core";
import UserNavMenu from "./ui/UserNavMenu";
import debounce from "lodash.debounce";
import { cn } from "../utils/cn";

const Navbar = ({ withSidebar = false }) => {
  const pageTitle = "Dashboard";

  useEffect(() => {
    function setScrollbarWidth() {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty(
        "--scrollbar-width",
        `${scrollbarWidth}px`
      );
    }

    const debouncedSetScrollbarWidth = debounce(setScrollbarWidth, 100); // Debounce to reduce frequent calls

    window.addEventListener("resize", debouncedSetScrollbarWidth);

    // Initial call to set the scrollbar width
    setScrollbarWidth();

    return () => {
      window.removeEventListener("resize", debouncedSetScrollbarWidth);
    };
  }, []);

  return (
    <nav
      className={cn(
        "md:h-[96px] h-[72px] md:px-[32px] px-[20px] flex items-center justify-between bg-white border-b-[1.5px] border-b-[#ECECEC]",
        {
          "w-[calc(100vw-var(--scrollbar-width))]": !withSidebar,
          "min-[1630px]:w-[calc(100vw-305px-var(--scrollbar-width))] lg:w-[calc(100vw-220px-var(--scrollbar-width))] w-[calc(100vw-var(--scrollbar-width))]":
            withSidebar,
        }
      )}
    >
      <div className="flex items-center gap-[12px]">
        <Link
          to="/admin"
          className={!withSidebar ? "block" : "lg:hidden block"}
        >
          <img src={LogoIcon} alt="logo-icon" />
        </Link>
        <p className="font-bold xs:text-[24px] text-[20px] text-darkBlue">
          {pageTitle}
        </p>
      </div>
      <div className="flex items-center sm:space-x-[24px] space-x-[16px]">
        <button className="bg-[#F3F8FF] rounded-[8px] w-[40px] h-[40px] flex justify-center items-center">
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
        </button>
        <Divider
          orientation="vertical"
          size="sm"
          color="#000929"
          className="opacity-10 !h-[40px] sm:block hidden !self-auto"
        />
        <UserNavMenu />
      </div>
    </nav>
  );
};

export default Navbar;
