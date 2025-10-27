import { create } from "zustand";

export const useUserStore = create((set) => ({
  isLocationEnabled : false,
  userDetails: null,
  token : null,
  coords : null,
  setUserDetails: (value) => set({ userDetails: value }),
  setIsLocationEnabled: (value) => set({ isLocationEnabled: value }),
  setToken: (value) => set({ token: value }),
  setCoords: (value) => set({ coords: value }),
}));

