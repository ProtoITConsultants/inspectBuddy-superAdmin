// API Endpoints
const GET_ALL_USERS_URL = ({ page, searchQuery, subscriptionPlan }) =>
  `/getAllUsers?page=${encodeURIComponent(
    page
  )}&limit=10&search=${encodeURIComponent(
    searchQuery
  )}&filter=${encodeURIComponent(subscriptionPlan)}`;

const USERS_ENDPOINTS = {
  GET_ALL_USERS_URL,
};

export default USERS_ENDPOINTS;
