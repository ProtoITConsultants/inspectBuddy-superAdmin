import { Link, useNavigate, useParams } from "react-router";
import { EDIT_DETAILS_ICON } from "../../../../../assets/icons/EditIcon";
import Button from "../../../../../components/ui/Button";
import {
  DELETE_ICON,
  GENERATE_REPORT_ICON,
  VIEW_DETAIL_ICON,
} from "../../../../../assets/icons/DynamicIcons";
import styles from "./PropertyDetails.module.css";
import React, { useState } from "react";
import DeletePropertyModal from "../DeletePropertyModal";

export const PropertyDetailsContainer = ({ children }) => {
  return (
    <div className="w-full max-w-[896px] lg:border-[1.5px] border-[#E4F0FF] rounded-[8px] pb-[24px]">
      {children}
    </div>
  );
};

export const PropertyDetailsHeader = ({ propertyImageURL }) => {
  return propertyImageURL ? (
    <img
      src={propertyImageURL}
      alt="property"
      className="w-full md:h-[310px] h-[145px] object-cover object-center rounded-t-[8px]"
    />
  ) : (
    <img
      src="https://storage.googleapis.com/helloinspector_data_storage/frontend-imgs/default-property-image-details-page.svg"
      alt="property"
      className="w-full md:h-[310px] h-[145px] object-cover object-center rounded-t-[8px]"
    />
  );
};

export const PropertyDetailsBody = ({ children }) => {
  return (
    <div className="flex flex-col gap-[24px] lg:mt-[32px] mt-[16px]">
      {children}
    </div>
  );
};

