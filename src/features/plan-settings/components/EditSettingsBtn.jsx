import Button from "../../../components/ui/Button";

const EditSettingsBtn = ({ onClick }) => {
  return (
    <div className="lg:w-fit w-full lg:absolute top-[16px] right-[16px] lg:mb-0 mb-[24px] lg:block flex justify-end">
      <Button
        label="Edit Details"
        buttonType="outlined"
        onClick={onClick}
        className="lg:p-[10px_16px] p-[8px_12px] !text-[14px]"
      />
    </div>
  );
};

export default EditSettingsBtn;
