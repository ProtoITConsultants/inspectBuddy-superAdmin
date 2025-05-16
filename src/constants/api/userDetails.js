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
const CREATE_NEW_SUB_USER_URL = ({ userId }) =>
  `/createSubUser?id=${encodeURIComponent(userId)}`;
const DELETE_SUB_USER_URL = ({ userId, subUserId }) =>
  `/deleteSubUser/${encodeURIComponent(subUserId)}?id=${encodeURIComponent(
    userId
  )}`;

// Properties
const FETCH_USER_ADDED_PROPERTY_CATEGORIES_URL = ({ userId }) =>
  `/getUserPropertyCategories?id=${encodeURIComponent(userId)}`;
const FETCH_PROPERTY_DETAILS_URL = ({ propertyId }) =>
  `/getPropertyById/${encodeURIComponent(propertyId)}`;
const UPDATE_PROPERTY_DETAILS_URL = ({ userId }) =>
  `/editExistingProperty?id=${encodeURIComponent(userId)}`;
const FETCH_USER_ADDED_PROPERTIES_URL = ({ userId }) =>
  `/getCompleteProperties?id=${encodeURIComponent(userId)}`;
const ADD_NEW_USER_PROPERTY_URL = ({ userId }) =>
  `/createProperty?id=${encodeURIComponent(userId)}`;
const DELETE_USER_PROPERTY_URL = ({ userId, propertyId }) =>
  `/deleteProperty/${encodeURIComponent(propertyId)}?id=${encodeURIComponent(
    userId
  )}`;
const CREATE_NEW_PROPERTY_CATEGORY_URL = ({ userId }) =>
  `/addPropertyCategory?id=${encodeURIComponent(userId)}`;
const FETCH_LINKED_PROPERTY_INSPECTIONS_URL = ({
  propertyId,
  page,
  limit = 10,
}) =>
  `/getInspectionsByPropertyId?propertyId=${propertyId}&page=${page}&limit=${limit}`;
const UPDATE_PROPERTY_CATEGORY_URL = ({ userId }) =>
  `/updatePropertyCategory?id=${encodeURIComponent(userId)}`;
const DELETE_USER_PROPERTY_CATEGORY_URL = ({ userId, categoryId }) =>
  `/deletePropertyCategory/${encodeURIComponent(
    categoryId
  )}?id=${encodeURIComponent(userId)}`;

// Templates
const CREATE_NEW_TEMPLATE_URL = ({ userId }) =>
  `/createInspectionTemplateDraft?id=${encodeURIComponent(userId)}`;
const DELETE_USER_TEMPLATE_URL = ({ userId, templateId }) =>
  `/deleteTemplate/${encodeURIComponent(templateId)}?id=${encodeURIComponent(
    userId
  )}`;
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
const DELETE_ROOM_ELEMENT_FROM_TEMPLATE_URL = "/templateDeleteElement";
const ADD_SELECTED_QUESTIONS_TO_ELEMENT_URL = ({ userId }) =>
  `/templateAddChecklistItem?id=${encodeURIComponent(userId)}`;
const CREATE_NEW_QUESTION_IN_ELEMENT_URL = ({ userId }) =>
  `/templateAddChecklistItem?id=${encodeURIComponent(userId)}`;
const DELETE_QUESTIONS_FROM_ELEMENT_URL = "/templateDeleteChecklistItem";
const UPDATE_ROOM_ELEMENT_NAME_IN_TEMPLATE_URL = `/templateChangeElementName`;

// Inspections
const FETCH_USER_ADDED_INSPECTIONS_URL = ({ userId }) =>
  `/getInspections?id=${encodeURIComponent(userId)}`;
const FETCH_USER_INSPECTION_STATS_URL = ({ userId }) =>
  `/getUserInspectionAndPropertyData?id=${encodeURIComponent(userId)}`;
const CREATE_NEW_USER_INSPECTION_URL = ({ userId }) =>
  `/createBasicInspectionDraft?id=${encodeURIComponent(userId)}`;
const DELETE_USER_INSPECTION_URL = ({ userId, inspectionId }) =>
  `/deleteInspection/${encodeURIComponent(
    inspectionId
  )}?id=${encodeURIComponent(userId)}`;
const FETCH_USER_PROPERTIES_FOR_INSPECTION_URL = ({ userId }) =>
  `/getProperties?id=${encodeURIComponent(userId)}`;
const FETCH_USER_TEMPLATES_FOR_INSPECTION_URL = ({ userId }) =>
  `/getTemplates?id=${encodeURIComponent(userId)}`;
const FETCH_INSPECTION_DETAILS_URL = ({ inspectionId }) =>
  `/getSpecificInspection/${encodeURIComponent(inspectionId)}`;
const ADD_NEW_ROOM_IN_INSPECTION_URL = "/InspectionAddNewRoom";
const DELETE_ROOM_FROM_INSPECTION_URL = "/InspectionDeleteRoom";
const REARRANGE_ROOMS_IN_INSPECTION_URL = "/reArrangeRooms";
const FETCH_INSPECTION_ROOM_DETAILS_URL = ({ userId }) =>
  `/getInspectionRoomData?id=${encodeURIComponent(userId)}`;
const ADD_QUESTION_TO_ROOM_ELEMENT_IN_INSPECTION_URL = ({ userId }) =>
  `/InspectionAddNewChecklistItem?id=${encodeURIComponent(userId)}`;
const DELETE_QUESTIONS_FROM_INSPECTION_ELEMENT_URL =
  "/InspectionDeleteChecklistItem";
