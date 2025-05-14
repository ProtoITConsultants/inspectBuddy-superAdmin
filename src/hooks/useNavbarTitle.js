import { useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router";

const ROUTES = [
  { path: "/", title: "Dashboard" },
  { path: "/all-users", title: "User Detail" },
  { path: "/add-new-user", title: "New User" },
  { path: "/plan-settings", title: "Plan Settings" },
  { path: "/report-settings", title: "Report Settings" },
  { path: "/restore-requests", title: "Restore Requests" },
  { path: "/user-details/:userId", title: "User's Details" },
  {
    path: "/user-details/:userId/add-new-property",
    title: "Add Property",
  },
  { path: "/user-details/:userId/:section", title: "User's Details" },
  {
    path: "/user-details/:userId/properties/details/:propertyId",
    title: "Property Details",
  },
  {
    path: "/user-details/:userId/properties/details/:propertyId/edit-property",
    title: "Edit Property",
  },
  {
    path: "/user-details/:userId/inspections/details/:inspectionId",
    title: "Inspection Details",
  },
  {
    path: "/user-details/:userId/inspections/details/:inspectionId/edit-details",
    title: "Edit Inspection",
  },

  {
    path: "/user-details/:userId/inspections/details/:inspectionId/edit-details/room/:roomId",
    title: "Edit Room",
  },
  {
    path: "/user-details/:userId/templates/details/:templateId",
    title: "Template Details",
  },
  {
    path: "/user-details/:userId/templates/details/:templateId/edit-details",
    title: "Edit Template",
  },
  {
    path: "/user-details/:userId/templates/details/:templateId/edit-details/room/:roomId",
    title: "Edit Room",
  },
  {
    path: "/user-details/:userId/sub-users/details/:memberId",
    title: "Subuser Detail",
  },
  {
    path: "/user-details/:userId/sub-users/details/:memberId/edit-details",
    title: "Edit Subuser",
  },
];

const useNavbarTitle = () => {
  const location = useLocation();

  const [pageTitle, setPageTitle] = useState("Home");
  const [pagePath, setPagePath] = useState("/");

  useEffect(() => {
    const currentPath = location.pathname;

    // Find the matching route
    const matchingRoute = ROUTES.find((route) =>
      matchPath(route.path, currentPath)
    );

    if (matchingRoute) {
      setPageTitle(matchingRoute.title);
      setPagePath(matchingRoute.path);
    } else {
      setPageTitle("Dashboard");
      setPagePath("/");
    }
  }, [location.pathname]);

  return {
    pageTitle,
    pagePath,
  };
};

export default useNavbarTitle;
