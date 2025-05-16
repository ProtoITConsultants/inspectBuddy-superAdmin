import imageCompression from "browser-image-compression";

const compressImageFile = async (file) => {
  // Image Compression Options
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.log("Error in Compression: ", error);
    return file;
  }
};

export default compressImageFile;
