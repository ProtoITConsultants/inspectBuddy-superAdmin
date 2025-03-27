import { Link, useNavigate, useParams } from "react-router";
import { useInspectionStore } from "../../../../store/inspectionStore";
import { useEffect, useState } from "react";
import { userInspectionsAPIs } from "../../../../features/user-details/api/user-inspections";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { InspectionRoomsSkeleton } from "../../../../features/user-details/components/common/Skeletons";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import EditInspection from "../../../../features/user-details/components/common/EditInspectionDetails";
import Button from "../../../../components/ui/Button";
import { Skeleton } from "@mantine/core";

const EditUserInspection = () => {
  // Hooks
  const { userId, inspectionId } = useParams();
  const navigate = useNavigate();

  // Local States
  const [addingRoom, setAddingRoom] = useState(false);
  const [rearrangingRooms, setRearrangingRooms] = useState(false);

  // Global States
  const inspectionRooms = useInspectionStore((state) => state.inspectionRooms);
  const setInspectionRooms = useInspectionStore(
    (state) => state.setInspectionRooms
  );

  // Query for fetching Room Details
  const { isPending, error, isError, data } = useQuery({
    queryKey: ["inspectionroomsData", inspectionId],
    queryFn: () => userInspectionsAPIs.fetchInspectionDetails({ inspectionId }),
  });

  //  Use Effect to update State
  useEffect(() => {
    if (data) {
      setInspectionRooms(data?.rooms);
    }

    // Cleanup
    return () => {};
  }, [data, setInspectionRooms]);

  // Mutations
  const updateRoomOrder = useMutation({
    mutationFn: () => {
      setRearrangingRooms(false);
      const updatedRoomIds = inspectionRooms.map((room) => room._id);
      return userInspectionsAPIs.rearrangeRoomsInInspection({
        inspectionId: inspectionId,
        roomIds: updatedRoomIds,
      });
    },

    onSuccess: () => {
      toast.success("Success!", {
        description: "Room order updated successfully.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error.message || `Couldn't update Room order.`,
        duration: 3000,
      });
    },
  });

  const createNewRoom = useMutation({
    mutationFn: (newRoomName) =>
      userInspectionsAPIs.addNewRoomInInspection({
        inspectionId: inspectionId,
        roomName: newRoomName,
      }),
    onSuccess: (data) => {
      setInspectionRooms([...inspectionRooms, data]);
      toast.success("Success!", {
        description: "Room added successfully.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error.message || `Couldn't add new Room.`,
        duration: 3000,
      });
    },
  });

  const saveInspectionDraft = useMutation({
    mutationFn: () => {
      setTimeout(() => {
        return true;
      }, 1000);
    },

    onSuccess: () => {
      navigate(`/user-details/${userId}/inspections/details/${inspectionId}`, {
        replace: true,
      });
      toast.success("Success!", {
        description: "Inspection saved successfully.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error.message || `Couldn't save Inspection.`,
        duration: 3000,
      });
    },
  });

  // States of Fetch Inspection Details Query
  if (isPending || updateRoomOrder.isPending || saveInspectionDraft.isPending) {
    return <InspectionRoomsSkeleton />;
  }

  if (isError) {
    navigate(-1);
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Inspection Details.`,
      duration: 3000,
    });
  }

  return (
    <DetailPagesRoot>
      <EditInspection.Root>
        <EditInspection.Header heading="Rooms">
          {rearrangingRooms ? (
            <EditInspection.SaveActionBtn
              onSave={updateRoomOrder.mutate}
              onCancel={() => setRearrangingRooms(false)}
            />
          ) : data?.rooms?.length > 1 ? (
            <EditInspection.RearrangeElementsBtn
              onClick={() => {
                setRearrangingRooms(true);
                setAddingRoom(false);
              }}
            />
          ) : null}
        </EditInspection.Header>
        <EditInspection.EditInspectionBody>
          {inspectionRooms.length < 1 ? (
            <EditInspection.NoRoomsMessage />
          ) : (
            <EditInspection.SortableRoomsList
              rearrangingRooms={rearrangingRooms}
              roomsData={inspectionRooms}
              onDragEnd={(updatedRoomsList) =>
                setInspectionRooms(updatedRoomsList)
              }
            />
          )}

          {createNewRoom.isPending && (
            <Skeleton width="100%" height={48} radius={8} />
          )}

          {addingRoom && (
            <EditInspection.NewRoomCard
              onCancel={() => setAddingRoom(false)}
              onSaveNewItem={(newRoomName) => {
                setAddingRoom(false);
                createNewRoom.mutate(newRoomName);
              }}
            />
          )}
        </EditInspection.EditInspectionBody>
        <EditInspection.AddNewItemBtn
          onClick={() => setAddingRoom(true)}
          title="Add a Room"
          showButton={!addingRoom && !rearrangingRooms}
        />
        <EditInspection.EditActions>
          <Link
            to={`/user-details/${userId}/inspections/finalize-inspection/${inspectionId}`}
            id="continue-to-finalize-inspection"
            className={`px-6 py-3 h-12 rounded-lg flex items-center justify-center sm:w-[216px] w-full font-bold text-white ${
              inspectionRooms.length === 0 ||
              inspectionRooms.some((room) => !room.isCompleted)
                ? "pointer-events-none cursor-not-allowed bg-[#CBCBCB]"
                : "bg-primary"
            }`}
          >
            Continue
          </Link>
          <Button
            id="save-template-draft"
            label="Save as Draft"
            type="button"
            onClick={saveInspectionDraft.mutate}
            borderColor="#FF613E"
            className="sm:w-[216px] w-full font-bold !text-[#FF613E] hover:!text-white hover:!bg-[#FF613E]"
            buttonType="outlined"
            disabled={inspectionRooms.length === 0 || addingRoom}
          />
        </EditInspection.EditActions>
      </EditInspection.Root>
    </DetailPagesRoot>
  );
};

export default EditUserInspection;
