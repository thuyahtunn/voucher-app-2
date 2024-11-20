import { create } from "zustand";

const initialState = {
  userStore: {},
};
const useUserDataStore = create((set) => ({
  ...initialState,
  setUserStore: (arg) => set({ userStore: arg }),
}));
export default useUserDataStore;
