// Users Subscriptions Type - Users List Page
export const USERS_SUBSCRIPTIONS_TYPE = [
  {
    value: "all",
    label: "All Users",
  },
  {
    value: "FREETIER",
    label: "Free Tier",
  },
  {
    value: "TRIALTIER",
    label: "Trial Tier",
  },
  {
    value: "STANDARDTIER",
    label: "Standard Tier",
  },
  {
    value: "TOPTIER",
    label: "Top Tier",
  },
];

// Sub users Categories Type - Sub Users Page
export const MEMBER_CATEGORY_FILTER = [
  {
    _id: 1,
    label: "All Members",
    value: "All Members",
  },
  {
    _id: 2,
    label: "Unassigned",
    value: "Unassigned",
  },
  {
    _id: 3,
    label: "All Categories",
    value: "All Categories",
  },
];

// Template Type - Templates Page
export const TEMPLATE_CATEGORIES = [
  { id: 1, label: "All Templates", value: "all" },
  { id: 2, label: "Drafted", value: "drafted" },
  { id: 3, label: "Completed", value: "completed" },
  { id: 4, label: "Default Template", value: "default" },
];

// Inspections Type - Inspections Page
export const INSPECTIONS_CATEGORIES = [
  { _id: 1, value: "all", label: "All Inspections" },
  { _id: 2, value: "completed", label: "Completed" },
  { _id: 3, value: "notcompleted", label: "In Progress" },
  { _id: 4, value: "draft", label: "Drafted" },
];

export const INSPECTION_DATE_RANGE_FILTER = [
  { value: "last-30-days", label: "Last 30 days" },
  { value: "last-03-months", label: "Last 03 months" },
  { value: "last-05-months", label: "Last 05 months" },
];
