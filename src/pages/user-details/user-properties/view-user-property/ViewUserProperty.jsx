import { useNavigate, useParams } from "react-router";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userDetailsAPIs } from "../../../../features/user-details/api";
import { toast } from "sonner";
import {
  PropertyDetailsBody,
  PropertyDetailsContainer,
  PropertyDetailsHeader,
  PropertyDetails,
  PropertyDetailsGrid,
  PropertyDetailsItem,
  PropertyInspectionStats,
  RelatedInspectionsTable,
} from "../../../../features/user-details/components/properties/details/PropertyDetails";
import { convertDateFormate } from "../../../../features/user-details/services/convertDateFormate";
import PropertyDetailsSkeleton from "../../../../features/user-details/components/properties/details/PropertyDetailsSkeleton";
import { useEffect, useState } from "react";
import { userPropertiesAPIs } from "./../../../../features/user-details/api/user-properties";

const ViewUserProperty = () => {
  // Hooks
  const { propertyId } = useParams();
  const navigate = useNavigate();

  // Local States

  const [realatedInspectionsData, setRealatedInspectionsData] = useState({
    totalInspections: 0,
    currentPage: 0,
    totalPages: 0,
    relatedInspections: [],
  });

  // Query to fetch user Details
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["propertyDetailsQuery", propertyId],
    queryFn: () =>
      userDetailsAPIs.fetchPropertyDetails({ propertyId: propertyId }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Query to fetch next page of related Inspections
  const fetchRelatedInspection = useMutation({
    mutationFn: () =>
      userPropertiesAPIs.fetchRelatedInspectionsOfProperty({
        propertyId,
        limit: 1,
        page: realatedInspectionsData.currentPage + 1,
      }),
    onSuccess: (data) => {
      setRealatedInspectionsData((previousData) => ({
        ...previousData,
        currentPage: data.currentPage,
        relatedInspections: [
          ...previousData.relatedInspections,
          ...data.inspections,
        ],
      }));
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error!", {
        description: `Couldn't fetch related Inspections.`,
        duration: 3000,
      });
    },
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition === documentHeight) {
        if (
          realatedInspectionsData.relatedInspections.length <
          realatedInspectionsData.totalInspections
        ) {
          console.log("Calling API");
          fetchRelatedInspection.mutate();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchRelatedInspection, realatedInspectionsData]);

  useEffect(() => {
    if (data) {
      return setRealatedInspectionsData({
        totalInspections: data.totalInspections,
        totalPages: Math.ceil(data.totalInspections / 10),
        currentPage: 1,
        relatedInspections: data.relatedInspections,
      });
    }
  }, [data]);

  if (isPending) {
    return <PropertyDetailsSkeleton />;
  }

  if (isError) {
    navigate(-1);
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Property Details.`,
      duration: 3000,
    });
  }

  const propertyDetails = data?.property;

  return (
    <DetailPagesRoot className="max-w-[892px] !h-full">
      <PropertyDetailsContainer>
        <PropertyDetailsHeader propertyImageURL={propertyDetails?.image?.url} />
        <PropertyDetailsBody>
          <PropertyDetails propertyDetails={propertyDetails} />
          <PropertyDetailsGrid>
            <PropertyDetailsItem
              label="Category"
              value={propertyDetails?.category?.value}
            />
            <PropertyDetailsItem
              label="Country"
              value={propertyDetails?.address?.country}
            />
            <PropertyDetailsItem
              label="State/Province"
              value={propertyDetails?.address?.state}
            />
            <PropertyDetailsItem
              label="City/Town"
              value={propertyDetails?.address?.city}
            />
            <PropertyDetailsItem
              label="Added On"
              value={convertDateFormate.localeDate(propertyDetails?.createdAt)}
            />

            <PropertyDetailsItem
              label="Zip/Postal Code"
              value={propertyDetails?.address?.zip}
            />

            <PropertyDetailsItem
              label="Reference ID"
              className={"col-span-2"}
              value={
                propertyDetails.isIDGenerated
                  ? "No Reference ID Added"
                  : propertyDetails?.referenceId
              }
            />
          </PropertyDetailsGrid>
          <PropertyInspectionStats
            totalInspections={data?.totalInspections}
            daysSinceLastInspection={data?.daysSinceLastInspection}
            daysSinceLastCompletedInspection={
              data?.daysSinceLastCompletedInspection
            }
          />
          <RelatedInspectionsTable
            relatedInspections={realatedInspectionsData.relatedInspections}
          />
          {realatedInspectionsData.isPending && <div>Loading...</div>}
        </PropertyDetailsBody>
      </PropertyDetailsContainer>
    </DetailPagesRoot>
  );
};

export default ViewUserProperty;
