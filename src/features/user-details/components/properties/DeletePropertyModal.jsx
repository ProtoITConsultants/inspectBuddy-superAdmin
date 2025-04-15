import { useState } from "react";
import { ModalActions, ModalRoot } from "../../../../components/ui/Modal";
import { Stepper, TextInput } from "@mantine/core";
import Button from "../../../../components/ui/Button";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { userPropertiesAPIs } from "../../api/user-properties";
import { toast } from "sonner";

const DeletePropertyModal = ({
  isModalOpen = false,
  onCloseModal,
  propertyToDelete,
}) => {
  // Hooks
  const queryClient = useQueryClient();
  const { userId } = useParams();

  // Local States
  const [active, setActive] = useState(0);

  const deleteForm = useForm({
    initialValues: {
      deleteText: "",
    },
    validate: {
      deleteText: (value) => (value !== "DELETE" ? "Invalid Text" : null),
    },
  });

  // Delete Property - Mutation
  const deleteProperty = useMutation({
    mutationFn: () =>
      userPropertiesAPIs.deleteUserProperty({
        userId,
        propertyId: propertyToDelete._id,
      }),

    onSuccess: () => {
      onCloseModal();
      queryClient.invalidateQueries(["propertiesQuery"]);
      setActive(0);
      toast.success("Success!", {
        description: "Property deleted successfully.",
        duration: 3000,
        richColors: true,
      });
    },

    onError: () => {
      toast.error("Error!", {
        description: "Couldn't delete Property.",
        duration: 3000,
        richColors: true,
      });
    },
  });

  return (
    <ModalRoot
      id="delete-property-modal"
      loadingOverlay={deleteProperty.isPending}
      openModal={isModalOpen}
      onClose={() => onCloseModal()}
    >
      <Stepper
        styles={{
          steps: {
            display: "none",
          },
          content: {
            padding: 0,
          },
        }}
        active={active}
        onStepClick={setActive}
      >
        <Stepper.Step id="confirmation-step-1">
          <h2 className="font-bold md:text-[24px] text-[20px] text-dark-blue mb-[8px]">
            Confirmation
          </h2>
          <p>
            Are you sure you want to delete this <b>property</b>&nbsp;and
            all&nbsp;
            <b>inspections</b>&nbsp;associated with it? This action cannot be
            undone.
          </p>
          <ModalActions>
            <Button
              id="confirm-delete-property"
              type="button"
              buttonType="contained"
              onClick={() => setActive(1)}
              label="Confirm"
              buttonColor="#FF613E"
              className="!font-bold hover:!bg-warning-red-dark"
            />
            <Button
              id="cancel-delete-property"
              type="button"
              buttonType="outlined"
              onClick={() => onCloseModal()}
              label="Cancel"
              className="!font-bold"
            />
          </ModalActions>
        </Stepper.Step>
        <Stepper.Step id="confirmation-step-2">
          <h2 className="font-bold md:text-[24px] text-[20px] text-dark-blue mb-[8px]">
            Confirmation
          </h2>
          <p className="text-dark-blue text-[14px]">
            You are about to permanently delete this property and all
            inspections associated with it. This action cannot be undone.
            <br />
            <br />
            To proceed with the deletion, please type <b>DELETE</b> in the field
            below and click <b>Confirm</b>.
          </p>
          <TextInput
            id="delete-text"
            {...deleteForm.getInputProps("deleteText")}
            placeholder="DELETE"
            classNames={{
              input: "!border-[#FDA591] !bg-[#FFEDE9]",
            }}
            className="mt-[16px] w-full max-w-[375px]"
          />
          <ModalActions>
            <Button
              id="confirm-delete-property"
              type="button"
              buttonType="contained"
              onClick={() => {
                deleteForm.validate();
                if (deleteForm.isValid()) {
                  deleteProperty.mutate();
                }
              }}
              disabled={deleteForm.values.deleteText !== "DELETE"}
              label="Confirm"
              buttonColor="#FF613E"
              className="!font-bold hover:!bg-warning-red-dark"
            />
            <Button
              id="cancel-delete-property"
              type="button"
              buttonType="outlined"
              onClick={() => onCloseModal()}
              label="Cancel"
              className="!font-bold"
            />
          </ModalActions>
        </Stepper.Step>
      </Stepper>
    </ModalRoot>
  );
};

export default DeletePropertyModal;
