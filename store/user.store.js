import { create } from "zustand";

export const useUserStore = create((set) => ({
  isLocationEnabled : false,
  userDetails: null,
  setUserDetails: (value) => set({ userDetails: value }),
  setIsLocationEnabled: (value) => set({ isLocationEnabled: value }),
}));

