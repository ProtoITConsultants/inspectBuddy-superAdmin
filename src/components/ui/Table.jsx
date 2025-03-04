import { cn } from "../../utils/cn";
import filledArrowDown from "../../assets/icons/filledArrowDown.svg";
import filledArrowUp from "../../assets/icons/filledArrowUp.svg";
import { Link } from "react-router";
import { NEXT_ICON, PREVIOUS_ICON } from "./../../assets/icons/DynamicIcons";

const Root = ({ children, className }) => {
  return (
    <div
      className={cn(
        "mt-[24px] border-[1.5px] border-[#CCE2FF] rounded-[8px]",
        className
      )}
    >
      {children}
    </div>
  );
};

const Header = ({ children, showAddButton = false }) => {
  return (
    <div
      className={cn(
        "rounded-[8px] grid grid-cols-7 gap-x-[20px] xl:p-[24px] lg:p-[12px] bg-[#F3F8FF] p-[12px]",
        {
          hidden: window.innerWidth < 1150,
        }
      )}
    >
      {children}
      {showAddButton && (
        <div
          className={`${
            window.innerWidth > 1150 ? "col-span-2" : "col-span-7"
          } flex justify-end items-center`}
        >
          <div className="w-full flex justify-end items-end">
            <Link
              href="#"
              className="flex items-center justify-center bg-primary text-white font-bold text-[14px] p-[12px_24px] rounded-[8px]"
            >
              Add New User
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

const HeaderItem = ({ heading }) => {
  return (
    <div className="flex items-center gap-[8px]">
      <h2 className="font-bold text-[16px] text-darkBlue">{heading}</h2>
      <div className="flex flex-col justify-center gap-[4px] h-[8px]">
        <img
          src={filledArrowUp}
          alt="Filled Arrow Up"
          className="hover:cursor-pointer"
          onClick={() => {}}
        />
        <img
          src={filledArrowDown}
          alt="Filled Arrow Down"
          className="hover:cursor-pointer"
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

const SingleColumn = ({ children }) => {
  return (
    <div className="flex items-center gap-[4px] col-span-1">{children}</div>
  );
};

const DoubleColumn = ({ children }) => {
  return (
    <div className="flex items-center gap-[4px] col-span-2">{children}</div>
  );
};

const Body = ({ children, className = "" }) => {
  return (
    <div
      className={cn(
        "flex flex-col md:gap-[24px] gap-[20px] overflow-auto xl:px-[24px] lg:px-[12px] lg:pt-[24px]",
        className
      )}
      id="table-list"
    >
      {children}
    </div>
  );
};

const ItemRoot = ({ children }) => {
  return (
    <div
      className={`border-b-[1.5px] border-[#E4F0FF] pb-[24px] grid grid-cols-7 gap-x-[20px] gap-[10px]`}
    >
      {children}
    </div>
  );
};

const ItemActions = ({ children }) => {
  return (
    <div className="w-full flex items-center justify-end gap-[8px]">
      {children}
    </div>
  );
};

const PaginationButton = ({ onClick, icon, className, disabled }) => {
  return (
    <button
      className={`w-[32px] h-[32px] rounded-full border-[1.5px] flex justify-center items-center ${
        disabled
          ? "hover:cursor-not-allowed border-[#E5E6EB]"
          : "hover:bg-[#cce2ff] border-[#cce2ff]"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};

const Pagination = ({ filtersData, setFiltersData, paginationData }) => {
  return (
    <div
      id="pagination-div"
      className={`flex justify-between items-center pt-[10px]`}
    >
      <p
        className={`text-darkBlue font-medium text-[14px] ${
          paginationData?.totalItems < 1 ? "hidden" : "block"
        }`}
      >
        {(paginationData?.currentPage - 1) * 10 + 1}-
        {paginationData?.currentPage * 10 > paginationData?.totalItems
          ? paginationData?.totalItems
          : paginationData?.currentPage * 10}
        &nbsp;of&nbsp;{paginationData?.totalItems}
      </p>
      <div
        className={`flex items-center space-x-[24px] ${
          paginationData?.totalPages < 2 ? "hidden" : "block"
        }`}
      >
        <p className={`text-darkBlue font-medium text-[14px]`}>
          {paginationData?.currentPage} of {paginationData?.totalPages}
        </p>
        <div className={`flex gap-[16px] items-center`}>
          <PaginationButton
            onClick={() => {
              setFiltersData({ ...filtersData, page: filtersData.page - 1 });
            }}
            icon={<PREVIOUS_ICON />}
            className={``}
            disabled={paginationData?.currentPage === 1}
          />
          <PaginationButton
            onClick={() => {
              setFiltersData({ ...filtersData, page: filtersData.page + 1 });
            }}
            icon={<NEXT_ICON />}
            className={``}
            disabled={
              paginationData?.currentPage === paginationData?.totalPages
            }
          />
        </div>
      </div>
    </div>
  );
};

const Table = {
  Root,
  Header,
  HeaderItem,
  SingleColumn,
  DoubleColumn,
  Body,
  ItemRoot,
  ItemActions,
  Pagination,
};

export default Table;
