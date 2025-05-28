import React, { useEffect, useRef, useState } from "react";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import { useNavigate, useParams } from "react-router";
import { useForm } from "@mantine/form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userDetailsAPIs } from "../../../../features/user-details/api";
import { toast } from "sonner";
import EditRoomDetails from "../../../../features/user-details/components/common/EditRoomDetails";
import { Skeleton, TextInput } from "@mantine/core";
import AddNewItemButton from "../../../../features/user-details/components/common/AddNewItemButton";
import Button from "../../../../components/ui/Button";
import AddRoomItem from "../../../../features/user-details/components/common/AddRoomItem";
import { useTemplateStore } from "../../../../store/templateStore";
import SortableItemsList from "../../../../features/user-details/components/common/SortableRoomElements";
import { RoomDetailsSkeleton } from "../../../../features/user-details/components/common/Skeletons";
import UpdateElementNameModal from "../../../../features/user-details/components/inspections/details/UpdateElementNameModal";
import { userTemplatesAPIs } from "../../../../features/user-details/api/template";
import LoadingBackdrop from "../../../../components/ui/LoadingBackdrop";

const EditUserTemplateRoom = () => {
  // hooks
  const queryClient = useQueryClient();
  const { templateId, roomId, userId } = useParams();
  const navigate = useNavigate();

  // Global States
  const selectedTemplateRoomElements = useTemplateStore(
    (state) => state.selectedTemplateRoomElements
  );
  const setSelectedTemplateRoomElements = useTemplateStore(
    (state) => state.setSelectedTemplateRoomElements
  );

  const setSavedQuestions = useTemplateStore(
    (state) => state.setSavedQuestions
  );
  // local states
  const [rearrangingElements, setRearrangingElements] = useState(false);
  const [addingElement, setAddingElement] = useState(false);
  const [updateElementNameModalData, setUpdateElementNameModalData] = useState({
    isModalOpen: false,
    elementData: {},
  });

  // Form to store room details
  const form = useForm({
    initialValues: {
      roomName: "",
      roomImageRequired: false,
    },

    validate: {
      roomName: (value) =>
        value.length >= 4 ? null : "Room's Name must be at least 4 characters.",
    },
  });

  // Query to fetch template room details
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["templateRoomDetailsQuery", roomId],
    queryFn: () =>
      userDetailsAPIs.fetchTemplateRoomDetails({ templateId, roomId, userId }),
  });

  // Use Effect to update the Room name in the form
  const formRef = useRef(form);
  useEffect(() => {
    formRef.current.setValues({
      roomName: data?.room?.name || "",
      roomImageRequired: data?.room?.imageRequired,
    });

    setSavedQuestions(data?.questions || []);

    setSelectedTemplateRoomElements(data?.room?.elements || []);
  }, [data, setSelectedTemplateRoomElements, setSavedQuestions]);

  // Rearrange Room Elements - Mutation
  const rearrangeRoomElements = useMutation({
    mutationFn: () => {
      setRearrangingElements(false);
      const elementIds = selectedTemplateRoomElements.map(
        (element) => element._id
      );

      return userDetailsAPIs.rearrangeRoomElementsInTemplate({
        templateId,
        roomId,
        elementIds: elementIds,
      });
    },

    onSuccess: () => {
      toast.success("Success!", {
        description: "Room Elements rearranged successfully.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't rearrange Room Elements.",
        duration: 3000,
      });
    },
  });

  // Create New Room Element - Mutation
  const createNewRoomElement = useMutation({
    mutationFn: (elementName) => {
      setAddingElement(false);
      return userDetailsAPIs.addNewRoomElementInTemplate({
        templateId,
        roomId,
        elementName,
      });
    },

    onSuccess: (data) => {
      // update the room elements
      const updatedRoomElements = [
        ...selectedTemplateRoomElements,
        data.newElement,
      ];

      setSelectedTemplateRoomElements(updatedRoomElements);

      toast.success("Success!", {
        description: "Room Element added successfully.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't add new Room Element.",
        duration: 3000,
      });
    },
  });

  // Save Room Details - Mutation
  const saveRoomDetails = useMutation({
    mutationFn: () => {
      const roomData = {
        _id: roomId,
        name: form.values.roomName,
        imageRequired: form.values.roomImageRequired,
        elements: selectedTemplateRoomElements,
      };

      return userTemplatesAPIs.updateSpecificRoomDetails({
        userId,
        templateId,
        roomData,
      });
    },

    onSuccess: () => {
      toast.success("Success!", {
        description: "Room Template saved successfully.",
      });

      queryClient.invalidateQueries({
        queryKey: ["templateRoomDetailsQuery", roomId],
      });

      navigate(-1);
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't save Room Template.",
      });
    },
  });

  if (isError) {
    navigate(-1);
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Room Details.`,
      duration: 3000,
    });
  }

  if (isPending) {
    return <RoomDetailsSkeleton />;
  }

  return (
    <React.Fragment>
      {saveRoomDetails.isPending && <LoadingBackdrop />}
      <DetailPagesRoot className="!overflow-hidden !h-full">
        <UpdateElementNameModal
          isModalOpen={updateElementNameModalData.isModalOpen}
          onCloseModal={() =>
            setUpdateElementNameModalData({
              isModalOpen: false,
              elementData: {},
            })
          }
          elementData={updateElementNameModalData.elementData}
          type="template"
        />
        <EditRoomDetails.Form formHeading="Room Template">
          <EditRoomDetails.FormSection sectionId="room-details">
            <EditRoomDetails.FormSectionHeader
              sectionHeading="Room Details"
              toolTipLabel="Room Details Tooltip!"
            />
            <EditRoomDetails.FormSectionBody>
              <TextInput
                id="template-room-name"
                label="Room Name"
                placeholder="Room Name"
                {...form.getInputProps("roomName")}
                className="w-full font-medium max-w-[355px]"
              />
              <TextInput
                label="Notes"
                placeholder="Write a note"
                disabled
                className="w-full font-medium"
              />
              <EditRoomDetails.TemplateRoomImageInput
                isChecked={form.values.roomImageRequired || false}
                onChange={() =>
                  form.setFieldValue(
                    "roomImageRequired",
                    !form.values.roomImageRequired
                  )
                }
              />
            </EditRoomDetails.FormSectionBody>
          </EditRoomDetails.FormSection>
          <EditRoomDetails.FormSection sectionId="room-elements">
            <EditRoomDetails.FormSectionHeader
              sectionHeading="Room Elements"
              toolTipLabel="Room Elements Tooltip!"
              hasRearrangeBtn={true}
              rearrangeElements={rearrangingElements}
              onClickRearrange={() => {
                setRearrangingElements(true);
                setAddingElement(false);
              }}
              handleCancelNewElementSave={() => setRearrangingElements(false)}
              handleSaveRearrangedElement={rearrangeRoomElements.mutate}
            />
            <EditRoomDetails.FormSectionBody>
              <SortableItemsList.Root
                items={selectedTemplateRoomElements}
                onRearrangeItems={setSelectedTemplateRoomElements}
              >
                {selectedTemplateRoomElements?.map((element) => (
                  <SortableItemsList.RoomElement
                    key={element._id}
                    id={element._id}
                    element={element}
                    rearrangingElements={rearrangingElements}
                    elementCategory="template"
                    onEditElementName={() =>
                      setUpdateElementNameModalData({
                        isModalOpen: true,
                        elementData: {
                          _id: element._id,
                          name: element.name,
                        },
                      })
                    }
                  >
                    <SortableItemsList.ElementDetail
                      elementId={element._id}
                      elementQuestions={element.checklist}
                      imageRequired={element.imageRequired}
                      makeInputsDisabled={true}
                    />
                  </SortableItemsList.RoomElement>
                ))}
              </SortableItemsList.Root>

              {addingElement && (
                <AddRoomItem
                  onCancel={() => setAddingElement(false)}
                  onSaveNewItem={(elementName) => {
                    setAddingElement(false);
                    createNewRoomElement.mutate(elementName);
                  }}
                  placeholder={"Enter Element Name"}
                />
              )}

              {createNewRoomElement.isPending && (
                <Skeleton width="100%" height={48} radius={8} />
              )}
            </EditRoomDetails.FormSectionBody>
            <AddNewItemButton
              title="Add New Element"
              onClick={() => setAddingElement(true)}
              showButton={!addingElement && !rearrangingElements}
              className="mx-auto"
            />
          </EditRoomDetails.FormSection>
          <Button
            id="save-inspection-template-room"
            label="Save Room"
            type="button"
            onClick={saveRoomDetails.mutate}
            className="sm:w-[216px] w-full font-bold mx-auto"
            buttonType="contained"
            disabled={addingElement || rearrangingElements}
          />
        </EditRoomDetails.Form>
      </DetailPagesRoot>
    </React.Fragment>
  );
};

export default EditUserTemplateRoom;
