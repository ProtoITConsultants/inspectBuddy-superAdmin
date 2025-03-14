// import loginPagePic from "../assets/images/dashboard-snapshot.svg";
import adminLogo from "../assets/large-logo.svg";

const AuthLayout = ({ children }) => {
  return (
    <main className="h-screen min-[992px]:grid grid-cols-2">
      {/* Left Side Section */}
      <section className="min-[992px]:flex flex-col h-full">
        <div className="sm:h-[100px] h-[75px] border-b-[1.5px] border-light-blue flex items-center px-[32px] py-[16px]">
          <img src={adminLogo} alt="easy-inspector-logo" className="" />
        </div>
        <div className="flex flex-grow justify-center items-center sm:px-0 px-[20px]">
          {children}
        </div>
      </section>
      {/* Right Side Section */}
      <section className="loginPicSection min-h-screen min-[992px]:block hidden">
        <img
          src="https://storage.googleapis.com/helloinspector_data_storage/frontend-imgs/dashboard-snapshot.svg"
          alt="platform Snapshot"
          className="object-cover w-full h-full object-left"
        />
      </section>
    </main>
  );
};

export default AuthLayout;
