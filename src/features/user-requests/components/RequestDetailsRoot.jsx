import { cn } from "../../../utils/cn";

const RequestDetailsRoot = ({ children, className }) => {
  return (
    <div
      className={cn(
        "md:h-[calc(100dvh-228px)] h-[calc(100dvh-180px)] overflow-auto w-full max-w-[1220px] mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export default RequestDetailsRoot;
