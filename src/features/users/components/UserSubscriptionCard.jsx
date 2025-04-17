import { cn } from "../../../utils/cn";
import { getPlanCardStyles } from "../services/getPlanCardStyles";

const UserSubscriptionCard = ({ subscriptionPlan }) => {
  // Valid Subscription Plans
  const VALID_SUBSCRIPTION_PLANS = [
    "FREETIER",
    "TRIALTIER",
    "STANDARDTIER",
    "TOPTIER",
  ];
  // Check if the subscription plan is valid
  const isValidPlan = VALID_SUBSCRIPTION_PLANS.includes(subscriptionPlan);

  // Get the Subscription card styles based on the Subsription Plan
  const { bgColor, textColor, status } = isValidPlan
    ? getPlanCardStyles(subscriptionPlan)
    : { status: "Unknown Plan", bgColor: "#F5F5F5", textColor: "#000000" };

  return (
    <div
      className={`p-[8px] rounded-[8px] w-fit`}
      style={{
        color: textColor,
        backgroundColor: bgColor,
      }}
    >
      <p className={cn(`text-[14px] font-bold whitespace-nowrap`)}>{status}</p>
    </div>
  );
};

export default UserSubscriptionCard;
