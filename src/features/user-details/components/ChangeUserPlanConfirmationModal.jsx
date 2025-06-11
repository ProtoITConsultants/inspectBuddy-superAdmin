import { ModalActions, ModalRoot } from "../../../components/ui/Modal";
import { Group } from "@mantine/core";
import Button from "../../../components/ui/Button";

const ChangeUserPlanConfirmationModal = ({
  isModalOpen,
  onClose,
  onUpdateAnyway,
  isLoading,
}) => {
  return (
    <ModalRoot
      id="delete-inspection-modal"
      loadingOverlay={isLoading}
      openModal={isModalOpen}
      onClose={() => onClose()}
    >
      <Group className="!flex !flex-col !gap-[12px]">
        <h2 className="font-bold md:text-[24px] text-[20px] text-dark-blue mb-[8px] w-full">
          Confirmation
        </h2>
        <p>
          This user has no payment card added. Changing the plan will not incur
          any charges. Would you like to proceed with the plan change?
        </p>
      </Group>

      <ModalActions>
        <Button
          id="confirm-update-profiles"
          type="button"
          buttonType="contained"
          onClick={onUpdateAnyway}
          label="Update Anyway"
          buttonColor="#FF613E"
          className="!font-bold hover:!bg-warning-red-dark"
        />
        <Button
          id="cancel-delete-inspection"
          type="button"
          buttonType="outlined"
          onClick={() => onClose()}
          label="Cancel"
          className="!font-bold"
        />
      </ModalActions>
    </ModalRoot>
  );
};

export default ChangeUserPlanConfirmationModal;
