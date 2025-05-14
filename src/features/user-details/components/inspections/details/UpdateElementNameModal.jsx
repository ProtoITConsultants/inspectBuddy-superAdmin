import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { userInspectionsAPIs } from "../../../api/user-inspections";
import { useForm } from "@mantine/form";
import { ModalActions, ModalRoot } from "../../../../../components/ui/Modal";
import { TextInput } from "@mantine/core";
import Button from "../../../../../components/ui/Button";
import { useInspectionStore } from "../../../../../store/inspectionStore";
import { useEffect, useRef } from "react";
import { userTemplatesAPIs } from "../../../api/template";
import { toast } from "sonner";
import { useTemplateStore } from "./../../../../../store/templateStore";

const UpdateElementNameModal = ({
  isModalOpen = false,
  onCloseModal,
  elementData,
  type,
}) => {
  const elementNameForm = useForm({
    initialValues: {
      elementName: elementData.name || "",
    },
    validate: {
      elementName: (value) =>
        value.length > 0 ? null : "Please enter a name for the element",
    },
  });

  // Hooks
  const { userId, inspectionId, roomId, templateId } = useParams();

  // Global State
  const selectedInspectionRoomElements = useInspectionStore(
    (state) => state.selectedInspectionRoomElements
  );
  const setSelectedInspectionRoomElements = useInspectionStore(
    (state) => state.setSelectedInspectionRoomElements
  );

  const selectedTemplateRoomElements = useTemplateStore(
    (state) => state.selectedTemplateRoomElements
  );
  const setSelectedTemplateRoomElements = useTemplateStore(
    (state) => state.setSelectedTemplateRoomElements
  );

  // Update Element Name - Mutation
  const updateElementNameMutation = useMutation({
    mutationFn: () =>
      type === "inspection"
        ? userInspectionsAPIs.updateRoomElementNameInInspection({
            userId,
            inspectionId,
            roomId,
            elementId: elementData?._id || "",
            elementName: elementNameForm.values.elementName,
          })
        : userTemplatesAPIs.updateRoomElementNameInTemplate({
            userId,
            templateId,
            roomId,
            elementId: elementData?._id || "",
            elementName: elementNameForm.values.elementName,
          }),

    onSuccess: () => {
      if (type === "inspection") {
        const updatedElements = selectedInspectionRoomElements.map(
          (element) => {
            if (element._id === elementData._id) {
              return { ...element, name: elementNameForm.values.elementName };
            }
            return element;
          }
        );

        setSelectedInspectionRoomElements(updatedElements);
      } else {
        const updatedElements = selectedTemplateRoomElements.map((element) => {
          if (element._id === elementData._id) {
            return { ...element, name: elementNameForm.values.elementName };
          }
          return element;
        });

        setSelectedTemplateRoomElements(updatedElements);
      }

      // Close the modal after successful update
      onCloseModal();
      elementNameForm.reset();
    },

    onError: (error) => {
      console.error("Error updating element name:", error);
      toast.error("Error!", {
        description: error?.message || "Error updating element name",
        duration: 3000,
        richColors: true,
      });
    },
  });

  // Use Effect to set the initial value of the form when the modal opens
  const formRef = useRef(elementNameForm);
  useEffect(() => {
    if (isModalOpen) {
      formRef.current.setFieldValue("elementName", elementData.name);
    }
  }, [isModalOpen, elementData.name]);

  return (
    <ModalRoot
      id="update-inspection-elementName-modal"
      loadingOverlay={updateElementNameMutation.isPending}
      openModal={isModalOpen}
      onClose={() => {
        onCloseModal();
        elementNameForm.reset();
      }}
    >
      <div className="flex flex-col gap-[8px]">
        <h2 className="font-bold md:text-[24px] text-[20px] text-dark-blue ">
          Update Element Name
        </h2>
        <p className="text-[14px] text-gray-500">
          Please enter a new name for the element below.
        </p>
      </div>
      <form
        onSubmit={elementNameForm.onSubmit(updateElementNameMutation.mutate)}
        className="mt-[8px] flex flex-col gap-[16px]"
      >
        <TextInput
          id="element-name"
          label="Element Name"
          placeholder="Enter element name"
          {...elementNameForm.getInputProps("elementName")}
          className="w-full"
        />
        <ModalActions>
          <Button
            id="confirm-update-inspection-name"
            type="submit"
            buttonType="contained"
            label="Confirm"
            buttonColor="#FF613E"
            className="!font-bold hover:!bg-warning-red-dark"
          />
          <Button
            id="cancel-update-inspection-name"
            type="button"
            buttonType="outlined"
            onClick={() => {
              onCloseModal();
              elementNameForm.reset();
            }}
            label="Cancel"
            className="!font-bold"
          />
        </ModalActions>
      </form>
    </ModalRoot>
  );
};

export default UpdateElementNameModal;
