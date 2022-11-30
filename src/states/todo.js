import { atom, selector } from "recoil";

const URL = `${process.env.REACT_APP_API_URL}`;

export const todoState = atom({
  key: "todoState",
  default: [],
});

export const todoSelector = selector({
  key: "todoSelector",

  get: async () => {
    try {
      const res = await fetch(`${URL}/todo`);
      const data = await res.json();
      return data;
    } catch (err) {
      throw Error("error");
    }
  },
  set: ({ set }, todoData) => {
    fetch(`${URL}/todo`, {
      method: "POST",
      body: new URLSearchParams({
        title: todoData.title,
        content: todoData.content,
      }),
    })
      .then((res) => res.json())
      .then(console.log);
  },
});
