// API Endpoints
const GET_USER_PROILE_URL = ({ userId }) =>
  `/fetchUserDetails?id=${encodeURIComponent(userId)}`;

const UPDATE_USER_PROILE_URL = "/updateCompleteUserProfile";

const USER_DETAILS_ENDPOINTS = {
  GET_USER_PROILE_URL,
  UPDATE_USER_PROILE_URL,
};

export default USER_DETAILS_ENDPOINTS;
