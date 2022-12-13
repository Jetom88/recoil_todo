import { proxy } from "valtio";
import { URL } from "../constant/url";

export const store = proxy({
  todos: [],
  async getTodos() {
    const res = await fetch(`${URL}/todo`).then((res) => res.json());
    store.todos = res.data;
    return true;
  },

  async postTodo(title, content) {
    await fetch(`${URL}/todo`, {
      method: "POST",

      body: new URLSearchParams({
        title,
        content,
      }),
    });
  },
});
