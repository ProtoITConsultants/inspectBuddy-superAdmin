import debounce from "lodash.debounce";
import { useCallback, useState } from "react";
import searchIcon from "../../assets/icons/search-icon.svg";
import { cn } from "../../utils/cn";

const Searchbar = ({ placeholder, onSearch, className = "" }) => {
  const [searchBarValue, setSearchBarValue] = useState("");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandleSearch = useCallback(
    debounce((query) => onSearch(query), 500),
    []
  );

  return (
    <div
      className={cn(
        `flex w-[305px] h-[40px] py-[8px] px-[16px] bg-[#F3F8FF] rounded-[8px] gap-[8px]`,
        className
      )}
    >
      <img src={searchIcon} alt="search-icon" />
      <input
        type="search"
        id="inspections-search"
        value={searchBarValue}
        onChange={(e) => {
          setSearchBarValue(e.target.value);
          debouncedHandleSearch(e.target.value);
        }}
        placeholder={placeholder ? placeholder : "Search..."}
        className="px-[8px] w-full bg-[#F3F8FF] border-0 focus:outline-none h-[24px] font-medium text-darkBlue md:text-[16px] sm:text-[14px]"
      />
    </div>
  );
};

export default Searchbar;
