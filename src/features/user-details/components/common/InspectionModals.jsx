import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { userDetailsAPIs } from "../../api";
import { toast } from "sonner";
import { ModalRoot } from "../../../../components/ui/Modal";
import Button from "../../../../components/ui/Button";
import { useParams } from "react-router";
import { useTemplateStore } from "../../../../store/templateStore";

const DeleteElement = ({ isModalOpen, onCloseModal, elementData }) => {
  // Hooks
  const { templateId, roomId } = useParams();

  // Global States
  const selectedTemplateRoomElements = useTemplateStore(
    (state) => state.selectedTemplateRoomElements
  );
  const setSelectedTemplateRoomElements = useTemplateStore(
    (state) => state.setSelectedTemplateRoomElements
  );

  // Local States
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteElement = useMutation({
    mutationFn: () => {
      setIsDeleting(true);
      return userDetailsAPIs.deleteElementFromTemplate({
        templateId,
        roomId,
        elementIdArray: [elementData._id],
      });
    },
    onSuccess: () => {
      // Updated Element List
      const updatedElements = selectedTemplateRoomElements.filter(
        (element) => element._id !== elementData._id
      );
      setSelectedTemplateRoomElements(updatedElements);

      onCloseModal();
      setIsDeleting(false);
      toast.success("Success!", {
        description: "Element deleted successfully.",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't delete element.",
        duration: 3000,
      });
      setIsDeleting(false);
    },
  });

  return (
    <ModalRoot
      id="delete-template-roomElement-modal"
      openModal={isModalOpen}
      onClose={() => {
        setIsDeleting(false);
      }}
      loadingOverlay={isDeleting}
    >
      <div className="text-dark-blue flex flex-col sm:gap-[24px] gap-[12px]">
        <h2 className="font-bold text-[24px]">Confirmation</h2>
        <p className="text-[16px] font-medium">
          Please Confirm that you want to delete&nbsp;
          <b>{elementData.name}</b>?
        </p>
      </div>

      <div className="flex items-center justify-center gap-[24px] mt-[32px]">
        <Button
          id="delete-room-btn"
          label="Confirm"
          type="button"
          buttonColor="#FF4D4F"
          className="sm:w-[216px] w-full font-bold !bg-[#FF4D4F] !text-white"
          buttonType="filled"
          onClick={deleteElement.mutate}
        />
        <Button
          id="cancel-delete-room-btn"
          label="Cancel"
          type="button"
          borderColor="#CCE2FF"
          className="sm:w-[216px] w-full font-bold !text-[#2A85FF]"
          buttonType="outlined"
          onClick={onCloseModal}
        />
      </div>
    </ModalRoot>
  );
};

const InspectionModals = {
  DeleteElement,
};

export default InspectionModals;
