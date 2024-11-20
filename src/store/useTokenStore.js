import { create } from "zustand";

const initialState = {
  tokenStore: "",
};

const useTokenStore = create((set) => ({
  ...initialState,
  setTokenStore: (arg) => set({ tokenStore: arg }),
  removeTokenStore: () => set({ tokenStore: "" }),
}));
export default useTokenStore;
