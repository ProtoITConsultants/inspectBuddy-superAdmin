import Button from "../../../components/ui/Button";
import { ModalRoot } from "./../../../components/ui/Modal";

const WarningModal = ({
  id,
  loadingOverlay,
  isModalOpen,
  onClose,
  onSaveAnyways,
}) => {
  return (
    <ModalRoot
      id={id}
      modalTitle="Warning!"
      loadingOverlay={loadingOverlay}
      openModal={isModalOpen}
      onClose={onClose}
    >
      <div className="flex flex-col gap-[28px] items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center gap-[8px]">
          <h1 className="text-red-500 font-bold md:text-[24px] text-[20px]">
            Warning!
          </h1>
          <p className="md:text-[16px] text-[14px] text-darkBlue opacity-80">
            Subscriptions will be cancelled for all the users who bought the
            subscription on old prices and will not be renewed automatically, If
            you change the subscription Model. <br />
            Users will also be informed about the subscription plan changes!
          </p>
        </div>
        <div className="flex items-center justify-center md:gap-[24px] gap-[16px]">
          <Button
            id="save-subscription-plan-change"
            label="Save Anyways"
            buttonType="contained"
            type="button"
            onClick={onSaveAnyways}
          />
          <Button
            id="save-subscription-plan-change"
            label="Cancel"
            buttonType="outlined"
            type="button"
            borderColor="#FF613E"
            onClick={onClose}
            className="!text-[#FF613E] hover:!text-white hover:!bg-[#FF613E]"
          />
        </div>
      </div>
    </ModalRoot>
  );
};

export default WarningModal;