export const PropertyDetails = ({ propertyDetails }) => {
  // Hooks
  const navigate = useNavigate();
  const { userId } = useParams();

  // Local States
  const [openDeletePropertyModal, setOpenDeletePropertyModal] = useState(false);
  return (
    <React.Fragment>
      <DeletePropertyModal
        isModalOpen={openDeletePropertyModal}
        onCloseModal={() => {
          setOpenDeletePropertyModal(false);
        }}
        propertyToDelete={propertyDetails}
        onDeleteSuccess={() => navigate(`/user-details/${userId}/properties`)}
      />
      <div className="md:flex items-center justify-between gap-8 lg:px-[32px]">
        <div className="text-dark-blue">
          <h1 className="lg:text-[32px] md:text-[28px] text-[20px] font-bold">
            {propertyDetails?.address?.unit
              ? propertyDetails?.address?.unit + "-"
              : ""}
            {propertyDetails?.address?.street} {propertyDetails?.name}
          </h1>
          <p className="opacity-50 md:text-[16px] text-[14px]">
            {[
              propertyDetails?.address?.city,
              propertyDetails?.address?.state,
              propertyDetails?.address?.zip,
              propertyDetails?.address?.country,
            ]
              .filter(Boolean)
              .join(", ")}
          </p>
        </div>

        <div className="flex md:gap-[8px] gap-[16px] md:mt-0 mt-[24px]">
          <Link
            to={`edit-property`}
            className="px-[10px] py-[8px] rounded-[8px] border-[1.5px] border-[#cce2ff] flex items-center justify-center gap-[8px] md:w-fit w-full whitespace-nowrap"
          >
            <EDIT_DETAILS_ICON className="text-[#9EA3AE] h-[20px] w-[20px]" />
            <p className="text-dark-blue font-medium text-[14px]">
              Edit Details
            </p>
          </Link>
          <Button
            id="delete-report-btn"
            label="Delete Property"
            buttonType="iconButton"
            icon={<DELETE_ICON className="text-[#FF613E] h-[20px] w-[20px]" />}
            type="button"
            onClick={() => setOpenDeletePropertyModal(true)}
            className="flex items-center !gap-[8px] !p-[8px_10px] border-[1.5px] rounded-[8px] !border-[#FF613E] md:w-fit w-full !text-[#FF613E] !text-[14px] h-fit !font-medium whitespace-nowrap"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export const PropertyDetailsItem = ({ label, value, className }) => {
  return (
    <div className={`flex flex-col gap-[12px] ${className ? className : null}`}>
      <p className="text-[16px] text-dark-blue font-medium opacity-50 leading-none">
        {label}
      </p>
      <p className="text-[16px] text-dark-blue font-bold leading-none">
        {value}
      </p>
    </div>
  );
};

export const PropertyDetailsGrid = ({ children }) => {
  return (
    <div className="lg:mx-[32px] border-[1.5px] border-[#cce2ff] rounded-[8px] grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-x-[16px] gap-y-[24px] lg:p-[24px] md:p-[18px] p-[12px]">
      {children}
    </div>
  );
};

export const InspectionStatsItem = ({ label, value, className }) => {
  return (
    <div className={`flex flex-col gap-[12px] ${className}`}>
      <p className="text-[14px] text-dark-blue font-medium leading-none">
        {label}
      </p>
      <p
        className={`${
          typeof value === "string"
            ? " text-[16px] text-[#6C727F] font-normal"
            : "lg:text-[32px] md:text-[24px] text-[20px] text-dark-blue font-bold"
        }  leading-none`}
      >
        {value}
      </p>
    </div>
  );
};

export const PropertyInspectionStats = ({
  totalInspections,
  daysSinceLastInspection,
  daysSinceLastCompletedInspection,
}) => {
  return (
    <div className="border-y-[1.5px] border-t-[#cce2ff] border-b-[#cce2ff] lg:px-[32px] py-[24px] grid md:grid-cols-9 grid-cols-2 md:gap-[24px] gap-[16px]">
      <InspectionStatsItem
        label="Total Inspections"
        value={totalInspections}
        className={"md:col-span-3 col-span-1"}
      />
      <InspectionStatsItem
        label="Days Since Last Inspection"
        value={daysSinceLastInspection}
        className={"md:col-span-3 col-span-1"}
      />
      <InspectionStatsItem
        label="Days Since Last Completed Inspection"
        value={daysSinceLastCompletedInspection}
        className={"md:col-span-3 col-span-2"}
      />
    </div>
  );
};

const InspectionTableItem = ({
  lastUpdated,
  reportName,
  inspectionStatus,
  inspectionId,
}) => {
  const { userId } = useParams();

  return (
    <div
      className={`${styles.gridParent} gap-[12px] py-[16px] border-b-[1.5px] border-b-[#cce2ff] items-center`}
    >
      <div className="">
        <p className="text-[14px] text-[#6C727F] font-medium leading-none">
          {lastUpdated}
        </p>
      </div>

      <div className="">
        <p className="text-[14px] text-[#6C727F] font-medium leading-none">
          {reportName}
        </p>
      </div>

      <div
        className={` h-[35px] w-fit flex justify-center items-center rounded-[8px] p-[8px] ${
          inspectionStatus === "Completed"
            ? "text-primary bg-[#2a85ff24]"
            : inspectionStatus === "In Progress"
            ? "text-[#5aa63f] bg-[#5aa63f24]"
            : "text-[#EC8247] bg-[#ec824724]"
        }`}
      >
        <p className={`text-[12px] font-medium leading-none`}>
          {inspectionStatus}
        </p>
      </div>

      <div className=" flex items-center justify-end gap-[16px]">
        <Link
          to={`/user-details/${userId}/inspections/details/${inspectionId}`}
          className="rounded-[8px] px-[16px] py-[10px] border-[1.5px] border-[#cce2ff] flex items-center gap-[8px]"
        >
          <VIEW_DETAIL_ICON className="w-[16px] h-[16px]" />
          <p className="text-[14px] text-darkBlue font-medium leading-none">
            View Details
          </p>
        </Link>
        <button
          className={`rounded-[8px] px-[16px] py-[10px] ${
            inspectionStatus !== "Completed"
              ? "bg-[#cbcbcb] text-[#9ea3ae] hover:cursor-not-allowed"
              : "border-[1.5px] border-[#cce2ff] text-darkBlue"
          }  flex items-center gap-[8px]`}
          onClick={() => {}}
          disabled={inspectionStatus !== "Completed"}
        >
          <GENERATE_REPORT_ICON className="w-[16px] h-[16px]" />
          <p className="text-[14px] font-medium leading-none">
            Generate Report
          </p>
        </button>
      </div>
    </div>
  );
};

export const RelatedInspectionsTable = ({ relatedInspections }) => {
  return (
    <div className="flex flex-col gap-[24px] lg:px-[32px]">
      <h2 className="text-[20px] font-bold text-darkBlue">Inspections</h2>
      <div
        className={` ${
          relatedInspections?.length < 1
            ? "hidden"
            : "lg:block flex flex-col gap-[20px]"
        }`}
      >
        <div className="lg:grid hidden grid-cols-11 gap-[24px] pb-[16px] border-b-[1.5px] border-b-[#cce2ff] ">
          <div className="col-span-2">
            <p className="text-[14px] text-darkBlue font-medium leading-none">
              Last Updated
            </p>
          </div>
          <div className="col-span-3">
            <p className="text-[14px] text-darkBlue font-medium leading-none">
              Report Name
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-[14px] text-darkBlue font-medium leading-none">
              Status
            </p>
          </div>

          <div className="col-span-4"></div>
        </div>
        {relatedInspections?.map((inspection) => {
          const formatedDate = new Date(
            inspection.lastUpdated
          ).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });

          return window.innerWidth > 1024 ? (
            <InspectionTableItem
              key={inspection._id}
              inspectionId={inspection._id}
              lastUpdated={formatedDate}
              reportName={inspection.reportName}
              inspectionStatus={inspection.inspectionStatus}
            />
          ) : (
            <ResponsivePropetyInspectionCard
              key={inspection._id}
              inspectionId={inspection._id}
              lastUpdated={formatedDate}
              reportName={inspection.reportName}
              inspectionStatus={inspection.inspectionStatus}
            />
          );
        })}
      </div>

      <p
        className={`${
          relatedInspections?.length > 0
            ? "hidden"
            : "block text-gray-dark text-[14px]"
        }`}
      >
        No Inspections Conducted Yet
      </p>
    </div>
  );
};

