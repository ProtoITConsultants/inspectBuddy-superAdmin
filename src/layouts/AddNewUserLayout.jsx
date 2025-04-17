import Navbar from "../components/Navbar/Navbar";
import React from "react";
import NoSidebarBackButton from "../components/ui/NoSidebarBackButton";

const AddNewUserLayout = ({ children }) => {
  return (
    <main className="App overflow-x-hidden">
      <section className="fixed top-0 z-[10] flex">
        <Navbar withSidebar={false} />
      </section>
      <React.Fragment>
        <NoSidebarBackButton></NoSidebarBackButton>
        <div className="w-[calc(100vw-var(--scrollbar-width))] h-full md:p-[32px] p-[20px] md:mt-[164px] mt-[140px] md:min-h-[calc(100dvh-164px)] min-h-[calc(100dvh-140px)]">
          <div className="flex justify-center w-full">{children}</div>
        </div>
      </React.Fragment>
    </main>
  );
};

export default AddNewUserLayout;
