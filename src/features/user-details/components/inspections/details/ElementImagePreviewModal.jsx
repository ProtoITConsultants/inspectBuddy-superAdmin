import { IconX, IconChevronRight } from "@tabler/icons-react";
import { Loader, Modal } from "@mantine/core";
import { DELETE_ICON } from "../../../../../assets/icons/DynamicIcons";

const ElementImagePreviewModal = ({
  showPreviewModal,
  setShowPreviewModal,
  imagesData,
  handleRemoveImage,
  previewImageIndex,
  setPreviewImageIndex,
  isDeletingImage,
}) => {
  // Fun to show the next image
  const handleShowNextImage = () => {
    previewImageIndex === imagesData.length - 1
      ? setPreviewImageIndex(0)
      : setPreviewImageIndex(previewImageIndex + 1);
  };

  return (
    <Modal
      id="element-image-preview-modal"
      opened={showPreviewModal}
      onClose={() => setShowPreviewModal(false)}
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
      radius="md"
      withCloseButton={false}
      padding={0}
      size="fit-content"
      classNames={{
        content:
          "!bg-transparent md:!w-[70vw] !w-[90%] md:!h-[80dvh] md:!h-[80dvh] !shadow-none",
      }}
    >
      <div className={`md:flex outline-none`}>
        <div className="md:absolute top-[8px] right-[8px] md:w-fit w-full md:block flex justify-end md:pb-0 pb-[20px]">
          <button
            type="button"
            onClick={() => {
              setShowPreviewModal(false);
            }}
          >
            <IconX size={24} color="white" />
          </button>
        </div>
        <div className="space-y-[32.5px] flex flex-col items-center md:justify-start justify-center h-full flex-1">
          <div className="w-full h-[300px] md:flex-1 rounded-[8px] overflow-hidden object-cover relative">
            <img
              src={imagesData[previewImageIndex]?.url}
              alt="element-image"
              className="object-cover h-full max-h-[574px] w-full"
            />
            <div className="bg-[rgba(0,0,0,0.6)] rounded-lg p-[8px_12px] flex items-center justify-end absolute bottom-2 right-2 w-fit hover:scale-105 transition-all duration-150 hover:bg-primary">
              <button
                type="button"
                onClick={async () => {
                  handleRemoveImage(imagesData[previewImageIndex]?._id);
                  // imagesData.length > 1
                  //   ? setPreviewImageIndex(previewImageIndex - 1)
                  //   : setShowPreviewModal(false);
                }}
                className="flex items-center gap-2"
              >
                {isDeletingImage ? (
                  <Loader color="white" size="14px" />
                ) : (
                  <DELETE_ICON className="text-white" />
                )}
                <p className="text-white font-medium text-[14px]">
                  {isDeletingImage ? "Deleting..." : "Delete"}
                </p>
              </button>
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
              type="button"
              onClick={() => {
                handleShowNextImage();
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

export default ElementImagePreviewModal;
