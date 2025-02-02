import {
  DashboardIcon,
  MyTeamIcon,
  ReportsIcon,
  TemplatesIcon,
} from "../assets/icons/SideBarIcons.jsx";

export const SIDEBAR_LINKS = [
  {
    title: "Dashboard",
    Icon: DashboardIcon,
    link: "/",
  },
  {
    title: "Users",
    Icon: MyTeamIcon,
    link: "/all-users",
  },
  {
    title: "Plan Settings",
    Icon: TemplatesIcon,
    link: "/plan-settings",
  },
  {
    title: "Report Settings",
    Icon: ReportsIcon,
    link: "/report-settings",
  },
];
