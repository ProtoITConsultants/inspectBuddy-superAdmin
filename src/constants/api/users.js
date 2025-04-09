// API Endpoints
const GET_ALL_USERS_URL = ({ page, searchQuery, subscriptionPlan }) =>
  `/getAllUsers?page=${encodeURIComponent(
    page
  )}&limit=10&search=${encodeURIComponent(
    searchQuery
  )}&filter=${encodeURIComponent(subscriptionPlan)}`;

const GENERATE_USERS_CSV_FILE_URL = "/getUsersExcelSheet";

const USERS_ENDPOINTS = {
  GET_ALL_USERS_URL,
  GENERATE_USERS_CSV_FILE_URL,
};

export default USERS_ENDPOINTS;
