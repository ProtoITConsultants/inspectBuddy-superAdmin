import IconLink from "./../../../../components/ui/IconLink";
import { DOWNLOAD_ICON } from "./../../../../assets/icons/DownloadIcon";

const InspectionLogsCard = ({
  creationDate,
  inspectorName,
  reportName,
  pdfURL,
}) => {
  return (
    <div className="md:hidden border border-[#e4f0ff] shadow-custom flex flex-col gap-[18px] rounded-[8px] p-3">
      <div className="flex gap-8 justify-between">
        <p className="text-[16px] font-semibold text-dark-blue break-all">
          {reportName}
        </p>
        <IconLink
          href={pdfURL}
          icon={<DOWNLOAD_ICON className="h-[16px] w-[16px] text-[#9EA3AE]" />}
          label="Download"
          className="whitespace-nowrap h-fit"
          target="_blank"
        />
      </div>
      <div className="flex gap-8 justify-between">
        <p className="text-[14px] text-tertiary">
          Created on
          <br />
          <span className="font-medium text-dark-blue">{creationDate}</span>
        </p>
        <p className="text-[14px] text-tertiary">
          Created By
          <br />
          <span className="font-medium text-dark-blue">{inspectorName}</span>
        </p>
      </div>
    </div>
  );
};

export default InspectionLogsCard;
