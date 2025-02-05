import { create } from "zustand";

export const useModalStore = create((set) => ({
  // Delete User Modal State
  openDeleteUserModal: false,
  setOpenDeleteUserModal: (value) => set({ openDeleteUserModal: value }),
}));
