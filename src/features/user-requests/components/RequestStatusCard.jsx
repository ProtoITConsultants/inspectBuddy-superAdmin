import { getRequestStatusColor } from "../services/getRequestStatusColor";

const RequestStatusCard = ({ status }) => {
  return (
    <div
      className={`p-2 rounded-lg font-semibold ${getRequestStatusColor(
        status
      )}`}
    >
      {status?.charAt(0)?.toUpperCase() + status?.slice(1)?.toLowerCase()}
    </div>
  );
};

export default RequestStatusCard;
