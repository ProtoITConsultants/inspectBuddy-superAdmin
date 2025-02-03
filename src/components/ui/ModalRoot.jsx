import { LoadingOverlay, Modal } from "@mantine/core";
import closeIcon from "../../assets/icons/cancel-icon.svg";

const ModalRoot = ({ id, loadingOverlay, openModal, onClose, children }) => {
  return (
    <Modal
      id={id || "global-modal"}
      opened={openModal}
      onClose={onClose}
      overlayProps={{
        backgroundOpacity: 0.3,
        blur: 0.5,
      }}
      centered
      transitionProps={{
        transition: "fade",
        duration: 600,
        timingFunction: "linear",
      }}
      size="lg"
      radius="md"
      withCloseButton={false}
      padding={0}
    >
      <div className="w-full relative p-[32px_24px]">
        <LoadingOverlay
          visible={loadingOverlay ? loadingOverlay : false}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <button className="absolute !top-[8px] !right-[8px]" onClick={onClose}>
          <img src={closeIcon} alt="close icon" />
        </button>
        {children}
      </div>
    </Modal>
  );
};

export default ModalRoot;
