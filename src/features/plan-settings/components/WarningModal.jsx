import Button from "../../../components/ui/Button";
import { ModalRoot } from "./../../../components/ui/Modal";

const WarningModal = ({
  id,
  loadingOverlay,
  isModalOpen,
  onClose,
  onUpdate,
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
          <p className="md:text-[16px] text-[14px] text-dark-blue opacity-80">
            You are about to change the subscription model for your plan.
            <br />
            <br />➤ If you click <strong>&quot;For All Users&quot;</strong>, the
            new subscription model will apply to both existing and new users.
            <br />➤ If you click <strong>&quot;New Users Only&quot;</strong>,
            only new users will see and use the updated subscription model —
            current subscriptions will continue as is.
            <br />
            <br />
            All affected users will be notified about the changes to their
            plans.
          </p>
        </div>
        <div className="flex items-center justify-center md:gap-[24px] gap-[16px]">
          <Button
            id="save-subscription-plan-change"
            label="For All Users"
            buttonType="contained"
            type="button"
            onClick={() => onUpdate(true)}
          />
          <Button
            id="save-subscription-plan-change"
            label="New Users Only"
            buttonType="outlined"
            type="button"
            borderColor="#FF613E"
            onClick={() => onUpdate(false)}
            className="!text-[#FF613E] hover:!text-white hover:!bg-[#FF613E]"
          />
        </div>
      </div>
    </ModalRoot>
  );
};

export default WarningModal;
