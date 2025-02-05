import { LoadingOverlay, Modal } from "@mantine/core";
import closeIcon from "../../assets/icons/cancel-icon.svg";

/**
 * ModalRoot Component
 *
 * @param {Object} props - The props for the ModalRoot component.
 * @param {string} [props.id] - The ID for the modal.
 * @param {boolean} [props.loadingOverlay=false] - Whether to show a loading overlay inside the modal.
 * @param {boolean} [props.openModal=false] - Controls the visibility of the modal (true = open, false = closed).
 * @param {Function} [props.onClose] - Callback function triggered when the modal is closed.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the modal.
 *
 * @returns {JSX.Element} A modal container component.
 */

export const ModalRoot = ({
  id,
  loadingOverlay,
  openModal,
  onClose,
  children,
}) => {
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
        <div className="flex flex-col gap-[16px]">{children}</div>
      </div>
    </Modal>
  );
};

export const ModalContent = ({ heading, description }) => {
  return (
    <>
      <h2 className="font-bold md:text-[24px] text-[20px] text-dark-blue">
        {heading}
      </h2>
      <p className="text-gray-700">{description}</p>
    </>
  );
};

export const ModalActions = ({ children }) => {
  return (
    <div className="w-full flex items-center justify-center gap-[16px] mt-[16px]">
      {children}
    </div>
  );
};
