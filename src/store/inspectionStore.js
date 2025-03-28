import { create } from "zustand";

export const useInspectionStore = create((set) => ({
  // State to store the Inspection Rooms
  inspectionRooms: [],
  setInspectionRooms: (inspectionRooms) => set({ inspectionRooms }),

  // Selected Template Room Elements
  selectedInspectionRoomElements: [],
  setSelectedInspectionRoomElements: (selectedInspectionRoomElements) =>
    set({ selectedInspectionRoomElements }),
}));
