import React, { useEffect, useRef, useState } from "react";
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
import InspectionModals from "../../../../features/user-details/components/common/InspectionModals";

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

  const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(false);
  const [questionsToDeleteData, setQuestionsToDeleteData] = useState({});

  // Add Question Data
  const [addQuestionData, setAddQuestionData] = useState({});
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

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
  const saveRoomDetails = useMutation({});

  // Save Inspection Room as Draft - Mutation
  const saveInspectionRoomAsDraft = useMutation({});

  // Rearrange Room elements - Mutation
  const rearrangeRoomElements = useMutation({
    mutationFn: () => {
      setRearrangingElements(false);
      const elementIds = selectedInspectionRoomElements?.map(
        (element) => element._id
      );

      return userInspectionsAPIs.rearrangeRoomElements({
        inspectionId,
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
    mutationFn: (elementName) =>
      userInspectionsAPIs.createNewRoomElement({
        inspectionId,
        roomId,
        elementName,
      }),

    onSuccess: (data) => {
      setSelectedInspectionRoomElements([
        ...selectedInspectionRoomElements,
        data.newElement,
      ]);

      toast.success("Success!", {
        description: "Room Element added successfully.",
        duration: 3000,
      });
    },

    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't create add room element.",
        duration: 3000,
      });
    },
  });

  // Delete Room Element's Questions - Mutation
  const deleteRoomElementQuestions = useMutation({
    mutationFn: () =>
      userInspectionsAPIs.deleteQuestionsFromElement({
        inspectionId: inspectionId,
        roomId: roomId,
        elementId: questionsToDeleteData.elementId,
        checklistIdArray: questionsToDeleteData.selectedQuestionsIds,
      }),
    onSuccess: () => {
      // Updated CheckList Questions
      const updatedChecklist = questionsToDeleteData.elementQuestions.filter(
        (question) => {
          return !questionsToDeleteData.selectedQuestionsIds.includes(
            question._id
          );
        }
      );

      // Updated Template Room Elements
      const updatedTemplateRoomElements = selectedInspectionRoomElements?.map(
        (roomElement) => {
          if (roomElement._id === questionsToDeleteData.elementId) {
            return {
              ...roomElement,
              checklist: updatedChecklist,
            };
          }
          return roomElement;
        }
      );

      setSelectedInspectionRoomElements(updatedTemplateRoomElements);

      // Reset Local States
      setQuestionsToDeleteData({});
      toast.success("Success!", {
        description: "Questions deleted successfully.",
        duration: 3000,
      });

      setShowDeleteQuestionModal(false);
    },
    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't delete element.",
        duration: 3000,
      });
    },
  });

  // Add Question to Room Element - Mutation
  const addQuestionToRoomElement = useMutation({
    mutationFn: (newQuestion) =>
      userInspectionsAPIs.addQuestionToRoomElementInInspection({
        inspectionId: inspectionId,
        roomId: roomId,
        userId: userId,
        elementId: addQuestionData.elementId,
        questions: [newQuestion],
      }),

    onSuccess: (data, newQuestion) => {
      const shouldSaveQuestion = newQuestion.shouldSave;

      if (shouldSaveQuestion) {
        setSavedQuestions(data.newSavedQuestions[0]);
      }

      const updatedElements = selectedInspectionRoomElements?.map((element) => {
        if (element._id === addQuestionData.elementId) {
          return {
            ...element,
            checklist: [...element.checklist, ...data.newChecklistItems],
          };
        }
        return element;
      });

      setSelectedInspectionRoomElements(updatedElements);
      toast.success("Success!", {
        description: "Questions added successfully.",
        duration: 3000,
      });
      setShowAddQuestionModal(false);
    },
    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't create new Question.",
        duration: 3000,
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
  if (isPending) {
    return <RoomDetailsSkeleton />;
  }

  // console.log("Room Elements", selectedInspectionRoomElements);

  // console.log("Data", data);

  return (
    <React.Fragment>
      {showDeleteQuestionModal && (
        <InspectionModals.DeleteQuestion
          isModalOpen={showDeleteQuestionModal}
          onCloseModal={() => {
            setShowDeleteQuestionModal(false);
            setQuestionsToDeleteData({});
          }}
          currentElementId={questionsToDeleteData?.elementId}
          questionsList={questionsToDeleteData?.elementQuestions}
          onConfirmDelete={deleteRoomElementQuestions.mutate}
          onQuestionSelect={(newSelectedQuestionId) => {
            const updatedData = [
              ...(questionsToDeleteData.selectedQuestions || []),
              newSelectedQuestionId,
            ];

            setQuestionsToDeleteData({
              ...questionsToDeleteData,
              selectedQuestionsIds: updatedData,
            });
          }}
          LoadingOverlay={deleteRoomElementQuestions.isPending}
        />
      )}

      {showAddQuestionModal && (
        <InspectionModals.AddQuestion
          isModalOpen={showAddQuestionModal}
          onCloseModal={() => setShowAddQuestionModal(false)}
          currentElementId={addQuestionData?.elementId}
          createNewQuestion={(newQuestion) => {
            addQuestionToRoomElement.mutate(newQuestion);
          }}
          loadingOverlay={addQuestionToRoomElement.isPending}
        />
      )}
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
              handleSaveRearrangedElement={rearrangeRoomElements.mutate}
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
                      onClickDeletQuestions={() => {
                        setQuestionsToDeleteData({
                          elementId: element._id,
                          elementQuestions: element.checklist,
                        });
                        setShowDeleteQuestionModal(true);
                      }}
                      onClickAddNewQuestion={() => {
                        setShowAddQuestionModal(true);
                        setAddQuestionData({
                          elementId: element._id,
                        });
                      }}
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
    </React.Fragment>
  );
};

export default EditUserInspectionRoom;
