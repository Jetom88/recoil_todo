import { selector } from "recoil";
import { URL } from "../constant/url";
import { todoIdState } from "./atoms";

export const todoSelector = selector({
  key: "todoSelector",

  get: async ({ get }) => {
    get(todoIdState); // track
    const res = await fetch(`${URL}/todo`);
    const todos = await res.json();
    return todos;
  },
  set: ({ set }) => {
    set(todoIdState, (id) => id + 1);
  },
});

export const isShowBtn = selector({
  key: "isShowBtn",
  get: ({ get }) => {
    get(Boolean);
  },
});
