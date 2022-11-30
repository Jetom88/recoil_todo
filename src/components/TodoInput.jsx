import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { todoSelector } from "../states/todo";
import styles from "../style/todo.module.scss";

const TodoInput = ({ onClick }) => {
  const [form, setForm] = useState({
    title: null,
    content: null,
  });
  const setTodo = useSetRecoilState(todoSelector);

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = () => {
    const { title, content } = form;

    setTodo({ title: title, content: content });

    setForm({
      title: "",
      content: "",
    });
  };

  return (
    <div className={styles.addContent}>
      <div className={styles.title}>
        <h2>Enter todo📝</h2>
        <p onClick={onClick} className={styles.close}>
          ✕
        </p>
      </div>

      <div className={styles.inputContent}>
        <input
          placeholder="title"
          value={form.title}
          name="title"
          onChange={onChange}
          className={styles.input}
          autoComplete="off"
        />

        <input
          placeholder="content"
          value={form.content}
          name="content"
          onChange={onChange}
          className={styles.input}
          autoComplete="off"
        />
      </div>

      <button type="submit" className={styles.submitButton} onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
};

export default TodoInput;
