// API Endpoints
const FETCH_SETTINGS_URL = (planType) =>
  `/getPricingPlan?planType=${encodeURIComponent(planType)}`;
const UPDATE_SETTINGS_URL = "/updatePricingPlan";

const PLAN_SETTINGS_ENDPOINTS = {
  FETCH_SETTINGS_URL,
  UPDATE_SETTINGS_URL,
};

export default PLAN_SETTINGS_ENDPOINTS;
