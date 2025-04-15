import { ModalRoot } from "../../../../components/ui/Modal";

const AddNewTemplateModal = ({
  isModalOpen = false,
  onCloseModal,
  isCreatingTemplate = false,
  children,
}) => {
  return (
    <ModalRoot
      id="add-template-modal"
      loadingOverlay={isCreatingTemplate}
      openModal={isModalOpen}
      onClose={() => onCloseModal()}
    >
      <h2 className="font-bold md:text-[24px] text-[20px] text-dark-blue">
        New Template
      </h2>
      {children}
    </ModalRoot>
  );
};

export default AddNewTemplateModal;
