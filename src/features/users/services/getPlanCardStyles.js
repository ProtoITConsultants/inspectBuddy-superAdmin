const planConfig = {
  FREETIER: {
    status: "Free Plan",
    bgColor: "rgba(205,192,81,0.14)",
    textColor: "#CDC051",
  },
  TRIALTIER: {
    status: "Trial",
    bgColor: "rgba(90,166,63,0.14)",
    textColor: "#5AA63F",
  },
  STANDARDTIER: {
    status: "Standard Plan",
    bgColor: "rgba(115,63,166,0.14)",
    textColor: "#733FA6",
  },
  TOPTIER: {
    status: "Top Tier Plan",
    bgColor: "rgba(63,141,166,0.14)",
    textColor: "#3F8DA6",
  },
};

export const getPlanCardStyles = (role) => {
  return (
    planConfig[role] || {
      status: "Unknown Plan",
      bgColor: "rgba(0,0,0,0.1)",
      textColor: "#000000",
    }
  );
};
