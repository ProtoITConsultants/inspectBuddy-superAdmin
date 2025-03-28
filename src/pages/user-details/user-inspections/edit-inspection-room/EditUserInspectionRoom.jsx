import { useEffect, useRef, useState } from "react";
import { RoomDetailsSkeleton } from "../../../../features/user-details/components/common/Skeletons";
import { useInspectionStore } from "../../../../store/inspectionStore";
import { useTemplateStore } from "../../../../store/templateStore";
import { useNavigate, useParams } from "react-router";
import { useForm } from "@mantine/form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { userInspectionsAPIs } from "./../../../../features/user-details/api/user-inspections";
import DetailPagesRoot from "../../../../features/user-details/components/DetailPagesRoot";
import EditRoomDetails from "../../../../features/user-details/components/common/EditRoomDetails";
import { toast } from "sonner";
import Button from "../../../../components/ui/Button";
import { Skeleton, Text, TextInput } from "@mantine/core";
import AddRoomItem from "../../../../features/user-details/components/common/AddRoomItem";
import AddNewItemButton from "../../../../features/user-details/components/common/AddNewItemButton";
import SortableItemsList from "../../../../features/user-details/components/common/SortableRoomElements";
import {
  useCreateNewRoomElement,
  useRearrangeRoomElements,
} from "../../../../features/user-details/hooks/inspectionMutations";

const EditUserInspectionRoom = () => {
  // hooks
  const { inspectionId, roomId, userId } = useParams();
  const navigate = useNavigate();

  // Global States
  const selectedInspectionRoomElements = useInspectionStore(
    (state) => state.selectedInspectionRoomElements
  );
  const setSelectedInspectionRoomElements = useInspectionStore(
    (state) => state.setSelectedInspectionRoomElements
  );
  const setSavedQuestions = useTemplateStore(
    (state) => state.setSavedQuestions
  );

  // local states
  const [rearrangingElements, setRearrangingElements] = useState(false);
  const [addingElement, setAddingElement] = useState(false);

  const updateRoomOrder = useRearrangeRoomElements({
    inspectionId: inspectionId,
    roomId: roomId,
    elementIds: selectedInspectionRoomElements?.map((element) => element._id),
    setRearrangingElements: setRearrangingElements,
  });

  const createNewRoomElement = useCreateNewRoomElement({
    inspectionId: inspectionId,
    roomId: roomId,
    updatedRoomElements: (data) => {
      setSelectedInspectionRoomElements([
        ...selectedInspectionRoomElements,
        data.newElement,
      ]);
    },
  });

  // Form to store room details
  const form = useForm({
    initialValues: {
      roomName: "",
      roomNote: "",
      roomImages: [],
      roomImageRequired: false,
    },

    validate: {
      roomName: (value) =>
        value.length >= 4 ? null : "Room's Name must be at least 4 characters.",
    },
  });

  // Query to fetch inspection room details
  const { data, isError, error, isPending } = useQuery({
    queryKey: ["inspectionRoomDetailsQuery", roomId],
    queryFn: () =>
      userInspectionsAPIs.fetchSpecificRoomDetails({
        inspectionId,
        roomId,
        userId,
      }),
  });

  // Use Effect to update the States of form
  const formRef = useRef(form);
  useEffect(() => {
    formRef.current.setValues({
      roomName: data?.room?.name || "",
      roomImageRequired: data?.room?.imageRequired,
      roomNote: data?.room?.note || "",
      roomImages: data?.room?.image || [],
    });

    setSavedQuestions(data?.questions || []);

    setSelectedInspectionRoomElements(data?.room?.elements || []);
  }, [data, setSelectedInspectionRoomElements, setSavedQuestions]);

  // Save Room Details - Mutation
  const saveRoomDetails = useMutation({
    mutationFn: () => {
      console.log("Saving Room Details", selectedInspectionRoomElements);
    },
  });

  // Save Inspection Room as Draft - Mutation
  const saveInspectionRoomAsDraft = useMutation({});

  //  Handing error occured in data fetching
  if (isError) {
    navigate(-1);
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Room's Details.`,
      duration: 3000,
    });
  }

  //  Handling Loading State in Data Fetching
  if (isPending) {
    return <RoomDetailsSkeleton />;
  }

  return (
    <DetailPagesRoot className="!overflow-hidden !h-full">
      <EditRoomDetails.Form formHeading="Room Inspection">
        <EditRoomDetails.FormSection sectionId="room-details">
          <EditRoomDetails.FormSectionHeader
            sectionHeading="Room Details"
            toolTipLabel="Room Details Tooltip!"
          />
          <EditRoomDetails.FormSectionBody>
            <TextInput
              id="inspection-room-name"
              label="Room Name"
              placeholder="Room Name"
              {...form.getInputProps("roomName")}
              className="w-full font-medium max-w-[355px]"
            />
            <TextInput
              label="Notes"
              placeholder="Write a note"
              className="w-full font-medium"
              {...form.getInputProps("roomNote")}
            />
            {form.values.roomImageRequired && (
              <Text className="!text-gray-500" size="12px">
                At least one room image is required!
              </Text>
            )}
          </EditRoomDetails.FormSectionBody>
        </EditRoomDetails.FormSection>
        <EditRoomDetails.FormSection sectionId="room-elements">
          <EditRoomDetails.FormSectionHeader
            sectionHeading="Room Elements"
            toolTipLabel="Room Elements Tooltip!"
            hasRearrangeBtn={selectedInspectionRoomElements?.length > 1}
            rearrangeElements={rearrangingElements}
            onClickRearrange={() => {
              setRearrangingElements(true);
              setAddingElement(false);
            }}
            handleCancelNewElementSave={() => setRearrangingElements(false)}
            handleSaveRearrangedElement={updateRoomOrder.mutate}
          />
          <EditRoomDetails.FormSectionBody>
            <SortableItemsList.Root
              items={selectedInspectionRoomElements}
              onRearrangeItems={setSelectedInspectionRoomElements}
            >
              {selectedInspectionRoomElements?.map((element) => (
                <SortableItemsList.RoomElement
                  key={element._id}
                  id={element._id}
                  element={element}
                  rearrangingElements={rearrangingElements}
                  elementCategory="inspection"
                >
                  <SortableItemsList.ElementDetail
                    elementId={element._id}
                    elementQuestions={element.checklist}
                    imageRequired={element.imageRequired}
                    makeInputsDisabled={false}
                    elementCategory="inspection"
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
        <EditRoomDetails.FormActions>
          <Button
            id="save-inspection-template-room"
            label="Save Room"
            type="button"
            onClick={saveRoomDetails.mutate}
            className="sm:w-[216px] w-full font-bold"
            buttonType="contained"
            disabled={addingElement || rearrangingElements}
          />
          <Button
            id="save-template-draft"
            label="Save as Draft"
            type="button"
            onClick={saveInspectionRoomAsDraft.mutate}
            borderColor="#FF613E"
            className="sm:w-[216px] w-full font-bold !text-[#FF613E] hover:!text-white hover:!bg-[#FF613E]"
            buttonType="outlined"
          />
        </EditRoomDetails.FormActions>
      </EditRoomDetails.Form>
    </DetailPagesRoot>
  );
};

export default EditUserInspectionRoom;
