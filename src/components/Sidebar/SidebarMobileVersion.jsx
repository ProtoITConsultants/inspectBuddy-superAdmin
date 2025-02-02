import { Burger } from "@mantine/core";
import { useState, useMemo } from "react";
import { Link, useLocation } from "react-router";
import clsx from "clsx";
import { SIDEBAR_LINKS } from "./../../constants/sidebarItems";

const SideBarItem = ({ title, Icon, link, activeLink, onClick }) => {
  const isActive = activeLink === link;

  return (
    <Link
      to={link}
      className={clsx(
        "rounded-[8px] px-[10px] py-[8px] w-full flex items-center",
        isActive ? "bg-[#E4F0FF]" : "hover:bg-[#E4F0FF]"
      )}
      onClick={onClick}
    >
      <div className="flex space-x-[12px] items-center">
        <Icon className={isActive ? "text-primary" : "text-[#8885AA]"} />
        <p
          className={clsx(
            "text-[16px]",
            isActive ? "font-bold text-primary" : "font-medium text-[#8885AA]"
          )}
        >
          {title}
        </p>
      </div>
    </Link>
  );
};

const SidebarMobileVersion = () => {
  const location = useLocation();
  const [opened, setOpened] = useState(false);

  const toggleMenu = () => setOpened((prev) => !prev);

  // Memoize sidebar items to avoid unnecessary re-renders
  const sidebarItems = useMemo(() => {
    return SIDEBAR_LINKS.map((item, index) => (
      <SideBarItem
        key={index}
        title={item.title}
        Icon={item.Icon}
        link={item.link}
        activeLink={location.pathname}
        onClick={() => setOpened(false)}
      />
    ));
  }, [location.pathname]);

  return (
    <div className="bg-white md:hidden block">
      <Burger
        opened={opened}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
        size={18}
      />
      <div
        className={clsx(
          "absolute left-0 right-0 top-[72px] bg-white transition-all duration-300 ease-in-out overflow-auto z-[10]",
          opened ? "max-h-[calc(100vh-72px)]" : "max-h-0"
        )}
      >
        <div
          className={clsx(
            "p-[20px] transition-opacity duration-300 ease-in-out",
            opened ? "opacity-100 block" : "opacity-0 hidden"
          )}
        >
          <div className="lg:p-[24px] py-[16px] px-[12px] space-y-[16px] sticky md:top-[96px] top-[72px] w-full">
            {sidebarItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMobileVersion;
