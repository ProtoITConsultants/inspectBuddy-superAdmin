import { Link, useLocation, useNavigate, useParams } from "react-router";
import { useUserDetailsStore } from "../../../store/userDetailsStore";
import React, { useCallback, useEffect, useMemo } from "react";
import { USER_DETAILS_SIDEBAR } from "../../../constants/sidebarItems";
import { Tooltip } from "@mantine/core";
import { userDetailsAPIs } from "../api";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import LoadingBackdrop from "./../../../components/ui/LoadingBackdrop";

const UserDetailsSidebar = () => {
  // Hooks
  const location = useLocation();
  const navigate = useNavigate();

  // Global States
  const activeTab = useUserDetailsStore((state) => state.activeTab);
  const setActiveTab = useUserDetailsStore((state) => state.setActiveTab);

  const { userId } = useParams();

  // Query To Fetch User Details
  const fetchUserDetails = useCallback(
    () => userDetailsAPIs.fetchUserProfileDetails({ userId }),
    [userId]
  );

  const { data, error, isError, isPending } = useQuery({
    queryKey: ["userProfileDetails", userId],
    queryFn: fetchUserDetails,
    enabled: !!userId, // Ensures query only runs when userId exists
  });

  // Define a mapping of paths to active tab names
  const tabMapping = useMemo(
    () => ({
      "sub-users": "Sub Users",
      properties: "Properties",
      inspections: "Inspections",
      templates: "Templates",
    }),
    []
  );

  // Use Effect to set the Active Tab efficiently
  useEffect(() => {
    const pathname = location.pathname.split("/").pop();
    const newTab = tabMapping[pathname] || "User Details";

    // Only update state if it's different from the current state
    if (activeTab !== newTab) {
      setActiveTab(newTab);
    }
  }, [location.pathname, activeTab, setActiveTab, tabMapping]);

  // Error Toast
  if (isError) {
    navigate(-1);
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch User Details.`,
      duration: 3000,
    });
  }

  return (
    <React.Fragment>
      {isPending && <LoadingBackdrop />}
      <div className="border-[1.5px] border-[#CCE2FF] rounded-[8px] bg-white px-[26.5px] py-[16px] h-fit w-[278px] fixed top-[196px] min-[992px]:flex flex-col gap-[8px] hidden">
        {USER_DETAILS_SIDEBAR.map((page) => {
          const isSubUsersDisabled =
            page.pageTitle === "Sub Users" && data?.role !== "TOPTIER";
          return (
            <Link
              key={page.pageTitle}
              to={
                isSubUsersDisabled
                  ? "#"
                  : page.pageTitle === "User Details"
                  ? `/user-details/${userId}`
                  : `/user-details/${userId}/${page.pagePath}`
              }
              className={`w-full rounded-[4px] h-[40px] text-[16px] flex items-center !px-[16px] ${
                activeTab === page.pageTitle
                  ? "bg-[rgba(135,184,254,0.12)] text-primary hover:text-darkPrimary hover:bg-[rgba(135,184,254,0.30)]"
                  : isSubUsersDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#5A5A5A] hover:bg-gray-100"
              }`}
              onClick={() => {
                if (!isSubUsersDisabled && activeTab !== page.pageTitle) {
                  setActiveTab(page.pageTitle);
                }
              }}
              aria-disabled={isSubUsersDisabled}
            >
              {isSubUsersDisabled ? (
                <Tooltip label="User is not a 'TOPTIER' user.">
                  <p>{page.pageTitle}</p>
                </Tooltip>
              ) : (
                page.pageTitle
              )}
            </Link>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default UserDetailsSidebar;
