import {
  ModalActions,
  ModalContent,
  ModalRoot,
} from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

const DeleteUserPopup = ({
  isModalOpen,
  onCloseModal,
  onConfirmDelete,
  loadingOverlay,
  modalContent,
}) => {
  return (
    <ModalRoot
      id="delete-user-warning-modal"
      loadingOverlay={loadingOverlay}
      openModal={isModalOpen}
      onClose={() => onCloseModal()}
    >
      <ModalContent
        heading={modalContent?.modalTitle}
        description={modalContent?.modalDescription}
      />
      <ModalActions>
        <Button
          id="confirm-delete-user"
          type="button"
          buttonType="contained"
          onClick={onConfirmDelete}
          label="Confirm Delete"
          buttonColor="#FF613E"
          className="!font-bold hover:!bg-warning-red-dark"
        />
        <Button
          id="cancel-delete-user"
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

export default DeleteUserPopup;
