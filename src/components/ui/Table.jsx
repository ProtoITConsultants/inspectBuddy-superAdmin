import { cn } from "../../utils/cn";
import filledArrowDown from "../../assets/icons/filledArrowDown.svg";
import filledArrowUp from "../../assets/icons/filledArrowUp.svg";
import { Link } from "react-router";

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

const Header = ({ children }) => {
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

const Table = {
  Root,
  Header,
  HeaderItem,
  SingleColumn,
  DoubleColumn,
};

export default Table;
