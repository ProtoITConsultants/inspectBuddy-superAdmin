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
const FETCH_SUB_USER_DETAILS_URL = ({ subUserId }) =>
  `/getSubUserById/${encodeURIComponent(subUserId)}`;
const UPDATE_SUB_USER_DETAILS_URL = ({ userId }) =>
  `/updateSubUser?id=${encodeURIComponent(userId)}`;

// Properties
const FETCH_USER_ADDED_PROPERTY_CATEGORIES_URL = ({ userId }) =>
  `/getUserPropertyCategories?id=${encodeURIComponent(userId)}`;
const FETCH_PROPERTY_DETAILS_URL = ({ propertyId }) =>
  `/getPropertyById/${encodeURIComponent(propertyId)}`;
const UPDATE_PROPERTY_DETAILS_URL = "/editExistingProperty";

const FETCH_USER_ADDED_PROPERTIES_URL = ({ userId }) =>
  `/getCompleteProperties?id=${encodeURIComponent(userId)}`;

// Templates
const FETCH_USER_ADDED_TEMPLATES_URL = ({ userId }) =>
  `/getAllTemplates?id=${encodeURIComponent(userId)}`;
const FETCH_TEMPLATE_DETAILS_URL = ({ templateId }) =>
  `/getSpecificTemplate/${encodeURIComponent(templateId)}`;
const ADD_NEW_ROOM_IN_TEMPLATE_URL = "/templateAddRoom";
const DELETE_ROOM_FROM_TEMPLATE_URL = "/templateDeleteRoom";
const FETCH_TEMPLATE_ROOM_DETAILS_URL = ({ userId }) =>
  `/getTemplateRoomData?id=${encodeURIComponent(userId)}`;
const SAVE_INSPECTION_TEMPLATE_AS_COMPLETED_URL = "/saveTemplateAsComplete";
const SAVE_TEMPLATE_AS_DRAFT_URL = "/saveTemplateAsDraft";
const UPDATE_ROOM_ORDER_IN_TEMPLATE_URL = "/reArrangeTemplateRooms";
const REARRANGE_ROOM_ELEMENTS_IN_TEMPLATE_URL = "/reArrangeTemplateElements";
const ADD_NEW_ROOM_ELEMENT_IN_TEMPLATE_URL = "/templateAddElement";

// Inspections
const FETCH_USER_ADDED_INSPECTIONS_URL = ({ userId }) =>
  `/getInspections?id=${encodeURIComponent(userId)}`;
const FETCH_USER_INSPECTION_STATS_URL = ({ userId }) =>
  `/getUserInspectionAndPropertyData?id=${encodeURIComponent(userId)}`;

const USER_DETAILS_ENDPOINTS = {
  // User Details
  GET_USER_PROILE_URL,
  UPDATE_USER_PROILE_URL,
  // Sub Users
  FETCH_SUB_USER_FOR_USER_URL,
  FETCH_SUB_USER_DETAILS_URL,
  UPDATE_SUB_USER_DETAILS_URL,
  // Properties
  FETCH_USER_ADDED_PROPERTY_CATEGORIES_URL,
  FETCH_USER_ADDED_PROPERTIES_URL,
  FETCH_PROPERTY_DETAILS_URL,
  UPDATE_PROPERTY_DETAILS_URL,
  // Templates
  FETCH_USER_ADDED_TEMPLATES_URL,
  FETCH_TEMPLATE_DETAILS_URL,
  ADD_NEW_ROOM_IN_TEMPLATE_URL,
  DELETE_ROOM_FROM_TEMPLATE_URL,
  FETCH_TEMPLATE_ROOM_DETAILS_URL,
  SAVE_INSPECTION_TEMPLATE_AS_COMPLETED_URL,
  SAVE_TEMPLATE_AS_DRAFT_URL,
  UPDATE_ROOM_ORDER_IN_TEMPLATE_URL,
  REARRANGE_ROOM_ELEMENTS_IN_TEMPLATE_URL,
  ADD_NEW_ROOM_ELEMENT_IN_TEMPLATE_URL,
  // Inspections
  FETCH_USER_ADDED_INSPECTIONS_URL,
  FETCH_USER_INSPECTION_STATS_URL,
};

export default USER_DETAILS_ENDPOINTS;
