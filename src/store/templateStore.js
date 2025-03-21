import { create } from "zustand";

export const useTemplateStore = create((set) => ({
  // State to store the Template Rooms
  templateRooms: [],
  setTemplateRooms: (templateRooms) => set({ templateRooms }),

  // Selected Template Room Elements
  selectedTemplateRoomElements: [],
  setSelectedTemplateRoomElements: (selectedTemplateRoomElements) =>
    set({ selectedTemplateRoomElements }),

  // Saved Questions
  savedQuestions: [],
  setSavedQuestions: (savedQuestions) => set({ savedQuestions }),
}));