const ADD_ELEMENT_TO_ROOM_IN_INSPECTION_URL = "/InspectionAddNewElement";
const REARRANGE_ROOM_ELEMENTS_IN_INSPECTION_URL = "/reArrangeElements";
const DELETE_ROOM_ELEMENT_FROM_INSPECTION_URL = "/InspectionDeleteElement";
const UPLOAD_SPECIFIC_ROOM_IMAGE_IN_INSPECTION_URL = "/InspectionAddRoomImage";
const UPDATE_ROOM_IMAGE_CAPTION_IN_INSPECTION_URL =
  "/InspectionUpdateRoomImageCaption";
const DELETE_SPECIFIC_ROOM_IMAGE_IN_INSPECTION_URL =
  "/InspectionDeleteRoomImage";
const SAVE_INSPECTION_ROOM_AS_DRAFT_URL = "/InspectionUpdateRoom";
const SAVE_INSPECTION_ROOM_AS_COMPLETE_URL = "/InspectionUpdateRoom";
const UPDATE_SAVED_QUESTION = ({ userId }) =>
  `/updateSavedQuestion?id=${encodeURIComponent(userId)}`;
const GENERATE_INSPECTION_PDF_URL = ({ userId }) =>
  `/generateInspectionPDF?id=${encodeURIComponent(userId)}`;
const UPDATE_ROOM_ELEMENT_NAME_IN_INSPECTION_URL =
  "/InspectionChangeElementName";
const UPDATE_ROOM_ELEMENT_IMAGE_URL = ({ userId }) =>
  `/InspectionSaveElementImage?id=${encodeURIComponent(userId)}`;
const FETCH_INSPECTION_LOGS_URL = ({ userId, inspectionId, page }) =>
  `/getReportsByInspectionId?id=${encodeURIComponent(
    userId
  )}&inspectionId=${encodeURIComponent(inspectionId)}&page=${page}&limit=10`;
const SAVE_INSPECTION_AS_DRAFT_URL = `/saveInspectionDraft`;

const USER_DETAILS_ENDPOINTS = {
  // User Details
  GET_USER_PROILE_URL,
  UPDATE_USER_PROILE_URL,
  // Sub Users
  FETCH_SUB_USER_FOR_USER_URL,
  FETCH_SUB_USER_DETAILS_URL,
  UPDATE_SUB_USER_DETAILS_URL,
  CREATE_NEW_SUB_USER_URL,
  DELETE_SUB_USER_URL,
  // Properties
  FETCH_USER_ADDED_PROPERTY_CATEGORIES_URL,
  FETCH_USER_ADDED_PROPERTIES_URL,
  FETCH_PROPERTY_DETAILS_URL,
  UPDATE_PROPERTY_DETAILS_URL,
  ADD_NEW_USER_PROPERTY_URL,
  CREATE_NEW_PROPERTY_CATEGORY_URL,
  UPDATE_PROPERTY_CATEGORY_URL,
  DELETE_USER_PROPERTY_CATEGORY_URL,
  DELETE_USER_PROPERTY_URL,
  FETCH_LINKED_PROPERTY_INSPECTIONS_URL,
  // Templates
  CREATE_NEW_TEMPLATE_URL,
  DELETE_USER_TEMPLATE_URL,
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
  DELETE_ROOM_ELEMENT_FROM_TEMPLATE_URL,
  ADD_SELECTED_QUESTIONS_TO_ELEMENT_URL,
  CREATE_NEW_QUESTION_IN_ELEMENT_URL,
  DELETE_QUESTIONS_FROM_ELEMENT_URL,
  UPDATE_ROOM_ELEMENT_NAME_IN_TEMPLATE_URL,
  // Inspections
  FETCH_USER_ADDED_INSPECTIONS_URL,
  FETCH_USER_INSPECTION_STATS_URL,
  CREATE_NEW_USER_INSPECTION_URL,
  DELETE_USER_INSPECTION_URL,
  FETCH_USER_PROPERTIES_FOR_INSPECTION_URL,
  FETCH_USER_TEMPLATES_FOR_INSPECTION_URL,
  FETCH_INSPECTION_DETAILS_URL,
  ADD_NEW_ROOM_IN_INSPECTION_URL,
  DELETE_ROOM_FROM_INSPECTION_URL,
  REARRANGE_ROOMS_IN_INSPECTION_URL,
  FETCH_INSPECTION_ROOM_DETAILS_URL,
  ADD_QUESTION_TO_ROOM_ELEMENT_IN_INSPECTION_URL,
  DELETE_QUESTIONS_FROM_INSPECTION_ELEMENT_URL,
  ADD_ELEMENT_TO_ROOM_IN_INSPECTION_URL,
  REARRANGE_ROOM_ELEMENTS_IN_INSPECTION_URL,
  DELETE_ROOM_ELEMENT_FROM_INSPECTION_URL,
  UPLOAD_SPECIFIC_ROOM_IMAGE_IN_INSPECTION_URL,
  UPDATE_ROOM_IMAGE_CAPTION_IN_INSPECTION_URL,
  DELETE_SPECIFIC_ROOM_IMAGE_IN_INSPECTION_URL,
  SAVE_INSPECTION_ROOM_AS_DRAFT_URL,
  SAVE_INSPECTION_ROOM_AS_COMPLETE_URL,
  UPDATE_SAVED_QUESTION,
  GENERATE_INSPECTION_PDF_URL,
  UPDATE_ROOM_ELEMENT_NAME_IN_INSPECTION_URL,
  UPDATE_ROOM_ELEMENT_IMAGE_URL,
  FETCH_INSPECTION_LOGS_URL,
  SAVE_INSPECTION_AS_DRAFT_URL,
};

export default USER_DETAILS_ENDPOINTS;
