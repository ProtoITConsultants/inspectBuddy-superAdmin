import { Group } from "@mantine/core";
import { ModalRoot } from "../../../components/ui/Modal";

const CannotUpdateUserPlanModal = ({ isModalOpen, onClose, reasonMessage }) => {
  return (
    <ModalRoot
      id="delete-inspection-modal"
      loadingOverlay={false}
      openModal={isModalOpen}
      onClose={() => onClose()}
    >
      <Group className="!flex !flex-col !gap-[12px]">
        <h2 className="font-bold md:text-[24px] text-[20px] text-dark-blue mb-[8px] w-full">
          Cannot Update User Profile
        </h2>
        <p className="text-gray-500 text-[14px]">{reasonMessage}</p>
      </Group>
    </ModalRoot>
  );
};

export default CannotUpdateUserPlanModal;
