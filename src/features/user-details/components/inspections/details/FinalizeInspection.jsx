import { cn } from "../../../../../utils/cn";

const Root = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col gap-[24px] h-full", className)}>
      {children}
    </div>
  );
};

const Header = ({ heading }) => (
  <h1 className="text-dark-blue font-bold text-[24px] capitalize">{heading}</h1>
);

const ReportSection = ({ children }) => (
  <div className="grid grid-cols-2 gap-4">{children}</div>
);

const SignatureSection = ({ children }) => (
  <div className="grid grid-cols-2 gap-3 mt-[24px]">
    <h2 className="pb-2 font-semibold border-b border-b-[#cce2ff] col-span-2">
      Users for Signature
    </h2>
    {children}
  </div>
);

const CollaboratorsSection = ({ children }) => (
  <div className="flex flex-col col-span-2 gap-2 mt-2">
    <h3 className="font-medium">Collaborators</h3>
    <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">{children}</div>
  </div>
);

const TextField = ({ label, value, className }) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <p className="text-[14px] font-medium text-dark-blue">{label}</p>
    <div className="p-[12px_16px] flex items-center rounded-lg h-[48px] border border-[#cce2ff] text-[14px]">
      {value}
    </div>
  </div>
);
const CollaboratorField = ({ name, role, className }) => (
  <div
    className={cn(
      "p-[12px_16px] flex items-center justify-between gap-2 rounded-lg h-[48px] border border-[#cce2ff] text-[14px]",
      className
    )}
  >
    <p className="text-[14px] font-medium text-dark-blue">{name}</p>
    <p className="text-[14px] text-[#626262]">{role}</p>
  </div>
);

const IconField = ({ label, value, icon, className }) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <p className="text-[14px] font-medium text-dark-blue">{label}</p>
    <div className="p-[12px_16px] flex items-center justify-between gap-2 rounded-lg h-[48px] border border-[#cce2ff]">
      <p className="text-[14px] font-medium text-dark-blue">{value}</p>
      {icon}
    </div>
  </div>
);

const FinalizeInspection = {
  Root,
  Header,
  ReportSection,
  SignatureSection,
  CollaboratorsSection,
  TextField,
  IconField,
  CollaboratorField,
};

export default FinalizeInspection;
