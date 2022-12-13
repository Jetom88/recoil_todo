import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { store } from "./states/valtioState";

const App = () => {
  //valtio로 작성된 코드
  const { getTodos, postTodo, todos } = useSnapshot(store);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onClick = () => {
    postTodo(form.title, form.content);
    setForm({
      title: "",
      content: "",
    });
    getTodos();
  };

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.title}</p>
            <br />
            <p>{todo.content}</p>
          </div>
        ))}
      </div>
      <input value={form.title} name="title" onChange={onChange} /> <br />
      <input value={form.content} name="content" onChange={onChange} />
      <button
        type="submit"
        onClick={() => {
          onClick();
        }}
      >
        submit
      </button>
    </>
  );
};

export default App;
