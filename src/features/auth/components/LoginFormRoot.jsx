const LoginFormRoot = ({ children }) => {
  return (
    <section className="loginFormSection w-[352px] h-fit py-[32px]">
      <div className="sm:text-start text-center">
        <h1 className="font-bold sm:text-[32px] text-[24px] text-dark-blue">
          Super Admin
        </h1>
        <span className="text-[14px] text-[#808494] font-medium">
          Welcome back! Please enter your details.
        </span>
      </div>
      {children}
    </section>
  );
};

export default LoginFormRoot;
