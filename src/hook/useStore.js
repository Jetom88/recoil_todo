import create from "zustand";

const useStore = create((set) => ({
  apiData: null,
  addData: (data) => {
    set((state) => ({
      apiData: data,
    }));
  },
}));

export default useStore;
