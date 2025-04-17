import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { userInspectionsAPIs } from "../../api/user-inspections";
import { ModalActions, ModalRoot } from "../../../../components/ui/Modal";
import { useForm } from "@mantine/form";
import { Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import Button from "../../../../components/ui/Button";
import { CALENDAR_ICON } from "../../../../assets/icons/CalendarIcon";
import { useState } from "react";

const AddInspectionModal = ({
  isModalOpen = false,
  onCloseModal,
  inspectionType = "",
}) => {
  // Hooks
  const queryClient = useQueryClient();
  const { userId } = useParams();
  const navigate = useNavigate();

  // Local State
  const [saveInspectionAsDraft, setSaveInspectionAsDraft] = useState(false);

  const newInspectionForm = useForm({
    initialValues: {
      inspectionCreationDate: new Date(),
      linkedProperty: "",
      LinkedTemplate: "",
    },

    validate: {
      inspectionCreationDate: (value) =>
        value ? null : "Please select a date of inspection",
      LinkedTemplate: (value) =>
        inspectionType === "template" && !value
          ? "Please select a template"
          : null,
      linkedProperty: (value) => (value ? null : "Please select a property"),
    },
  });

  // Fetch Inspections and Properties - Queries
  const userPropertiesAndInspectionsQuery = useQueries({
    queries: [
      {
        queryKey: ["userPropertiesForNewInspection"],
        queryFn: () =>
          userInspectionsAPIs.fetchUserPropertiesForInspection({ userId }),
        enabled: isModalOpen,
      },
      {
        queryKey: ["userTemplatesForNewInspection"],
        queryFn: () =>
          userInspectionsAPIs.fetchUserTemplatesForInspection({ userId }),
        enabled: isModalOpen,
      },
    ],
    combine: (data) => ({
      userProperties: data[0].data,
      userInspectionTemplates: data[1].data,
    }),
  });

  // Create New Inspection - Mutation
  const createNewInspection = useMutation({
    mutationFn: () => {
      const { userProperties, userInspectionTemplates } =
        userPropertiesAndInspectionsQuery;

      const selectedProperty = userProperties.find(
        (p) => p._id === newInspectionForm.values.linkedProperty
      );

      const selectedTemplate = userInspectionTemplates.find(
        (t) => t._id === newInspectionForm.values.LinkedTemplate
      );

      const API_DATA = {
        propertyId: selectedProperty?._id,
        name:
          selectedProperty?.address?.unit +
          ", " +
          selectedProperty?.address?.street +
          " - Inspection",
        creationDate: new Date(
          newInspectionForm?.values?.inspectionCreationDate
        ).toISOString(),
        // if inspection type is template, then add template id
        ...(inspectionType === "template" && {
          templateId: selectedTemplate?._id,
        }),
      };

      return userInspectionsAPIs.createNewInspection({
        userId,
        inspectionData: API_DATA,
      });
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["inspectionsQuery", "userInspectionStats"],
      });
      toast.success("Success!", {
        description: "Inspection created successfully!",
        duration: 3000,
        // richColors: true,
      });

      if (!saveInspectionAsDraft) {
        navigate(
          `/user-details/${userId}/inspections/details/${data?.inspectionid}/edit-details`
        );
      }

      newInspectionForm.reset();

      setSaveInspectionAsDraft(false);
      // Reset the Editing State
      onCloseModal();
    },
    onError: () => {
      toast.error("Error!", {
        description: "Couldn't create Inspection.",
        duration: 3000,
        // richColors: true,
      });
    },
  });

  return (
    <ModalRoot
      id="add-inspection-modal"
      loadingOverlay={
        createNewInspection.isPending ||
        userPropertiesAndInspectionsQuery.isPending
      }
      openModal={isModalOpen}
      onClose={() => onCloseModal()}
    >
      <h2 className="font-bold md:text-[24px] text-[20px] text-dark-blue mb-[8px]">
        New Inspection{inspectionType === "template" && ` (Template)`}
      </h2>
      <form
        onSubmit={newInspectionForm.onSubmit(createNewInspection.mutate)}
        className="mt-[8px] flex flex-col gap-[16px]"
      >
        <div className="md:grid grid-cols-2 flex flex-col gap-[16px]">
          <Select
            id="select-property-for-inspection"
            label="Select Property"
            placeholder="Select Property"
            data={userPropertiesAndInspectionsQuery.userProperties?.map((p) => {
              return {
                value: p._id,
                label: p.name,
              };
            })}
            {...newInspectionForm.getInputProps("linkedProperty")}
            className={`w-full font-medium ${
              inspectionType === "template" && "col-span-2"
            }`}
            clearable
            searchable
            withAsterisk
            nothingFoundMessage="Nothing found..."
          />
          <DateInput
            id="inspectionCreationDate"
            defaultValue={new Date()}
            onChange={(value) =>
              newInspectionForm.setFieldValue("inspectionCreationDate", value)
            }
            label="Date of Inspection"
            placeholder="Enter Date"
            className={`w-full font-medium`}
            rightSection={<CALENDAR_ICON className="text-[#9EA3AE]" />}
          />

          {inspectionType === "template" && (
            <Select
              id="select-template"
              label="Select Template"
              placeholder="Select Template"
              data={userPropertiesAndInspectionsQuery.userInspectionTemplates?.map(
                (t) => ({
                  value: t._id,
                  label: t.name,
                })
              )}
              {...newInspectionForm.getInputProps("LinkedTemplate")}
              className="w-full font-medium"
              clearable
              searchable
              nothingFoundMessage="Nothing found..."
            />
          )}
        </div>
        <ModalActions>
          <Button
            id="create-inspection-btn"
            type="submit"
            buttonType="contained"
            label="Confirm"
            className="!font-bold sm:w-[216px] w-full"
          />
          <Button
            id="create-inspection-draft-btn"
            type="submit"
            buttonType="outlined"
            onClick={() => {
              setSaveInspectionAsDraft(true);
            }}
            label="Save as Draft"
            borderColor="#FF613E"
            className="!font-bold hover:!bg-[#FF613E] hover:!text-white !text-[#FF613E] sm:w-[216px] w-full"
          />
        </ModalActions>
      </form>
    </ModalRoot>
  );
};

export default AddInspectionModal;
