import { useState } from "react";
import {
  ModalActions,
  ModalContent,
  ModalRoot,
} from "../../../components/ui/Modal";
import { useModalStore } from "../../../store/modalsStore";
import Button from "../../../components/ui/Button";

const DeleteUserPopup = () => {
  const [loadingOverlay, setLoadingOverlay] = useState(false);

  // Global States
  const openDeleteUserModal = useModalStore(
    (state) => state.openDeleteUserModal
  );
  const setOpenDeleteUserModal = useModalStore(
    (state) => state.setOpenDeleteUserModal
  );

  if (!openDeleteUserModal) {
    return;
  }

  return (
    <ModalRoot
      id="delete-user-warning-modal"
      loadingOverlay={loadingOverlay}
      openModal={openDeleteUserModal}
      onClose={() => {
        setOpenDeleteUserModal(false);
      }}
    >
      <ModalContent
        heading="Delete User"
        description="Are you sure you want to delete this user? All the properties,
          templates and inspections of this user will also be deleted
          permanently!"
      />
      <ModalActions>
        <Button
          id="confirm-delete-user"
          type="button"
          buttonType="contained"
          onClick={() => {}}
          label="Confirm Delete"
          buttonColor="#FF613E"
          className="!font-bold"
        />
        <Button
          id="cancel-delete-user"
          type="button"
          buttonType="outlined"
          onClick={() => setOpenDeleteUserModal(false)}
          label="Cancel"
          className="!font-bold"
        />
      </ModalActions>
    </ModalRoot>
  );
};

export default DeleteUserPopup;
