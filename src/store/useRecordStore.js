import { create } from "zustand";

const initialState = {
  records: [],
};

const useRecordStore = create((set) => ({
  ...initialState,
  addRecord: (newRecord) =>
    set((oldState) => ({ records: [...oldState.records, newRecord] })),
  deleteRecord: (id) =>
    set((oldState) => ({
      records: oldState.records.filter((record) => record.recordId !== id),
    })),
  updateRecord: (id, quantity) =>
    set((oldState) => ({
      records: oldState.records.map((record) => {
        if (record.recordId === id) {
          const newQuantity = parseInt(record.quantity) + parseInt(quantity);
          const newCost = record.product.price * newQuantity;
          return { ...record, quantity: newQuantity, cost: newCost };
        } else {
          return record;
        }
      }),
    })),
  resetRecord: () => set({ records: [] }),
}));

export default useRecordStore;
