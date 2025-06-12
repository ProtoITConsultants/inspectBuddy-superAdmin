import { useEffect, useRef, useState } from "react";
import PLAN_SETTINGS from "./../../constants/planSettings";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { planSettingsAPIs } from "../../features/plan-settings/api";
import { toast } from "sonner";
import Button from "./../../components/ui/Button";
import { Checkbox, NumberInput, Tabs } from "@mantine/core";
import PlanSkeleton from "../../features/plan-settings/components/PlanSkeleton";
import Settings from "../../features/plan-settings/components/PlanSettingsComponents";
import useFormChanged from "../../features/plan-settings/hooks/useFormChanged";
import usePlanPricesChanged from "../../features/plan-settings/hooks/usePlanPricesChanged";
import WarningModal from "../../features/plan-settings/components/WarningModal";
import EditSettingsBtn from "../../features/plan-settings/components/EditSettingsBtn";

const PlanSettings = () => {
  // Local States
  const [activeTab, setActiveTab] = useState("FREETIER");
  const [editDetails, setEditDetails] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [modalLoadingOverlay, setModalLoadingOverlay] = useState(false);

  // Plan Form - Form Hook - Mantine
  const planForm = useForm({
    initialValues: PLAN_SETTINGS.PLAN_FIELDS.reduce((acc, field) => {
      acc[field.name] = "";
      acc.unlimitedValues = { ...acc.unlimitedValues, [field.name]: false };
      return acc;
    }, {}),
    validate: PLAN_SETTINGS.PLAN_FIELDS.reduce((acc, field) => {
      acc[field.name] = (value) =>
        value > 0 || planForm.values.unlimitedValues[field.name]
          ? null
          : `${field.label} must be greater than 0`;
      return acc;
    }, {}),
  });

  // Local Refs
  const initialValuesRef = useRef();
  const formRef = useRef(planForm);

  // Hooks
  // Use custom hook for checking if the form has changed
  const hasFormChanged = useFormChanged(
    planForm.values,
    initialValuesRef.current
  );

  // Use custom hook for checking if the plan prices have changed
  const hasPlanPricesChanged = usePlanPricesChanged(
    planForm.values,
    initialValuesRef.current
  );

  // Fetch plan settings - Query
  const fetchPlanSettingsQuery = useQuery({
    queryKey: ["planSettingsQuery", activeTab],
    queryFn: () => planSettingsAPIs.getPlanSettings({ planType: activeTab }),
  });

  // Update plan settings - Mutation
  const updatePlanSettingsMutation = useMutation({
    mutationFn: ({ applyToExistingSubscribers = false }) => {
      const planData = {
        ...PLAN_SETTINGS.PLAN_FIELDS.reduce((acc, field) => {
          acc[field.name] = planForm.values.unlimitedValues[field.name]
            ? -999
            : parseInt(planForm.values[field.name]);
          return acc;
        }, {}),
        monthlyPrice: parseInt(planForm.values.monthlyPlanPrice),
        yearlyPrice: parseInt(planForm.values.yearlyPlanPrice),
      };

      // Check if Monthly Price has changed/
      const shouldChangeMonthlyPrice =
        initialValuesRef.current.monthlyPlanPrice !==
        planForm.values.monthlyPlanPrice;
      // Check if Yearly Price has changed
      const shouldChangeYearlyPrice =
        initialValuesRef.current.yearlyPlanPrice !==
        planForm.values.yearlyPlanPrice;

      console.log("API Methods", {
        planType: activeTab,
        planData: planData,
        applyToExistingSubscribers: applyToExistingSubscribers,
        shouldChangeMonthlyPrice: shouldChangeMonthlyPrice,
        shouldChangeYearlyPrice: shouldChangeYearlyPrice,
      });

      return planSettingsAPIs.updatePlanSettings({
        planType: activeTab,
        planData,
        applyToExistingSubscribers,
        shouldChangeMonthlyPrice,
        shouldChangeYearlyPrice,
      });
    },
    onSuccess: () => {
      setModalLoadingOverlay(false);
      setOpenWarningModal(false);
      toast.success("Plan Settings Updated", {
        description: "Plan Settings updated successfully!",
        duration: 3000,
      });
      setEditDetails(false);
    },
    onError: (error) => {
      setModalLoadingOverlay(false);
      setOpenWarningModal(false);
      toast.error("Error updating Plan Settings", {
        description: error.message,
        duration: 3000,
      });
    },
  });

  // Set initial values on mount
  useEffect(() => {
    if (fetchPlanSettingsQuery.data) {
      const initialValues = {
        monthlyPlanPrice:
          fetchPlanSettingsQuery.data?.monthlyPrice === -999
            ? 0
            : fetchPlanSettingsQuery.data?.monthlyPrice,
        yearlyPlanPrice:
          fetchPlanSettingsQuery.data?.yearlyPrice === -999
            ? 0
            : fetchPlanSettingsQuery.data?.yearlyPrice,
        ...PLAN_SETTINGS.PLAN_FIELDS?.reduce((acc, field) => {
          // Handle limits and values separately for unlimited checks
          const fieldValue = fetchPlanSettingsQuery.data[field.name];
          acc[field.name] = fieldValue === -999 ? 0 : fieldValue; // Set to 0 if -999
          acc.unlimitedValues = acc.unlimitedValues || {}; // Initialize unlimitedValues object
          acc.unlimitedValues[field.name] = fieldValue === -999; // Check if -999 means unlimited
          return acc;
        }, {}),
      };

      // Set the initial values for the form
      formRef.current.setValues(initialValues);
      initialValuesRef.current = initialValues;
    }
  }, [fetchPlanSettingsQuery.data]);

  // Validate form
  const validateAndUpdatePlanSettings = () => {
    // Validate the form
    const validation = planForm.validate();
    if (!validation.hasErrors) {
      // Check if priceValues Changes as well
      const hasPriceChanged = hasPlanPricesChanged();

      if (hasPriceChanged) {
        return setOpenWarningModal(true);
      }

      updatePlanSettingsMutation.mutate({
        applyToExistingSubscribers: false,
      });
    }
  };

  // Render Toast if error
  if (fetchPlanSettingsQuery.isError) {
    return toast.error("Error fetching Plan Settings", {
      description: fetchPlanSettingsQuery.error.message,
      duration: 3000,
    });
  }

  return (
    <>
      {!editDetails && (
        <EditSettingsBtn onClick={() => setEditDetails(!editDetails)} />
      )}

      {openWarningModal && (
        <WarningModal
          id="planSettingsWarningModal"
          isModalOpen={openWarningModal}
          onClose={() => setOpenWarningModal(false)}
          onUpdate={(value) => {
            setModalLoadingOverlay(true);
            updatePlanSettingsMutation.mutate({
              applyToExistingSubscribers: value,
            });
          }}
          loadingOverlay={modalLoadingOverlay}
        />
      )}

      <Tabs
        value={activeTab}
        onChange={(value) => {
          setActiveTab(value);
          setEditDetails(false);
          // Set the initial values for the form
          formRef.current.setValues(initialValuesRef.current);
        }}
        className="w-full max-w-[570px]"
        keepMounted={false}
      >
        <Tabs.List className="mb-[24px]">
          <Tabs.Tab value="FREETIER">Free Plan</Tabs.Tab>
          <Tabs.Tab value="STANDARDTIER">Standard Plan</Tabs.Tab>
          <Tabs.Tab value="TOPTIER">Enterprise Plan</Tabs.Tab>
        </Tabs.List>

        {fetchPlanSettingsQuery.isPending ? (
          <PlanSkeleton />
        ) : (
          PLAN_SETTINGS.PLAN_TYPES.map((plan) => (
            <Tabs.Panel key={plan} value={plan}>
              <Settings.Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validateAndUpdatePlanSettings();
                }}
              >
                <Settings.FormSection sectionHeading="Pricing Details">
                  <NumberInput
                    min={0}
                    label="Plan Price ($/per month)"
                    {...planForm.getInputProps("monthlyPlanPrice")}
                    className="w-full"
                    disabled={!editDetails}
                  />
                  <NumberInput
                    min={0}
                    label="Plan Price ($/per year)"
                    {...planForm.getInputProps("yearlyPlanPrice")}
                    className="w-full"
                    disabled={!editDetails}
                  />
                </Settings.FormSection>

                {PLAN_SETTINGS.PLAN_SETTINGS_SECTIONS.map(
                  ({ heading, fields }, sectionIndex) => (
                    <Settings.FormSection
                      key={heading}
                      sectionHeading={heading}
                    >
                      {fields.map(({ name, label }, fieldIndex) => (
                        <Settings.InputWrapper
                          key={name}
                          className={`${
                            (sectionIndex === 0 && fieldIndex === 2) ||
                            (sectionIndex === 2 && fieldIndex === 0)
                              ? "md:col-span-2"
                              : ""
                          }`}
                        >
                          <NumberInput
                            min={0}
                            label={label}
                            {...planForm.getInputProps(name)}
                            className="w-full"
                            disabled={
                              !editDetails ||
                              planForm.values.unlimitedValues[name]
                            }
                          />
                          <Checkbox
                            disabled={!editDetails}
                            label={`Unlimited ${label.split(" ")[0]}`}
                            {...planForm.getInputProps(
                              `unlimitedValues.${name}`,
                              {
                                type: "checkbox",
                              }
                            )}
                          />
                        </Settings.InputWrapper>
                      ))}
                    </Settings.FormSection>
                  )
                )}

                {editDetails && (
                  <div className="flex gap-4 mt-4">
                    <Button
                      type="submit"
                      label="Save"
                      buttonColor="#2A85FF"
                      buttonType="contained"
                      disabled={!hasFormChanged()}
                      className="w-full"
                    />
                    <Button
                      type="button"
                      label="Cancel"
                      buttonType="outlined"
                      borderColor="#FF613E"
                      onClick={() => {
                        setEditDetails(false);
                        // Reset form values to initial values
                        planForm.setValues(initialValuesRef.current);
                      }}
                      className="w-full !text-[#FF613E] hover:!text-white hover:!bg-[#FF613E]"
                    />
                  </div>
                )}
              </Settings.Form>
            </Tabs.Panel>
          ))
        )}
      </Tabs>
    </>
  );
};

export default PlanSettings;
