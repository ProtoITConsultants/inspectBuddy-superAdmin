import { useState } from "react";
import { ModalRoot } from "../../../../../components/ui/Modal";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { userDetailsAPIs } from "../../../api";
import Button from "../../../../../components/ui/Button";
// import { toast } from "sonner";
// import { useTemplateStore } from "../../../../../store/templateStore";

const DeleteTemplateRoomModal = ({
  isModalOpen,
  onCloseModal,
  roomName,
  // templateId,
  // roomId,
  onDeleteRoom,
  isDeletingRoom,
}) => {
  // hooks
  // const queryClient = useQueryClient();

  // Global States
  // const templateRooms = useTemplateStore((state) => state.templateRooms);
  // const setTemplateRooms = useTemplateStore((state) => state.setTemplateRooms);

  // const deleteRoom = useMutation({
  //   mutationFn: () => {
  //     setIsDeleting(true);
  //     return userDetailsAPIs.deleteRoomFromTemplate({
  //       templateId,
  //       roomIdArray: [roomId],
  //     });
  //   },

  //   onSuccess: () => {
  //     // Invalidate the cache
  //     queryClient.invalidateQueries({
  //       queryKey: ["templateroomsData", templateId],
  //     });

  //     // updated Room List
  //     const updatedRooms = templateRooms.filter((room) => room._id !== roomId);
  //     setTemplateRooms(updatedRooms);

  //     onCloseModal();
  //     setIsDeleting(false);
  //     toast.success("Success!", {
  //       description: "Room deleted successfully.",
  //       duration: 3000,
  //     });
  //   },
  //   onError: (error) => {
  //     toast.error("Error!", {
  //       description: error.message || `Couldn't delete room.`,
  //       duration: 3000,
  //     });
  //     setIsDeleting(false);
  //   },
  // });

  return (
    <ModalRoot
      id="delete-template-room-modal"
      openModal={isModalOpen}
      onClose={() => onCloseModal()}
      loadingOverlay={isDeletingRoom}
    >
      <div className="text-dark-blue flex flex-col sm:gap-[24px] gap-[12px]">
        <h2 className="font-bold text-[24px]">Confirmation</h2>
        <p className="text-[16px] font-medium">
          Please Confirm that you want to delete&nbsp;<b>{roomName}</b>?
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
          onClick={onDeleteRoom}
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

export default DeleteTemplateRoomModal;
