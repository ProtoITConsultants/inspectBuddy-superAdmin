const UserDetailsFormRoot = ({ children, onFormSubmit }) => (
  <section className="flex-grow border-[1.5px] border-[#CCE2FF] rounded-[8px] bg-white lg:px-[30px] md:px-[24px] px-[16px] lg:py-[40px] py-[24px] md:py-[32] h-fit space-y-[32px] !w-[calc(100vw-278px)]">
    <form onSubmit={onFormSubmit} className="flex flex-col gap-[32px]">
      {children}
    </form>
  </section>
);

const UserDetailFormSection = ({ children, heading }) => (
  <div className="flex flex-col gap-[32px]">
    <h1 className="text-darkBlue font-bold text-[20px]">{heading}</h1>
    <div className="md:px-[30px] flex flex-col gap-[32px]">{children}</div>
  </div>
);

const UserDetailsFormRow = ({ children }) => (
  <div className="md:grid grid-cols-2 gap-x-[24px] md:gap-y-[32px] flex flex-col sm:gap-[24px] gap-[16px]">
    {children}
  </div>
);

const UserDetailsFormAction = ({ children, showButtons }) => (
  <div
    className={`flex gap-[16px] items-center justify-center ${
      showButtons ? "block" : "hidden"
    }`}
  >
    {children}
  </div>
);

const EditUserDetailsForm = {
  UserDetailsFormRoot,
  UserDetailFormSection,
  UserDetailsFormRow,
  UserDetailsFormAction,
};

export default EditUserDetailsForm;
