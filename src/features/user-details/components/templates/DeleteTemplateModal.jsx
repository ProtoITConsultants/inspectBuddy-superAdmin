import Button from "../../../../components/ui/Button";
import {
  ModalActions,
  ModalContent,
  ModalRoot,
} from "../../../../components/ui/Modal";

const DeleteTemplateModal = ({
  isModalOpen,
  onCloseModal,
  isDeletingTemplate,
  onDeleteTemplate,
}) => {
  return (
    <ModalRoot
      id="delete-property-modal"
      loadingOverlay={isDeletingTemplate}
      openModal={isModalOpen}
      onClose={() => onCloseModal()}
    >
      <ModalContent
        heading="Confirmation"
        description="Please Confirm that you want to delete this template?"
      />
      <ModalActions>
        <Button
          id="confirm-delete-template"
          type="button"
          buttonType="contained"
          onClick={onDeleteTemplate}
          label="Confirm"
          buttonColor="#FF613E"
          className="!font-bold hover:!bg-warning-red-dark"
        />
        <Button
          id="cancel-delete-template"
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

export default DeleteTemplateModal;
