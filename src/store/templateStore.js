import { create } from "zustand";

export const useTemplateStore = create((set) => ({
  // State to store the Template Rooms
  templateRooms: [],
  setTemplateRooms: (templateRooms) => set({ templateRooms }),
}));
