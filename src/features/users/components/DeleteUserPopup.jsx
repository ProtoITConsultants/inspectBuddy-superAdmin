import { ModalActions, ModalRoot } from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";

const DeleteUserPopup = ({
  isModalOpen,
  onCloseModal,
  onConfirmDelete,
  isDeletingUser,
  userToDelete,
}) => {
  return (
    <ModalRoot
      id="delete-user-warning-modal"
      loadingOverlay={isDeletingUser}
      openModal={isModalOpen}
      onClose={() => onCloseModal()}
    >
      <h2 className="font-bold md:text-[24px] text-[20px] text-dark-blue">
        Confirmation
      </h2>
      <p className="text-gray-700">
        Are your sure you want to delete <b>{userToDelete?.fullname}</b>? All
        the Inspections, Properties and Templates created by this user will also
        be deleted permanently.
      </p>
      <ModalActions>
        <Button
          id="confirm-delete-user"
          type="button"
          buttonType="contained"
          onClick={onConfirmDelete}
          label="Confirm Delete"
          buttonColor="#FF613E"
          className="!font-bold hover:!bg-warning-red-dark sm:w-[208px] w-full"
        />
        <Button
          id="cancel-delete-user"
          type="button"
          buttonType="outlined"
          onClick={() => onCloseModal()}
          label="Cancel"
          className="!font-bold sm:w-[208px] w-full"
        />
      </ModalActions>
    </ModalRoot>
  );
};

export default DeleteUserPopup;
