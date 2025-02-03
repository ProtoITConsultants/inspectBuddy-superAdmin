import { useRef, useEffect } from "react";

const usePlanPricesChanged = (currentValues, initialValues) => {
  const initialValuesRef = useRef();

  useEffect(() => {
    initialValuesRef.current = initialValues;
  }, [initialValues]);

  const hasPlanPricesChanged = () => {
    const { monthlyPlanPrice, yearlyPlanPrice } = currentValues;
    const {
      monthlyPlanPrice: initialMonthlyPrice,
      yearlyPlanPrice: initialYearlyPrice,
    } = initialValuesRef.current;

    return (
      monthlyPlanPrice !== initialMonthlyPrice ||
      yearlyPlanPrice !== initialYearlyPrice
    );
  };

  return hasPlanPricesChanged;
};

export default usePlanPricesChanged;
