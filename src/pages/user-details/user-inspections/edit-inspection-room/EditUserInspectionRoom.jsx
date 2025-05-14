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
import UploadRoomImageInput from "../../../../features/user-details/components/inspections/UploadRoomImageInput";
import UpdateElementNameModal from "../../../../features/user-details/components/inspections/details/UpdateElementNameModal";

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
  const [updateElementNameModalData, setUpdateElementNameModalData] = useState({
    isModalOpen: false,
    elementData: {},
  });

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
      // At least one room Image is required if roomImageRequired is true
      roomImages: (value) =>
        form.values.roomImageRequired && value.length < 1
          ? "At least one Room Image is Required!"
          : null,
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

  const validateRoomDetails = ({ validationType }) => {
    const isRoomValid = form.validate();
    let reason = "";
    let isRoomElementsValid = true;

    if (isRoomValid.hasErrors) {
      return {
        isValid: false,
        reason: "Please fill all the required fields!",
      };
    }

    if (!isRoomValid.hasErrors && validationType === "complete") {
      for (const element of selectedInspectionRoomElements) {
        if (element.checklist && element.checklist.length > 0) {
          for (const question of element.checklist) {
            if (question?.answerRequired === true && question.answer === "") {
              reason = `${element.name} - is missing an answer!`;
              isRoomElementsValid = false;
              break;
            }
          }
        }
      }
    }

    if (!isRoomElementsValid) {
      return {
        isValid: false,
        reason: reason,
      };
    }

    return {
      isValid: true,
      reason: "",
    };
  };

  // Save Room Details - Mutation
  const saveRoomDetails = useMutation({
    mutationFn: () => {
      const validateRoom = validateRoomDetails({ validationType: "complete" });

      if (!validateRoom.isValid) {
        throw new Error(validateRoom.reason);
      }

      const roomDetails = {
        inspectionId: inspectionId,
        roomId: roomId,
        roomName: form.values.roomName,
        roomNote: form.values.roomNote,
        roomImage: form.values.roomImages,
        roomElements: selectedInspectionRoomElements,
      };

      return userInspectionsAPIs.saveInspectionRoomAsComplete(roomDetails);
    },
    onSuccess: () => {
      toast.success("Success!", {
        description: "Room Details Updated Successfully!",
        duration: 3000,
        richColors: true,
      });
      navigate(-1);
    },
    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't Update Room Details.",
        duration: 3000,
        richColors: true,
      });
    },
  });

  // Save Inspection Room as Draft - Mutation
  const saveInspectionRoomAsDraft = useMutation({
    mutationFn: () => {
      const validateRoom = validateRoomDetails({ validationType: "draft" });

      if (!validateRoom.isValid) {
        throw new Error(validateRoom.reason);
      }
      if (!validateRoom.isValid) {
        throw new Error(validateRoom.reason);
      }

      const roomDetails = {
        inspectionId: inspectionId,
        roomId: roomId,
        roomName: form.values.roomName,
        roomNote: form.values.roomNote,
        roomImage: form.values.roomImages,
        roomElements: selectedInspectionRoomElements,
      };

      return userInspectionsAPIs.saveInspectionRoomAsDraft(roomDetails);
    },

    onSuccess: () => {
      toast.success("Success!", {
        description: "Room Details Saved as Draft!",
        duration: 3000,
        richColors: true,
      });
      navigate(-1);
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't Save Room as Draft.",
        duration: 3000,
        richColors: true,
      });
    },
  });

  //  Handing error occured in data fetching
  if (isError) {
    navigate(-1);
    return toast.error("Error!", {
      description: error.message || `Couldn't fetch Room's Details.`,
      duration: 3000,
    });
  }

  //  Handling Loading State in Data Fetching
  if (
    isPending ||
    saveRoomDetails.isPending ||
    saveInspectionRoomAsDraft.isPending
  ) {
    return <RoomDetailsSkeleton />;
  }

  return (
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
        type="inspection"
      />
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
            <div className="flex flex-col gap-[4px]">
              <UploadRoomImageInput roomImages={form.values.roomImages || []} />
              {form.values.roomImageRequired && (
                <Text className="!text-gray-500" size="12px">
                  At least one room image is required!
                </Text>
              )}
            </div>
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
                    elementImage={element.image}
                    elementNotes={element.note}
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
