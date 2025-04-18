import React, { useEffect, useState } from "react";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import EditInspection from "../../../../features/user-details/components/common/EditInspectionDetails";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userDetailsAPIs } from "../../../../features/user-details/api";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router";
import Button from "./../../../../components/ui/Button";
import { useTemplateStore } from "../../../../store/templateStore";
import { InspectionRoomsSkeleton } from "../../../../features/user-details/components/common/Skeletons";
import DeleteTemplateRoomModal from "../../../../features/user-details/components/templates/confirmration-modals/DeleteTemplateRoomModal";
import { Skeleton } from "@mantine/core";

const EditUserTemplate = () => {
  // Hooks
  const { userId, templateId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Local States
  const [addingRoom, setAddingRoom] = useState(false);
  const [rearrangingRooms, setRearrangingRooms] = useState(false);

  //  Delete Room States
  const [openDeleteRoomModal, setOpenDeleteRoomModal] = useState(false);
  const [roomToBeDelete, setRoomToBeDelete] = useState({});

  // Global States
  const templateRooms = useTemplateStore((state) => state.templateRooms);
  const setTemplateRooms = useTemplateStore((state) => state.setTemplateRooms);

  //  Query for fetching Template Details
  const { isPending, error, isError, data } = useQuery({
    queryKey: ["templateroomsData", templateId],
    queryFn: () =>
      userDetailsAPIs.fetchTemplateDetails({ templateId: templateId }),
  });
  // Update Room List - Side Effects
  useEffect(() => {
    if (data) {
      setTemplateRooms(data?.rooms);
    }

    // Cleanup
    return () => {
      setTemplateRooms([]);
    };
  }, [data, setTemplateRooms]);

  // Update Room Order - Mutation
  const handleUpdateRoomOrder = useMutation({
    mutationFn: () => {
      setRearrangingRooms(false);
      const updatedRoomIds = templateRooms.map((room) => room._id);
      return userDetailsAPIs.updateRoomOrderInTemplate({
        templateId,
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

  // Add New Room - Mutation
  const handleAddNewRoom = useMutation({
    mutationFn: (newRoomName) =>
      userDetailsAPIs.addNewRoomInTemplate({
        templateId: templateId,
        roomName: newRoomName,
      }),
    onSuccess: (data) => {
      setTemplateRooms([...templateRooms, data]);
      setAddingRoom(false);
      toast.success("Success!", {
        description: "Room added successfully.",
        duration: 3000,
      });
    },

    onError: (error) => {
      setAddingRoom(false);
      toast.error("Error!", {
        description: error.message || `Couldn't add new Room.`,
        duration: 3000,
      });
    },
  });

  // Save Inspection Template - Mutation
  const saveInspectionTemplate = useMutation({
    mutationFn: (savingType) => {
      return savingType === "draft"
        ? userDetailsAPIs.saveTemplateAsDraft({ templateId })
        : userDetailsAPIs.saveInspectionTemplateAsCompleted({ templateId });
    },

    onSuccess: () => {
      toast.success("Success!", {
        description: "Template saved successfully.",
        duration: 3000,
      });

      navigate(`/user-details/${userId}/templates`, {
        replace: true,
      });
    },
  });

  // Delete Room - Mutation
  const deleteRoom = useMutation({
    mutationFn: () =>
      userDetailsAPIs.deleteRoomFromTemplate({
        templateId,
        roomIdArray: [roomToBeDelete._id],
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["templateroomsData", templateId],
      });

      const updatedRooms = templateRooms.filter(
        (room) => room._id !== roomToBeDelete._id
      );
      setTemplateRooms(updatedRooms);

      toast.success("Success!", {
        description: "Room deleted successfully.",
        duration: 3000,
      });

      setOpenDeleteRoomModal(false);
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error.message || `Couldn't delete Room.`,
        duration: 3000,
      });
    },
  });

  // Managing Loading State - Fetch Room Details
  if (isPending) {
    return <InspectionRoomsSkeleton />;
  }

  // Managing Error State - Fetch Room Details
  if (isError) {
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Template Details.`,
      duration: 3000,
    });
  }

  return (
    <React.Fragment>
      {openDeleteRoomModal && (
        <DeleteTemplateRoomModal
          isModalOpen={openDeleteRoomModal}
          onCloseModal={() => {
            setOpenDeleteRoomModal(false);
          }}
          roomName={roomToBeDelete?.name}
          onDeleteRoom={deleteRoom.mutate}
          isDeletingRoom={deleteRoom.isPending}
        />
      )}
      <DetailPagesRoot>
        <EditInspection.Root>
          <EditInspection.Header heading="Template Rooms">
            {rearrangingRooms ? (
              <EditInspection.SaveActionBtn
                onSave={handleUpdateRoomOrder.mutate}
                onCancel={() => setRearrangingRooms(false)}
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
                roomsData={templateRooms}
                onDragEnd={(updatedRoomsList) =>
                  setTemplateRooms(updatedRoomsList)
                }
              >
                {templateRooms.map((room) => (
                  <EditInspection.SortableRoomCard
                    key={room?._id}
                    id={room?._id}
                    itemData={room}
                    rearrangingRooms={rearrangingRooms}
                  >
                    <EditInspection.ExistingRoomCard
                      itemData={room}
                      rearrangingRooms={rearrangingRooms}
                      onClickDeleteRoom={() => {
                        setRoomToBeDelete({
                          name: room?.name,
                          _id: room?._id,
                        });
                        setOpenDeleteRoomModal(true);
                      }}
                    />
                  </EditInspection.SortableRoomCard>
                ))}
              </EditInspection.SortableRoomsList>
            )}

            {handleAddNewRoom.isPending && (
              <Skeleton width="100%" height={48} radius={8} />
            )}

            {addingRoom && (
              <EditInspection.NewRoomCard
                onCancel={() => setAddingRoom(false)}
                onSaveNewItem={(newRoomName) => {
                  setAddingRoom(false);
                  handleAddNewRoom.mutate(newRoomName);
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
            <Button
              id="save-inspection-template"
              label="Save Template"
              type="button"
              onClick={() => saveInspectionTemplate.mutate("completed")}
              className="sm:w-[216px] w-full font-bold"
              buttonType="contained"
              disabled={templateRooms.length === 0 || addingRoom}
            />
            <Button
              id="save-template-draft"
              label="Save as Draft"
              type="button"
              onClick={() => saveInspectionTemplate.mutate("draft")}
              borderColor="#FF613E"
              className="sm:w-[216px] w-full font-bold !text-[#FF613E] hover:!text-white hover:!bg-[#FF613E]"
              buttonType="outlined"
              disabled={templateRooms.length === 0 || addingRoom}
            />
          </EditInspection.EditActions>
        </EditInspection.Root>
      </DetailPagesRoot>
    </React.Fragment>
  );
};

export default EditUserTemplate;
