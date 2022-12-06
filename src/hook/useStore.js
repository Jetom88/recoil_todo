import create from "zustand";

const useStore = create((set) => ({
  apiData: [],
  setData(data) {
    set(() => ({
      apiData: data,
    }));
  },
}));

export default useStore;
