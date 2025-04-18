import SidebarItem from "./SidebarItem";
import { SIDEBAR_LINKS } from "../../constants/sidebarItems";

const Sidebar = () => {
  return (
    <div className="lg:w-[250px] min-[1630px]:!w-[305px] border-r-[1.5px] border-[#ECECEC] h-[calc(100dvh-72px)] md:h-[calc(100dvh-96px)] md:block hidden">
      <div className="lg:p-[24px] py-[16px] px-[12px] space-y-[16px] sticky md:top-[96px] top-[72px] w-full max-w-[305px]">
        {SIDEBAR_LINKS.map((item, index) => (
          <SidebarItem
            key={index}
            title={item.title}
            Icon={item.Icon}
            link={item.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
