import { create } from "zustand";

export const useAuthStore = create((set) => ({
  // State to store the loading status
  loading: true,
  setLoading: (value) => {
    set({ loading: value });
  },

  // State to store the authentication status
  isAuthenticated: false,
  setIsAuthenticated: (value) => {
    set({ isAuthenticated: value });
  },
  // State to store the user
  user: {},
  setUser: (value) => {
    set({ user: value });
  },
}));
