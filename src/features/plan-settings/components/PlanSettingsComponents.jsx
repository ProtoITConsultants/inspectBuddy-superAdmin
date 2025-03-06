const Form = ({ children, onSubmit }) => {
  return (
    <form
      className="flex flex-col md:gap-[32px] sm:gap-[24px] gap-[20px]"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

const FormSection = ({ children, sectionHeading }) => {
  return (
    <div className="flex flex-col md:gap-[20px] gap-[16px]">
      <h2 className="text-dark-blue font-bold text-[20px]">{sectionHeading}</h2>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-[16px]">
        {children}
      </div>
    </div>
  );
};

const InputWrapper = ({ children, className }) => {
  return (
    <div className={`flex flex-col gap-[8px] ${className}`}>{children}</div>
  );
};

const FormActions = ({ children }) => {
  return <div className="flex gap-[16px]">{children}</div>;
};

const Settings = { Form, FormSection, InputWrapper, FormActions };

export default Settings;
