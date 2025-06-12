// API Endpoints
const FETCH_SETTINGS_URL = (planType) =>
  `/getPricingPlan?planType=${encodeURIComponent(planType)}`;
const UPDATE_SETTINGS_URL = "/updatePricingPlan";

// Subscription Management Endpoints
const GET_SUBSCRIPTION_PLANS_URL = `/getPricingPlans`;
const SUBSCRIBE_USER_URL = ({ userId }) =>
  `/subscribeUser?id=${encodeURIComponent(userId)}`;
const CANCEL_SUBSCRIPTION_URL = ({ userId }) =>
  `/cancelSubscription?id=${encodeURIComponent(userId)}`;
const CHANGE_SUBSCRIPTION_URL = ({ userId }) =>
  `/changeSubscription?id=${encodeURIComponent(userId)}`;
const GET_USER_PLAN_ENTITY_LIMITS_URL = ({ userId, planName }) =>
  `/getUserEntityLimits?planName=${encodeURIComponent(
    planName
  )}&id=${encodeURIComponent(userId)}`;

const PLAN_SETTINGS_ENDPOINTS = {
  FETCH_SETTINGS_URL,
  UPDATE_SETTINGS_URL,

  // Subscription Management Endpoints
  GET_SUBSCRIPTION_PLANS_URL,
  SUBSCRIBE_USER_URL,
  CANCEL_SUBSCRIPTION_URL,
  CHANGE_SUBSCRIPTION_URL,
  GET_USER_PLAN_ENTITY_LIMITS_URL,
};

export default PLAN_SETTINGS_ENDPOINTS;
