import React from "react";
import Navbar from "./../components/Navbar/Navbar";
import useNavbarTitle from "../hooks/useNavbarTitle";
import BackButton from "../components/ui/BackButton";
import UserDetailsSidebar from "../features/user-details/components/UserDetailsSidebar";

const UserDetailsLayout = ({ children }) => {
  const { pageTitle, pagePath } = useNavbarTitle();

  return (
    <main className="App overflow-x-hidden">
      <section className="fixed top-0 z-[10] flex">
        <Navbar withSidebar={false} />
      </section>
      <React.Fragment>
        {pageTitle === "User's Details" && (
          <BackButton
            isUserDetailsScreen={pagePath === "/user-details/:userId"}
          />
        )}
        <div className="w-[calc(100vw-var(--scrollbar-width))] md:p-[32px] p-[20px] flex relative md:mt-[164px] mt-[140px] md:h-[calc(100dvh-164px)] h-[calc(100dvh-140px)]">
          {pageTitle === "User's Details" && (
            <React.Fragment>
              <UserDetailsSidebar />
              <div className="w-[294px] box-border min-[992px]:block hidden"></div>
            </React.Fragment>
          )}
          <div className="flex-1">{children}</div>
        </div>
      </React.Fragment>
    </main>
  );
};

export default UserDetailsLayout;
