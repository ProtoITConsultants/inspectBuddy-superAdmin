import companyLogoIcon from "../../assets/icons/company-logo.svg";
import avatarIcon from "../../assets/icons/default-profile.svg";
import { useState } from "react";

const PictureInput = ({
  section,
  title,
  pictureURL,
  showUploadBtn,
  onUploadPersonalAvatar,
  onUploadBusinessLogo,
}) => {
  const [selectedImage, setSelectedImage] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

    if (section === "personalInfo") {
      return onUploadPersonalAvatar(file);
    }

    return onUploadBusinessLogo(file);
  };

  return (
    <div className="space-y-[16px]">
      <h2 className="font-medium text-[16px] text-darkBlue">{title}</h2>
      <div className="flex items-center gap-[24px]">
        <img
          src={
            selectedImage ||
            (section === "personalInfo"
              ? pictureURL || avatarIcon
              : pictureURL || companyLogoIcon)
          }
          alt="avatar-icon"
          className={`w-[100px] h-[100px] ${
            section === "personalInfo" ? "rounded-full" : "rounded-[4px]"
          }`}
        />

        {showUploadBtn && (
          <label
            htmlFor="upload-avatar"
            className="w-[105px] h-[48px] bg-primary rounded-[8px] font-bold text-[16px] text-white flex justify-center items-center hover:bg-darkPrimary hover:cursor-pointer"
          >
            {pictureURL ? "Update" : "Upload"}
            <input
              id="upload-avatar"
              type="file"
              className="hidden"
              onChange={(e) => handleImageChange(e)}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default PictureInput;
