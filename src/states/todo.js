import { atom, selector } from "recoil";

export const todoState = atom({
  key: "todoState",
  default: [],
});

export const getTodo = selector({
  key: "get/todo",
  get: async () => {
    const url = `${process.env.REACT_APP_API_URL}/todo`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (err) {
      throw Error("error");
    }
  },
});
