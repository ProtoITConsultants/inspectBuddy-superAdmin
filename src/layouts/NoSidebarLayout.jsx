import { Outlet, useParams } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import React from "react";
import NoSidebarBackButton from "../components/ui/NoSidebarBackButton";
import useNavbarTitle from "../hooks/useNavbarTitle";
import { EDIT_DETAILS_ICON } from "../assets/icons/EditIcon";
import IconLink from "../components/ui/IconLink";

const NoSidebarLayout = () => {
  const { pageTitle } = useNavbarTitle();
  const { subUserId, templateId, inspectionId } = useParams();

  return (
    <main className="App overflow-x-hidden">
      <section className="fixed top-0 z-[10] flex">
        <Navbar withSidebar={false} />
      </section>
      <React.Fragment>
        <NoSidebarBackButton>
          {pageTitle === "Subuser Detail" ? (
            <IconLink
              href={`${subUserId}/edit-details`}
              icon={
                <EDIT_DETAILS_ICON className="h-[16px] w-[16px] text-[#9EA3AE]" />
              }
              label="Edit Details"
            />
          ) : pageTitle === "Template Details" ? (
            <IconLink
              href={`${templateId}/edit-details`}
              icon={
                <EDIT_DETAILS_ICON className="h-[16px] w-[16px] text-[#9EA3AE]" />
              }
              label="Edit Details"
            />
          ) : pageTitle === "Inspection Details" ? (
            <IconLink
              href={`${inspectionId}/edit-details`}
              icon={
                <EDIT_DETAILS_ICON className="h-[16px] w-[16px] text-[#9EA3AE]" />
              }
              label="Edit Details"
            />
          ) : null}
        </NoSidebarBackButton>
        <div className="w-[calc(100vw-var(--scrollbar-width))] h-full md:p-[32px] p-[20px] md:mt-[164px] mt-[140px] md:min-h-[calc(100dvh-164px)] min-h-[calc(100dvh-140px)]">
          <div className="flex justify-center w-full">
            <Outlet />
          </div>
        </div>
      </React.Fragment>
    </main>
  );
};

export default NoSidebarLayout;
