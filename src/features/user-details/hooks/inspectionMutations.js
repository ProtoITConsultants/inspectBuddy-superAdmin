import { useMutation } from "@tanstack/react-query";
import { userInspectionsAPIs } from "../api/user-inspections";
import { toast } from "sonner";
import { userTemplatesAPIs } from "./../api/template";

// Save Room Details - Mutation
export const useSaveRoomDetails = () => useMutation({});

// Save Inspection Room as Draft - Mutation
export const useSaveInspectionRoomAsDraft = () => useMutation({});

// Rearrange Room elements - Mutation
export const useRearrangeRoomElements = ({
  inspectionId,
  roomId,
  setRearrangingElements,
  elementIds,
}) =>
  useMutation({
    mutationFn: () => {
      setRearrangingElements(false);

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
export const useCreateNewRoomElement = ({
  inspectionId,
  roomId,
  updatedRoomElements,
}) =>
  useMutation({
    mutationFn: (elementName) =>
      userInspectionsAPIs.createNewRoomElement({
        inspectionId,
        roomId,
        elementName,
      }),

    onSuccess: (data) => {
      updatedRoomElements(data);

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

// // Delete Room Element's Questions - Mutation
export const useDeleteRoomElementQuestions = ({
  id,
  roomId,
  elementId,
  checklistIdArray,
  updatedRoomElements,
  elementCategory,
}) =>
  useMutation({
    mutationFn: () =>
      elementCategory === "inspection"
        ? userInspectionsAPIs.deleteQuestionsFromElement({
            inspectionId: id,
            roomId: roomId,
            elementId: elementId,
            checklistIdArray: checklistIdArray,
          })
        : userTemplatesAPIs.deleteQuestionsFromElement({
            templateId: id,
            roomId: roomId,
            elementId: elementId,
            checklistItemIdArray: checklistIdArray,
          }),
    onSuccess: () => {
      updatedRoomElements();
      toast.success("Success!", {
        description: "Questions deleted successfully.",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error("Error!", {
        description: error.message || "Couldn't delete element.",
        duration: 3000,
      });
    },
  });

// // Add Question to Room Element - Mutation
// export const useAddQuestionToRoomElement = () =>
//   useMutation({
//     mutationFn: (newQuestion) =>
//       userInspectionsAPIs.addQuestionToRoomElementInInspection({
//         inspectionId: inspectionId,
//         roomId: roomId,
//         userId: userId,
//         elementId: addQuestionData.elementId,
//         questions: [newQuestion],
//       }),

//     onSuccess: (data, newQuestion) => {
//       const shouldSaveQuestion = newQuestion.shouldSave;

//       if (shouldSaveQuestion) {
//         setSavedQuestions(data.newSavedQuestions[0]);
//       }

//       const updatedElements = selectedInspectionRoomElements?.map((element) => {
//         if (element._id === addQuestionData.elementId) {
//           return {
//             ...element,
//             checklist: [...element.checklist, ...data.newChecklistItems],
//           };
//         }
//         return element;
//       });

//       setSelectedInspectionRoomElements(updatedElements);
//       toast.success("Success!", {
//         description: "Questions added successfully.",
//         duration: 3000,
//       });
//       setShowAddQuestionModal(false);
//     },
//     onError: (error) => {
//       toast.error("Error!", {
//         description: error.message || "Couldn't create new Question.",
//         duration: 3000,
//       });
//     },
//   });
