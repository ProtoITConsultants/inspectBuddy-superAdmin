import { create } from "zustand";

export const useUserDetailsStore = create((set) => ({
  // State to store the active Tab on User Details Screen
  activeTab: "User Details",
  setActiveTab: (tab) => set({ activeTab: tab }),

  // State to check if we should show the subUser Option or not
  showSubUserOption: false,
  setShowSubUserOption: (value) => set({ showSubUserOption: value }),
}));
