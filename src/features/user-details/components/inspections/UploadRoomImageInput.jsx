import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import RoomImagePreviewModal from "./RoomImagePreviewModal";
import { ADD_ICON } from "../../../../assets/icons/AddIcon";
import UPLOAD_ICON from "../../../../assets/icons/UploadIcon";
import Button from "../../../../components/ui/Button";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { userInspectionsAPIs } from "./../../api/user-inspections";
import RED_CROSS_ICON from "../../../../assets/icons/RedCrossIcon";
import LoadingBackdrop from "./../../../../components/ui/LoadingBackdrop";

const UploadRoomImageInput = ({ roomImages }) => {
  // Hooks
  const { inspectionId, roomId } = useParams();
  const queryClient = useQueryClient();

  const [localRoomImages, setLocalRoomImages] = useState([]);
  const [previewImageModalData, setPreviewImageModalData] = useState({
    openModal: false,
    imageIndex: 0,
  });

  // Upload Image - Mutation
  const uploadRoomImage = useMutation({
    mutationFn: async (e) => {
      const imageFile = e.target.files[0];
      const inputFile = e.target;

      // Image Compression Options
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(imageFile, options);

        // Reset the input field value so onChange can be triggered again if the same image is uploaded
        inputFile.value = null;

        return userInspectionsAPIs.uploadSpecificRoomImageInInspection({
          inspectionId,
          roomId,
          image: compressedFile,
        });
      } catch (error) {
        console.log("Error in Compression: ", error);
      }
    },
    onSuccess: (data) => {
      // Update the local state
      const uploadedImage = {
        url: data.newImage.url,
        caption: data.newImage.caption,
        _id: data.newImage._id,
      };

      setLocalRoomImages((prev) => [...prev, uploadedImage]);

      // Invalidate the room Details Query
      queryClient.invalidateQueries({
        queryKey: ["inspectionRoomDetailsQuery", roomId],
      });
      toast.success("Success!", {
        description: "Image uploaded successfully.",
        duration: 3000,
        richColors: true,
      });
    },
    onError: () => {
      toast.error("Error!", {
        description: "Couldn't upload image.",
        duration: 3000,
        richColors: true,
      });
    },
  });

  // Delete Image - Mutation
  const deleteRoomImage = useMutation({
    mutationFn: (imageIndex) => {
      return userInspectionsAPIs.deleteSpecificRoomImageInInspection({
        inspectionId,
        roomId,
        imageId: localRoomImages[imageIndex]._id,
      });
    },
    onSuccess: (imageIndex) => {
      const updatedRoomImages = localRoomImages.filter(
        (_, index) => index !== imageIndex
      );

      setLocalRoomImages(updatedRoomImages);

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

  // Use Memo to avoid unnecessary re-renders and update the local state
  React.useMemo(() => {
    setLocalRoomImages(roomImages);
  }, [roomImages]);

  return (
    <React.Fragment>
      {(uploadRoomImage.isPending || deleteRoomImage.isPending) && (
        <LoadingBackdrop />
      )}
      <RoomImagePreviewModal
        isModalOpen={previewImageModalData.openModal}
        onCloseModal={() =>
          setPreviewImageModalData({ openModal: false, imageIndex: 0 })
        }
        imagesData={localRoomImages}
        setImagesData={setLocalRoomImages}
        handleRemoveImage={deleteRoomImage.mutate}
        previewImageIndex={previewImageModalData.imageIndex}
        setPreviewImageIndex={(index) => {
          setPreviewImageModalData((prev) => ({
            ...prev,
            imageIndex: index,
          }));
        }}
      />
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-dark-blue text-[14px] font-medium">
          Room Images&nbsp;<span className="text-[#808494]">(2/10)</span>
        </h2>
        <div className="rounded-[8px] bg-[#F3F8FF] w-full h-[200px] flex justify-center p-[12px]">
          <div className="relative flex justify-center items-center w-full h-full">
            {localRoomImages.length === 0 ? (
              <label
                htmlFor="room-image-input"
                className="text-darkBlue font-medium text-[14px] bg-white border-2 border-[#CCE2FF] flex items-center justify-center gap-[8px] rounded-[8px] cursor-pointer h-fit px-[20px] py-[12px] z-1 max-h-[45px]"
              >
                <UPLOAD_ICON />
                <span>Click or drop image</span>
              </label>
            ) : (
              <div className="flex gap-[10px] items-center w-full">
                {localRoomImages?.map((image, index) => {
                  const isMobile = window.innerWidth < 500;
                  const showDeleteIcon =
                    (isMobile && index < 2) || (!isMobile && index < 3);
                  const canShowOverlay =
                    (isMobile && index === 1 && localRoomImages.length > 2) ||
                    (!isMobile && index === 2 && localRoomImages.length > 3);

                  return (
                    <div
                      key={index}
                      className={`relative group ${
                        !isMobile && index >= 3 ? "hidden" : ""
                      }`}
                    >
                      <div className="relative">
                        {showDeleteIcon && (
                          <>
                            <img
                              src={image.url}
                              alt={`room-${index}`}
                              className={`sm:w-[192px] w-[129px] sm:h-[176px] h-[101px] object-cover rounded-[8px] hover:cursor-pointer`}
                              onClick={() => {
                                setPreviewImageModalData({
                                  openModal: true,
                                  imageIndex: index,
                                });
                              }}
                            />
                            <Button
                              id="delete-room-image-btn"
                              buttonType="iconButton"
                              icon={<RED_CROSS_ICON className="rounded-full" />}
                              className="absolute -top-[8px] -right-[8px] cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 !border-none !w-fit !p-0 !h-fit"
                              onClick={() => deleteRoomImage.mutate(index)}
                            />
                            <span className="absolute left-[8px] bottom-[8px] text-white font-bold text-[14px] shadow-md">
                              {image.caption}
                            </span>
                          </>
                        )}

                        {canShowOverlay && (
                          <div
                            className="w-full h-full bg-[rgba(14,8,84,0.4)] absolute rounded-[8px] top-0 left-0 flex justify-center items-center hover:cursor-pointer"
                            onClick={() => {
                              setPreviewImageModalData({
                                openModal: true,
                                imageIndex: index,
                              });
                            }}
                          >
                            <span className="text-white font-bold text-[16px]">
                              +{localRoomImages.length - (isMobile ? 2 : 3)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <label
                  htmlFor="room-image-input"
                  className="text-darkBlue font-medium text-[14px] bg-white border-2 border-[#CCE2FF] flex items-center justify-center gap-[8px] rounded-[8px] cursor-pointer h-fit sm:px-[20px] px-[12px] py-[12px] z-1 max-h-[45px]"
                >
                  <ADD_ICON className="text-[#1A1D1F]" />
                  <span className="md:block hidden">Add More</span>
                </label>
              </div>
            )}
            <input
              type="file"
              id="room-image-input"
              accept="image/*"
              className="w-full h-full absolute"
              onChange={uploadRoomImage.mutate}
              hidden
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UploadRoomImageInput;
