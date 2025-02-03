import { useRef, useEffect } from "react";

const useFormChanged = (currentValues, initialValues) => {
  const initialValuesRef = useRef();

  useEffect(() => {
    initialValuesRef.current = initialValues;
  }, [initialValues]);

  const hasFormChanged = () => {
    return (
      JSON.stringify(currentValues) !== JSON.stringify(initialValuesRef.current)
    );
  };

  return hasFormChanged;
};

export default useFormChanged;