const ResponsivePropetyInspectionCard = ({
  inspectionId,
  lastUpdated,
  reportName,
  inspectionStatus,
}) => {
  const { userId } = useParams();
  return (
    <div
      className={`flex flex-col md:py-[16px] py-[8px] md:px-[24px] px-[12px] md:gap-[24px] gap-[12px] rounded-[8px] shadow-sm bg-white border border-[#cce2ff]`}
    >
      <div className="flex justify-between w-full gap-[16px]">
        <h2 className="md:text-[18px] text-[14px] font-semibold text-darkBlue">
          {reportName}
        </h2>
        <div className=" flex items-center justify-end gap-[16px]">
          <Link
            to={`/user-details/${userId}/inspections/details/${inspectionId}`}
            className="rounded-[8px] p-[8px] border-[1.5px] border-[#cce2ff] flex items-center gap-[8px] w-[32px] h-[32px]"
          >
            <VIEW_DETAIL_ICON className="w-[16px] h-[16px]" />
          </Link>
          <button
            onClick={() => {}}
            type="button"
            className="rounded-[8px] p-[8px] border-[1.5px] border-[#cce2ff] flex items-center gap-[8px] w-[32px] h-[32px]"
          >
            <GENERATE_REPORT_ICON className="w-[16px] h-[16px]" />
          </button>
        </div>
      </div>

      <div className="flex justify-between w-full gap-[16px]">
        <div
          className={`md:h-[35px] h-[30px] w-fit flex justify-center items-center rounded-[8px] p-[8px] ${
            inspectionStatus === "Completed"
              ? "text-primary bg-[#2a85ff24]"
              : inspectionStatus === "In Progress"
              ? "text-[#5aa63f] bg-[#5aa63f24]"
              : "text-[#EC8247] bg-[#ec824724]"
          }`}
        >
          <p className={`md:text-[12px] text-[10px] font-medium leading-none`}>
            {inspectionStatus}
          </p>
        </div>
        <p className="md:text-[14px] text-[12px] text-[#6C727F] font-medium leading-none">
          Updated on
          <br />
          {lastUpdated}
        </p>
      </div>
    </div>
  );
};
