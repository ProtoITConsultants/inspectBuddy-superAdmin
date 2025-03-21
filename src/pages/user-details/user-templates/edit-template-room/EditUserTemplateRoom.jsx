import { useEffect, useRef, useState } from "react";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import { useNavigate, useParams } from "react-router";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userDetailsAPIs } from "../../../../features/user-details/api";
import { toast } from "sonner";
import EditRoomDetails from "../../../../features/user-details/components/common/EditRoomDetails";
import { TextInput } from "@mantine/core";
import AddNewItemButton from "../../../../features/user-details/components/common/AddNewItemButton";
import Button from "../../../../components/ui/Button";
import AddRoomItem from "../../../../features/user-details/components/common/AddRoomItem";
import { useTemplateStore } from "../../../../store/templateStore";
import SortableItemsList from "../../../../features/user-details/components/common/SortableRoomElements";

const EditUserTemplateRoom = () => {
  // hooks
  const { templateId, roomId, userId } = useParams();
  const navigate = useNavigate();

  // Global States
  const setSelectedTemplateRoomElements = useTemplateStore(
    (state) => state.setSelectedTemplateRoomElements
  );

  const setSavedQuestions = useTemplateStore(
    (state) => state.setSavedQuestions
  );
  // local states
  const [rearrangingElements, setRearrangingElements] = useState(false);
  const [addingElement, setAddingElement] = useState(false);

  // Form to store room details
  const form = useForm({
    initialValues: {
      roomName: "",
      roomImageRequired: false,
      roomElements: [],
    },

    validate: {
      roomName: (value) =>
        value.length >= 4
          ? null
          : "Template Name must be at least 4 characters.",
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
      roomElements: data?.room?.elements || [],
    });

    setSavedQuestions(data?.questions || []);

    setSelectedTemplateRoomElements(data?.room?.elements || []);
  }, [data, setSelectedTemplateRoomElements, setSavedQuestions]);

  // Rearrange Room Elements - Mutation
  const rearrangeRoomElements = useMutation({
    mutationFn: () => {
      setRearrangingElements(false);
      const elementIds = form.values.roomElements.map((element) => element._id);

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
        ...form.values.roomElements,
        data.newElement,
      ];

      formRef.current.setValues({
        roomElements: updatedRoomElements,
      });

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
      return console.log("Form Values:", form.values);
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
    return <div>Loading...</div>;
  }

  return (
    <DetailPagesRoot className="!overflow-hidden !h-full">
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
              elementsData={form.values.roomElements}
              setElementsData={(updatedElements) =>
                form.setFieldValue("roomElements", updatedElements)
              }
            >
              {form.values.roomElements.map((element) => (
                <SortableItemsList.RoomElement
                  key={element._id}
                  id={element._id}
                  element={element}
                  rearrangingElements={rearrangingElements}
                >
                  <SortableItemsList.ElementDetail
                    elementId={element._id}
                    elementQuestions={element.checklist}
                    imageRequired={element.imageRequired}
                  />
                </SortableItemsList.RoomElement>
              ))}
            </SortableItemsList.Root>

            {addingElement && (
              <AddRoomItem
                onCancel={() => setAddingElement(false)}
                onSaveNewItem={createNewRoomElement.mutate}
                placeholder={"Enter Element Name"}
              />
            )}
          </EditRoomDetails.FormSectionBody>
          <AddNewItemButton
            title="Add New Element"
            onClick={() => setAddingElement(true)}
            showButton={!addingElement && !rearrangingElements}
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
  );
};

export default EditUserTemplateRoom;
