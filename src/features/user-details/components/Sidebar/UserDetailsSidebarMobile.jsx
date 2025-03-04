import { Burger } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { cn } from "../../../../utils/cn";
import { Link, useLocation, useParams } from "react-router";
import { USER_DETAILS_SIDEBAR } from "../../../../constants/sidebarItems";
import { useUserDetailsStore } from "../../../../store/userDetailsStore";

const SideBarItem = ({ title, link, isActive, onClick, disabled }) => {
  return (
    <Link
      to={link}
      className={cn(
        "rounded-[8px] px-[10px] py-[8px] w-full flex items-center",
        isActive
          ? "bg-[rgba(135,184,254,0.12)] hover:hover:bg-[rgba(135,184,254,0.30)]"
          : "hover:bg-gray-100"
      )}
      onClick={onClick}
    >
      <p
        className={cn(
          "text-[16px]",
          isActive ? "font-bold text-primary" : "font-medium",
          disabled ? "text-gray-400 cursor-not-allowed" : "text-[#5A5A5A]"
        )}
      >
        {title}
      </p>
    </Link>
  );
};

const UserDetailsSidebarMobile = () => {
  // Hooks
  const location = useLocation();
  const { userId } = useParams();

  const [opened, setOpened] = useState(false);

  // Global States
  const activeTab = useUserDetailsStore((state) => state.activeTab);
  const setActiveTab = useUserDetailsStore((state) => state.setActiveTab);
  const showSubUserOption = useUserDetailsStore(
    (state) => state.showSubUserOption
  );

  // Define a mapping of paths to active tab names
  const TAB_MAPPING = useMemo(
    () => ({
      "sub-users": "Sub Users",
      properties: "Properties",
      inspections: "Inspections",
      templates: "Templates",
    }),
    []
  );

  useEffect(() => {
    const pathname = location.pathname.split("/").pop();
    const newTab = TAB_MAPPING[pathname] || "User Details";

    if (activeTab !== newTab) {
      setActiveTab(newTab);
    }
  }, [location.pathname, activeTab, setActiveTab, TAB_MAPPING]);

  // Memoize sidebar items to avoid unnecessary re-renders
  const sidebarItems = useMemo(
    () =>
      USER_DETAILS_SIDEBAR.map((item, index) => {
        const isSubUsersDisabled =
          item.pageTitle === "Sub Users" && !showSubUserOption;
        return (
          <SideBarItem
            key={index}
            title={item.pageTitle}
            link={
              isSubUsersDisabled
                ? "#"
                : item.pageTitle === "User Details"
                ? `${userId}`
                : `${userId}/${item.pagePath}`
            }
            isActive={activeTab === item.pageTitle}
            onClick={() => setOpened(false)}
            disabled={item.pageTitle === "Sub Users" && !showSubUserOption}
          />
        );
      }),
    [showSubUserOption, userId, activeTab]
  );

  return (
    <div className="bg-white md:hidden block">
      <Burger
        opened={opened}
        onClick={() => setOpened((prev) => !prev)}
        aria-label="Toggle navigation"
        size={18}
      />
      <div
        className={cn(
          "absolute left-0 right-0 top-[68px] bg-white transition-all duration-300 ease-in-out overflow-auto z-[10]",
          opened ? "h-[calc(100vh-140px)]" : "h-0"
        )}
      >
        <div
          className={cn(
            "p-[20px] transition-opacity duration-300 ease-in-out",
            opened ? "opacity-100 block" : "opacity-0 hidden"
          )}
        >
          <div className="lg:p-[24px] py-[16px] px-[12px] space-y-[16px] sticky top-[68px] w-full">
            {sidebarItems}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsSidebarMobile;
