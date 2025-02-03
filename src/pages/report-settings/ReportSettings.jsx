import { useForm } from "@mantine/form";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import ReportSkeleton from "./../../features/report-settings/components/ReportSkeleton";
import { reportSettingsAPIs } from "../../features/report-settings/api";
import { Textarea } from "@mantine/core";
import Button from "./../../components/ui/Button";

const ReportSettings = () => {
  const reportForm = useForm({
    initialValues: {
      reportDisclaimer: "",
    },
    validate: {
      reportDisclaimer: (value) =>
        value.length > 75
          ? "The disclaimer should not exceed 75 characters."
          : null,
    },
  });

  const formRef = useRef(reportForm);
  const isMounted = useRef(true);

  // Fetch report settings - Query
  const fetchReportSettingsQuery = useQuery({
    queryKey: ["reportSettings"],
    queryFn: () =>
      reportSettingsAPIs.getReportSettings({ planType: "FREETIER" }),
  });

  // Update report settings - Mutation
  const updatePlanSettingsMutation = useMutation({
    mutationFn: () => {
      return reportSettingsAPIs.updateReportSettings({
        reportWatermark: reportForm.values.reportDisclaimer,
      });
    },
    onSuccess: () => {
      toast.success("Updated Report Disclaimer", {
        description: "Report Disclaimer updated successfully!",
      });
    },
    onError: (error) => {
      toast.error("Error updating Report Disclaimer", {
        description: error.message,
        duration: 3000,
      });
    },
  });

  // Set form values on mount when data is available
  useEffect(() => {
    isMounted.current = true; // Component is mounted

    if (fetchReportSettingsQuery.data && isMounted.current) {
      formRef.current.setValues({
        reportDisclaimer: fetchReportSettingsQuery.data.reportWatermark || "",
      });
    }

    return () => {
      isMounted.current = false; // Component is unmounted
    };
  }, [fetchReportSettingsQuery.data]);

  // Loading state - Skeleton
  if (fetchReportSettingsQuery.isPending) {
    return <ReportSkeleton />;
  }

  // Error state - Toast
  if (fetchReportSettingsQuery.isError) {
    return toast.error(fetchReportSettingsQuery.error.message, {
      description: "Error fetching report settings",
      duration: 3000,
    });
  }

  return (
    <>
      <Textarea
        label="Report Disclaimer"
        description="Disclaimer limit should not exceed 75 characters."
        placeholder="Details..."
        {...reportForm.getInputProps("reportDisclaimer")}
        autosize
        minRows={8}
        disabled={updatePlanSettingsMutation.isPending}
      />
      <Button
        id="save-report-disclaimer"
        type="button"
        label="Save"
        buttonType="contained"
        onClick={() => {
          reportForm.validate();
          if (reportForm.isValid()) {
            updatePlanSettingsMutation.mutate();
          }
        }}
        className="min-w-[216px] mt-[32px]"
        isLoading={updatePlanSettingsMutation.isPending}
        disabled={updatePlanSettingsMutation.isPending}
      />
    </>
  );
};

export default ReportSettings;
