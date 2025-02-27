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

export const USER_DETAILS_SIDEBAR = [
  {
    pageTitle: "User Details",
    pagePath: "",
  },
  {
    pageTitle: "Sub Users",
    pagePath: "sub-users",
  },
  {
    pageTitle: "Properties",
    pagePath: "properties",
  },
  {
    pageTitle: "Inspections",
    pagePath: "inspections",
  },
  {
    pageTitle: "Templates",
    pagePath: "templates",
  },
];
