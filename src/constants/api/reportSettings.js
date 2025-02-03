// API Endpoints
const FETCH_SETTINGS_URL = (planType) =>
  `/getPricingPlan?planType=${encodeURIComponent(planType)}`;
const UPDATE_SETTINGS_URL = "/changeFreeTierReportWatermark";

const REPORT_SETTINGS_ENDPOINTS = {
  FETCH_SETTINGS_URL,
  UPDATE_SETTINGS_URL,
};

export default REPORT_SETTINGS_ENDPOINTS;
