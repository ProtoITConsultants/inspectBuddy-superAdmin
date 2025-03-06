import { cn } from "../../../utils/cn";

const DetailPagesRoot = ({ children, className }) => {
  return (
    <div
      className={cn(
        "md:h-[calc(100dvh-228px)] h-[calc(100dvh-180px)] overflow-auto w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export default DetailPagesRoot;
