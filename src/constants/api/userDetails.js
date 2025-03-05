// ------------------------------
// API Endpoints
// ------------------------------

// User Details
const GET_USER_PROILE_URL = ({ userId }) =>
  `/fetchUserDetails?id=${encodeURIComponent(userId)}`;
const UPDATE_USER_PROILE_URL = "/updateCompleteUserProfile";

// Sub Users
const FETCH_SUB_USER_FOR_USER_URL = ({ userId }) =>
  `/getAllSubUsers?id=${encodeURIComponent(userId)}`;

// Properties
const FETCH_USER_ADDED_PROPERTY_CATEGORIES_URL = ({ userId }) =>
  `/getUserPropertyCategories?id=${encodeURIComponent(userId)}`;

const FETCH_USER_ADDED_PROPERTIES_URL = ({ userId }) =>
  `/getCompleteProperties?id=${encodeURIComponent(userId)}`;

// Templates
const FETCH_USER_ADDED_TEMPLATES_URL = ({ userId }) =>
  `/getAllTemplates?id=${encodeURIComponent(userId)}`;

// Inspections
const FETCH_USER_ADDED_INSPECTIONS_URL = ({ userId }) =>
  `/getInspections?id=${encodeURIComponent(userId)}`;
const FETCH_USER_INSPECTION_STATS_URL = ({ userId }) =>
  `/getUserInspectionAndPropertyData?id=${encodeURIComponent(userId)}`;

const USER_DETAILS_ENDPOINTS = {
  GET_USER_PROILE_URL,
  UPDATE_USER_PROILE_URL,
  FETCH_USER_ADDED_PROPERTY_CATEGORIES_URL,
  FETCH_SUB_USER_FOR_USER_URL,
  FETCH_USER_ADDED_PROPERTIES_URL,
  FETCH_USER_ADDED_TEMPLATES_URL,
  FETCH_USER_ADDED_INSPECTIONS_URL,
  FETCH_USER_INSPECTION_STATS_URL,
};

export default USER_DETAILS_ENDPOINTS;
