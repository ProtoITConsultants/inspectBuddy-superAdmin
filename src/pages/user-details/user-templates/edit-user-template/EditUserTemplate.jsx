import { useEffect, useState } from "react";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import EditInspection from "../../../../features/user-details/components/EditInspectionDetails";
import { useQuery } from "@tanstack/react-query";
import { userDetailsAPIs } from "../../../../features/user-details/api";
import { toast } from "sonner";
import { useParams } from "react-router";
import Button from "./../../../../components/ui/Button";

const EditUserTemplate = () => {
  // Hooks
  const { templateId } = useParams();

  // Local States
  const [addingRoom, setAddingRoom] = useState(false);
  const [rearrangingRooms, setRearrangingRooms] = useState(false);
  const [templateRooms, setTemplateRooms] = useState([]);

  const { isPending, error, isError, data } = useQuery({
    queryKey: ["templateroomsData"],
    queryFn: () =>
      userDetailsAPIs.fetchTemplateDetails({ templateId: templateId }),
  });

  // Function to handle Rearrange Rooms
  const resetRoomsData = () => {
    setRearrangingRooms(false);
  };

  const handleUpdateRoomOrder = async () => {
    setRearrangingRooms(false);
  };

  // Functions to handle Add New Room
  const handleAddNewRoom = async (newRoomName) => {
    if (!newRoomName) {
      return toast.error("Error!", {
        description: "Please enter a room name.",
        duration: 3000,
      });
    }
  };

  // Function to handle Save Inspection Template
  const handleSaveInspectionTemplate = async () => {};

  // Function to handle Save Inspection Template as Draft
  const handleSaveInspectionTemplateAsDraft = async () => {};

  useEffect(() => {
    if (data) {
      setTemplateRooms(data);
    }
  }, [data]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Template Details.`,
      duration: 3000,
    });
  }

  return (
    <DetailPagesRoot>
      <EditInspection.Root>
        <EditInspection.Header heading="Template Rooms">
          {rearrangingRooms ? (
            <EditInspection.SaveActionBtn
              onSave={handleUpdateRoomOrder}
              onCancel={resetRoomsData}
            />
          ) : data?.length > 1 ? (
            <EditInspection.RearrangeElementsBtn
              onClick={() => {
                setRearrangingRooms(true);
                setAddingRoom(false);
              }}
            />
          ) : null}
        </EditInspection.Header>
        <EditInspection.EditInspectionBody>
          {templateRooms.length < 1 ? (
            <EditInspection.NoRoomsMessage />
          ) : (
            <EditInspection.SortableRoomsList
              rearrangingRooms={rearrangingRooms}
              roomsData={templateRooms}
              onDragEnd={(updatedRoomsList) =>
                setTemplateRooms(updatedRoomsList)
              }
            />
          )}

          {addingRoom && (
            <EditInspection.NewRoomCard
              onCancel={() => setAddingRoom(false)}
              onSaveNewItem={(newRoomName) => handleAddNewRoom(newRoomName)}
            />
          )}
        </EditInspection.EditInspectionBody>
        <EditInspection.AddNewItemBtn
          onClick={() => setAddingRoom(true)}
          title="Add a Room"
          showButton={!addingRoom && !rearrangingRooms}
        />
        <EditInspection.EditActions>
          <Button
            id="save-inspection-template"
            label="Save Template"
            type="button"
            onClick={handleSaveInspectionTemplate}
            className="sm:w-[216px] w-full font-bold"
            buttonType="contained"
            disabled={templateRooms.length === 0 || addingRoom}
          />
          <Button
            id="save-template-draft"
            label="Save as Draft"
            type="button"
            onClick={handleSaveInspectionTemplateAsDraft}
            borderColor="#FF613E"
            className="sm:w-[216px] w-full font-bold !text-[#FF613E] hover:!text-white hover:!bg-[#FF613E]"
            buttonType="outlined"
            disabled={templateRooms.length === 0 || addingRoom}
          />
        </EditInspection.EditActions>
      </EditInspection.Root>
    </DetailPagesRoot>
  );
};

export default EditUserTemplate;
