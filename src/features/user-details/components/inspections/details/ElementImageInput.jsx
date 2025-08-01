import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ElementImagePreviewModal from "./ElementImagePreviewModal";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "@mantine/core";
import { DEFAULT_ELEMENT_IMAGE } from "../../../../../assets/icons/DefaultElementImage";
import compressImageFile from "../../../../../utils/compressImageFile";
import { ADD_ICON } from "../../../../../assets/icons/AddIcon";
import { toast } from "sonner";
import { useInspectionStore } from "../../../../../store/inspectionStore";
import RED_CROSS_ICON from "../../../../../assets/icons/RedCrossIcon";
import { userInspectionsAPIs } from "../../../api/user-inspections";

const ElementImageInput = ({ elementId }) => {
  // Hooks
  const { inspectionId, roomId, userId } = useParams();

  const selectedInspectionRoomElements = useInspectionStore(
    (state) => state.selectedInspectionRoomElements
  );
  const setSelectedInspectionRoomElements = useInspectionStore(
    (state) => state.setSelectedInspectionRoomElements
  );

  // Local States
  const [elementImages, setElementImages] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewImageIndex, setPreviewImageIndex] = useState(0);

  // UseEffect To load element images
  useEffect(() => {
    const currentElement = selectedInspectionRoomElements?.find(
      (element) => element?._id === elementId
    );
    setElementImages(currentElement?.image || []);
  }, [selectedInspectionRoomElements, elementId]);

  // Upload Element Image - Mutation
  const uploadImage = useMutation({
    mutationFn: async (e) => {
      const file = e.target.files[0];
      // Compress the image
      const compressedFile = await compressImageFile(file);

      if (!file) {
        throw new Error("No file selected");
      }

      // Upload the image
      const response = await userInspectionsAPIs.addRoomElementImage({
        userId,
        inspectionId,
        roomId,
        elementId,
        images: [compressedFile],
      });

      // Reset the input field value so onChange
      // can be triggered again if the same image is uploaded
      e.target.value = null;

      return response;
    },
    onSuccess: (data) => {
      // setElementImages((prev) => [...prev, ...(data?.newImages || [])]);
      // Update the selected room - global state
      const updatedSelectedRoomElements = selectedInspectionRoomElements.map(
        (element) => {
          if (element._id === elementId) {
            return {
              ...element,
              image: [...element.image, ...(data?.newImages || [])],
            };
          }
          return element;
        }
      );
      setSelectedInspectionRoomElements(updatedSelectedRoomElements);
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't upload the Image",
      });
    },
  });

  // Delete Element Image - Mutation
  const deleteImage = useMutation({
    mutationFn: ({ imageId }) =>
      userInspectionsAPIs.deleteRoomElementImage({
        userId,
        inspectionId,
        roomId,
        elementId,
        imageId,
      }),
    onSuccess: (_, variables) => {
      setShowPreviewModal(false);
      const imageId = variables.imageId;

      // Update the local state
      const updatedImages = elementImages.filter(
        (image) => image._id !== imageId
      );
      //   setElementImages(updatedImages);

      // Update the selected room - global state
      const updatedSelectedRoomElements = selectedInspectionRoomElements.map(
        (element) => {
          if (element._id === elementId) {
            return {
              ...element,
              image: updatedImages,
            };
          }
          return element;
        }
      );
      setSelectedInspectionRoomElements(updatedSelectedRoomElements);

      toast.success("Success!", {
        description: "Image deleted successfully!",
      });
    },
    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't delete the Image",
      });
    },
  });

  return (
    <>
      <ElementImagePreviewModal
        showPreviewModal={showPreviewModal}
        setShowPreviewModal={setShowPreviewModal}
        imagesData={elementImages}
        handleRemoveImage={(imageId) => deleteImage.mutate({ imageId })}
        previewImageIndex={previewImageIndex}
        setPreviewImageIndex={setPreviewImageIndex}
        isDeletingImage={deleteImage.isLoading}
      />
      <div className="flex items-center gap-[10px]">
        {elementImages?.length < 1 ? (
          <DEFAULT_ELEMENT_IMAGE />
        ) : (
          <div className="flex gap-[10px] items-center w-fit">
            {elementImages?.map((image, index) => {
              const isMobile = window.innerWidth < 500;
              const canShowOverlay =
                (isMobile && index === 1 && elementImages.length > 2) ||
                (!isMobile && index === 2 && elementImages.length > 3);

              const showDeleteIcon =
                (isMobile &&
                  (elementImages.length < 3 ? index < 2 : index < 1)) ||
                (!isMobile &&
                  (elementImages.length < 4 ? index < 3 : index < 2));

              return (
                <div
                  key={index}
                  className={`relative group ${
                    !isMobile && index >= 3 ? "hidden" : ""
                  }`}
                >
                  <>
                    {((isMobile && index < 2) || (!isMobile && index < 3)) && (
                      <img
                        src={image.url}
                        alt={`room-${index}`}
                        className={`w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] object-cover rounded-[8px] hover:cursor-pointer`}
                        onClick={() => {
                          setPreviewImageIndex(index);
                          setShowPreviewModal(true);
                        }}
                      />
                    )}
                    {showDeleteIcon && (
                      <button
                        type="button"
                        className={`absolute -top-[8px] -right-[8px] cursor-pointer ${
                          !isMobile &&
                          "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        }`}
                        onClick={() => {
                          deleteImage.mutate({ imageId: image._id });
                        }}
                      >
                        <RED_CROSS_ICON />
                      </button>
                    )}
                  </>
                  {canShowOverlay && (
                    <div
                      className="w-full h-full bg-[rgba(14,8,84,0.4)] absolute rounded-[8px] top-0 left-0 flex justify-center items-center hover:cursor-pointer"
                      onClick={() => {
                        setPreviewImageIndex(index);
                        setShowPreviewModal(true);
                      }}
                    >
                      <span className="text-white font-bold text-[16px]">
                        +{elementImages.length - (isMobile ? 2 : 3)}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        <input
          type="file"
          accept="/image/*"
          hidden
          id={`${elementId}-img`}
          onChange={(e) => uploadImage.mutate(e)}
        />
        {uploadImage.isPending ? (
          <div className="font-medium p-[10px_14px] md:text-[16px] text-[14px] rounded-[8px] flex items-center gap-1 bg-gray-200 text-gray-400 cursor-not-allowed">
            <Loader color="#9ca3af" size="14px" />
            <p
              className={`text-[14px] ${elementImages?.length > 1 && "hidden"}`}
            >
              Uploading...
            </p>
          </div>
        ) : (
          <label
            htmlFor={`${elementId}-img`}
            className={`font-medium p-[10px_14px] md:text-[16px] text-[14px] cursor-pointer rounded-[8px] flex items-center gap-1 bg-primary text-white transition-all duration-300`}
          >
            {elementImages?.length > 0 && (
              <ADD_ICON className="text-white text-[14px]" />
            )}
            <p
              className={`text-[14px] ${elementImages?.length > 1 && "hidden"}`}
            >
              {elementImages?.length > 0 ? "Add More" : "Add an Image"}
            </p>
          </label>
        )}
      </div>
    </>
  );
};

export default ElementImageInput;
