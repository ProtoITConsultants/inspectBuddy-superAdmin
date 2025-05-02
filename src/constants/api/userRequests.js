// API Endpoints
const FETCH_USERS_WITH_REQUESTS_URL = ({ search, page }) =>
  `/getUsersWithRequests?search=${encodeURIComponent(
    search
  )}&page=${encodeURIComponent(page)}`;
const FETCH_USERS_WITH_REQUESTS_BY_ENTITY_URL = ({ userId, type, page }) =>
  `/getUserRequestsByEntity/${encodeURIComponent(
    userId
  )}?type=${encodeURIComponent(type)}&page=${encodeURIComponent(page)}`;

const APPROVE_USER_REQUEST_URL = ({ userId }) =>
  `/manageRequests?id=${encodeURIComponent(userId)}`;

const USER_REQUESTS_ENDPOINTS = {
  FETCH_USERS_WITH_REQUESTS_URL,
  FETCH_USERS_WITH_REQUESTS_BY_ENTITY_URL,
  APPROVE_USER_REQUEST_URL,
};

export default USER_REQUESTS_ENDPOINTS;
