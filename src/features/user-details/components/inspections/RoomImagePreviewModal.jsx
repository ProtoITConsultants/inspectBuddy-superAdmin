import { IconChevronRight } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { ADD_ICON } from "../../../../assets/icons/AddIcon";
import { EDIT_DETAILS_ICON } from "./../../../../assets/icons/EditIcon";
import { DELETE_ICON } from "../../../../assets/icons/DynamicIcons";
import { TICK_ICON } from "../../../../assets/icons/TickIcon";
import { CROSS_ICON } from "../../../../assets/icons/CrossIcon";
import { toast } from "sonner";
import { userInspectionsAPIs } from "../../api/user-inspections";
import { LoadingOverlay, Modal } from "@mantine/core";
import { CLOSE_MODAL_ICON } from "../../../../assets/icons/CloseModalIcon";

const RoomImagePreviewModal = ({
  isModalOpen,
  onCloseModal,
  imagesData,
  setImagesData,
  previewImageIndex,
  setPreviewImageIndex,
}) => {
  // Hooks
  const { inspectionId, roomId } = useParams();
  const queryClient = useQueryClient();

  // Create a ref for the input field
  const inputRef = useRef(null);

  // Local States
  const [previewImageModalStates, setPreviewImageModalStates] = useState({
    addingCaption: false,
    editingImage: false,
    captionValue: "",
  });

  // delete room image - Mutation
  const deleteRoomImage = useMutation({
    mutationFn: (imageIndex) => {
      return userInspectionsAPIs.deleteSpecificRoomImageInInspection({
        inspectionId,
        roomId,
        imageId: imagesData[imageIndex]._id,
      });
    },
    onSuccess: (imageIndex) => {
      const updatedRoomImages = imagesData.filter(
        (_, index) => index !== imageIndex
      );

      setImagesData(updatedRoomImages);

      // Invalidate the room Details Query
      queryClient.invalidateQueries({
        queryKey: ["inspectionRoomDetailsQuery", roomId],
      });

      toast.success("Success!", {
        description: "Image deleted successfully.",
        duration: 3000,
        richColors: true,
      });
    },
    onError: () => {
      toast.error("Error!", {
        description: "Couldn't delete image.",
        duration: 3000,
        richColors: true,
      });
    },
  });

  // Update Room Image Caption - Mutation
  const updateRoomImageCaption = useMutation({
    mutationFn: () =>
      userInspectionsAPIs.updateRoomImageCaptionInInspection({
        inspectionId,
        roomId,
        imageId: imagesData[previewImageIndex]._id,
        caption: previewImageModalStates.captionValue,
      }),

    onSuccess: () => {
      // Invalidate the room Details Query
      queryClient.invalidateQueries({
        queryKey: ["inspectionRoomDetailsQuery", roomId],
      });

      toast.success("Success!", {
        description: "Caption updated successfully.",
        duration: 3000,
        richColors: true,
      });

      setPreviewImageModalStates((prev) => ({
        ...prev,
        addingCaption: false,
        editingImage: false,
        captionValue: "",
      }));
    },

    onError: () => {
      toast.error("Error!", {
        description: "Couldn't update caption.",
        duration: 3000,
        richColors: true,
      });
    },
  });

  // Use Effect to make input field focus
  useEffect(() => {
    if (
      previewImageModalStates.addingCaption ||
      previewImageModalStates.editingImage
    ) {
      // Set focus to the input field when adding or editing caption
      inputRef.current?.focus();
    }
  }, [
    previewImageModalStates.addingCaption,
    previewImageModalStates.editingImage,
  ]);

  return (
    <Modal
      id="preview-image-modal"
      opened={isModalOpen}
      overlayProps={{
        backgroundOpacity: 0.3,
        blur: 0.5,
      }}
      centered
      transitionProps={{
        transition: "fade",
        duration: 300,
        timingFunction: "linear",
      }}
      withCloseButton={false}
      padding={0}
    >
      <div
        className={`rounded-[8px] md:w-[70vw] w-[90%] md:h-[80dvh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:flex outline-none`}
      >
        <LoadingOverlay
          visible={
            deleteRoomImage.isPending || updateRoomImageCaption.isPending
          }
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <button
          className="absolute !top-[8px] !right-[8px]"
          onClick={onCloseModal}
        >
          <CLOSE_MODAL_ICON />
        </button>
        <div className="space-y-[32.5px] flex flex-col items-center md:justify-start justify-center h-full flex-1">
          <div className="w-full h-[300px] md:flex-1 rounded-[8px] overflow-hidden object-cover relative">
            <img
              src={imagesData[previewImageIndex]?.url}
              alt="room-img"
              className="object-cover h-full w-full"
            />
            <div className="bg-[rgba(0,0,0,0.6)] px-[40px] py-[8.5px] min-h-[42px] flex items-center absolute bottom-0 w-full">
              <button
                className={`outline-none border-none bg-transparent items-center gap-[4px] w-[127px] ${
                  !previewImageModalStates.addingCaption &&
                  !imagesData[previewImageIndex]?.caption
                    ? "flex"
                    : "hidden"
                }`}
                onClick={() =>
                  setPreviewImageModalStates((prevState) => ({
                    ...prevState,
                    addingCaption: true,
                  }))
                }
              >
                <ADD_ICON className="text-white w-[20px]" />
                <p className={`text-[14px] text-white font-semibold w-full`}>
                  Add Caption
                </p>
              </button>
              <div
                className={`${
                  previewImageModalStates?.editingImage ||
                  previewImageModalStates?.addingCaption
                    ? "hidden"
                    : "flex"
                } items-center justify-between w-full`}
              >
                <span className="text-white !text-[16px] font-normal">
                  {imagesData[previewImageIndex]?.caption}
                </span>

                <div className="flex items-center gap-[10px]">
                  <button
                    className={`${
                      imagesData[previewImageIndex]?.caption
                        ? "block"
                        : "hidden"
                    }`}
                    onClick={() => {
                      setPreviewImageModalStates((prevState) => ({
                        ...prevState,
                        editingImage: true,
                        captionValue: imagesData[previewImageIndex]?.caption,
                      }));
                    }}
                  >
                    <EDIT_DETAILS_ICON className="text-white w-[20px]" />
                  </button>
                  <button
                    onClick={() => {
                      deleteRoomImage.mutate(previewImageIndex);
                      imagesData.length > 1
                        ? setPreviewImageIndex(previewImageIndex - 1)
                        : onCloseModal(false);
                    }}
                  >
                    <DELETE_ICON className="text-white w-[24px]" />
                  </button>
                </div>
              </div>

              <div
                className={`${
                  previewImageModalStates?.editingImage ||
                  previewImageModalStates?.addingCaption
                    ? "block"
                    : "hidden"
                } flex justify-between items-center w-full`}
              >
                <input
                  type="text"
                  value={previewImageModalStates?.captionValue}
                  ref={inputRef}
                  onChange={(e) => {
                    setPreviewImageModalStates((prevState) => ({
                      ...prevState,
                      captionValue: e.target.value,
                    }));
                  }}
                  className="border-1 outline-none border-white w-1/2 bg-transparent text-white text-[14px] font-normal p-[2px_4px] rounded-md"
                  placeholder="Add Caption Here"
                />

                <div className="flex items-center gap-[16px]">
                  <button
                    className="border-none outline-none focus:outline-none"
                    onClick={updateRoomImageCaption.mutate}
                  >
                    <TICK_ICON />
                  </button>
                  <button
                    className="border-none outline-none focus:outline-none"
                    onClick={() => {
                      setPreviewImageModalStates({
                        addingCaption: false,
                        editingImage: false,
                        captionValue: imagesData[previewImageIndex].caption,
                      });
                    }}
                  >
                    <CROSS_ICON />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-[8px]">
            {imagesData?.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`room-${index}`}
                className={`object-cover rounded-[4px] hover:cursor-pointer w-[90px] h-[90px] ${
                  previewImageIndex === index && "border-2 border-primary"
                }`}
                onClick={() => {
                  setPreviewImageModalStates((prevState) => ({
                    ...prevState,
                    editingImage: false,
                  }));
                  setPreviewImageIndex(
                    imagesData?.findIndex((img) => img.url === image.url)
                  );
                }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-[32.5px] md:flex hidden flex-col pr-[8px]">
          <div className="w-[100px] flex items-center justify-end flex-1">
            <button
              onClick={() => {
                setPreviewImageModalStates((prevState) => ({
                  ...prevState,
                  editingImage: false,
                }));

                // Update Preview Image Index
                setPreviewImageIndex(() => {
                  if (previewImageIndex === imagesData.length - 1) {
                    return 0;
                  } else {
                    return previewImageIndex + 1;
                  }
                });
              }}
            >
              <IconChevronRight size={24} color="white" />
            </button>
          </div>
          <div className="h-[90px]"></div>
        </div>
      </div>
    </Modal>
  );
};

export default RoomImagePreviewModal;
