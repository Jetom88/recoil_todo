import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { todoSelector, todoState } from "../states/todo";
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
    console.log(">>> form");
    console.log(form);
    setTodo({ title: title, content: content });

    setForm("");
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
          className={styles.input}
          name="title"
          onChange={onChange}
          autoComplete="off"
        />

        <input
          placeholder="content"
          className={styles.input}
          name="content"
          onChange={onChange}
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
