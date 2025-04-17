import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router";
import { toast } from "sonner";
import { ModalActions, ModalRoot } from "../../../../components/ui/Modal";
import Button from "../../../../components/ui/Button";
import { userInspectionsAPIs } from "../../api/user-inspections";

const DeleteInspectionModal = ({
  isModalOpen = false,
  onCloseModal,
  inspectionToDelete = {},
  onSuccess,
}) => {
  // Hooks
  const { userId } = useParams();

  // Delete User Inspection - Mutation
  const deleteUserInspection = useMutation({
    mutationFn: () =>
      userInspectionsAPIs.deleteUserInspection({
        userId,
        inspectionId: inspectionToDelete._id,
      }),
    onSuccess: () => {
      onSuccess();
      toast.success("Success!", {
        description: "Inspection deleted successfully!",
        duration: 3000,
        // richColors: true,
      });
      onCloseModal();
    },
    onError: () => {
      toast.error("Error!", {
        description: "Couldn't delete Inspection.",
        duration: 3000,
        // richColors: true,
      });
    },
  });

  return (
    <ModalRoot
      id="delete-inspection-modal"
      loadingOverlay={deleteUserInspection.isPending}
      openModal={isModalOpen}
      onClose={() => onCloseModal()}
    >
      <h2 className="font-bold md:text-[24px] text-[20px] text-dark-blue mb-[8px]">
        Confirmation
      </h2>
      <p>
        Are you sure you want to delete this <b>Inspection</b>? This action
        cannot be undone.
      </p>
      <ModalActions>
        <Button
          id="confirm-delete-inspection"
          type="button"
          buttonType="contained"
          onClick={deleteUserInspection.mutate}
          label="Confirm"
          buttonColor="#FF613E"
          className="!font-bold hover:!bg-warning-red-dark"
        />
        <Button
          id="cancel-delete-inspection"
          type="button"
          buttonType="outlined"
          onClick={() => onCloseModal()}
          label="Cancel"
          className="!font-bold"
        />
      </ModalActions>
    </ModalRoot>
  );
};

export default DeleteInspectionModal;
