import { useEffect, useState } from "react";
import { cn } from "../../../../../utils/cn";
import RED_CROSS_ICON from "../../../../../assets/icons/RedCrossIcon";
import UPLOAD_ICON from "../../../../../assets/icons/UploadIcon";
import compressImageFile from "../../../../../utils/compressImageFile";

const Root = ({ children, className = "", heading }) => (
  <div className={cn("w-full flex flex-col gap-[24px]", className)}>
    <h1 className="text-dark-blue font-bold text-[24px] capitalize leading-none">
      {heading}
    </h1>
    {children}
  </div>
);

const ImageInput = ({
  imageURL,
  inputLabel,
  onImageUpload,
  onImageRemove,
  error,
}) => {
  const [propertyImage, setPropertyImage] = useState(imageURL || null);
  const [objectURL, setObjectURL] = useState(null);

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);

      const compressedFile = await compressImageFile(file);

      setPropertyImage(url);
      setObjectURL(url);
      onImageUpload(compressedFile);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const inputFile = e.target;

    if (!file) {
      console.log("No file selected");
      return;
    }

    const url = URL.createObjectURL(file);

    const compressedFile = await compressImageFile(file);

    // Reset the input field value so onChange can be triggered again if the same image is uploaded
    inputFile.value = null;

    setPropertyImage(url);
    setObjectURL(url);
    onImageUpload(compressedFile);
  };

  useEffect(() => {
    // Check if imageURL is file then convert it to URL first
    if (imageURL) {
      if (imageURL instanceof Blob) {
        const url = URL.createObjectURL(imageURL);
        setPropertyImage(url);
      } else {
        setPropertyImage(imageURL);
      }
    }

    return () => {
      if (objectURL) {
        URL.revokeObjectURL(objectURL);
      }
    };
  }, [imageURL, objectURL]);

  return (
    <div className="flex flex-col gap-[8px] sm:w-fit w-[calc(100%-8px)]">
      <p className="text-dark-blue text-[16px] font-medium">{inputLabel}</p>
      {propertyImage ? (
        <div className="relative">
          <img
            src={propertyImage}
            alt="Uploaded"
            className="rounded-[8px] sm:w-[460px] sm:h-[218px] w-full h-[218px] object-cover"
          />
          <button
            onClick={() => {
              onImageRemove();
              setPropertyImage(null);
              if (objectURL) {
                URL.revokeObjectURL(objectURL);
                setObjectURL(null);
              }
            }}
            className="absolute -top-[8px] -right-[8px]"
          >
            <RED_CROSS_ICON />
          </button>
        </div>
      ) : (
        <div
          className="sm:py-[85px] sm:px-[130px] bg-[#F3F8FF] rounded-[8px] sm:w-fit w-full sm:h-fit sm:block flex justify-center items-center h-[200px] border-dashed border-[2px] border-[#CCE2FF]"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <input
            id="file-upload-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
          <label
            htmlFor="file-upload-input"
            className="cursor-pointer flex items-center gap-[8px] text-[14px] text-[#1A1D1F] font-medium py-[12px] px-[20px] bg-white border-[2px] border-[#CCE2FF] rounded-[8px] w-fit"
          >
            <UPLOAD_ICON className="text-[#1A1D1F]" />
            Click or drop Image
          </label>
        </div>
      )}

      {error && <p className="text-[12px] text-red-500">{error}</p>}
    </div>
  );
};

const Form = ({ children, onSubmit }) => (
  <form className="flex flex-col gap-[16px]" onSubmit={onSubmit}>
    {children}
  </form>
);

const DoubleColumnGrid = ({ children }) => (
  <div className="grid sm:grid-cols-2 gap-x-[24px] gap-y-[16px]">
    {children}
  </div>
);

const TripleColumnGrid = ({ children }) => (
  <div className="grid md:grid-cols-3 grid-cols-2 gap-x-[24px] gap-y-[16px]">
    {children}
  </div>
);

const ActionButtons = ({ children }) => (
  <div className="flex items-center sm:gap-[24px] gap-[12px] sm:mt-[32px] mt-[28px] justify-center flex-wrap">
    {children}
  </div>
);

const EditPropertyForm = {
  Root,
  ImageInput,
  Form,
  DoubleColumnGrid,
  TripleColumnGrid,
  ActionButtons,
};

export default EditPropertyForm;
