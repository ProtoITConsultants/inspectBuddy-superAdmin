// Plan Types
const PLAN_TYPES = ["FREETIER", "STANDARDTIER", "TOPTIER"];

// Configuration for form fields
const PLAN_FIELDS = [
  { name: "inspectionLimit", label: "Inspection Limit" },
  { name: "templateLimit", label: "Templates Limit" },
  { name: "propertyLimit", label: "Properties Limit" },
  { name: "roomLimit", label: "Rooms Limit per Inspection" },
  { name: "elementLimit", label: "Elements Limit per Room" },
  { name: "monthlyPDFLimit", label: "PDF Export Limit (Per Month)" },
];

// Plan Sections
const PLAN_SETTINGS_SECTIONS = [
  {
    heading: "Inspection & Template Limits",
    fields: PLAN_FIELDS.slice(0, 3), // First 3 fields
  },
  {
    heading: "Room & Element Limits",
    fields: PLAN_FIELDS.slice(3, 5), // Next 2 fields
  },
  {
    heading: "Export Limits",
    fields: PLAN_FIELDS.slice(5), // Remaining fields
  },
];

const PLAN_SETTINGS = {
  PLAN_TYPES,
  PLAN_FIELDS,
  PLAN_SETTINGS_SECTIONS,
};

export default PLAN_SETTINGS;
