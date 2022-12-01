import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { URL } from "../constant/url";
import { todoSelector } from "../states/selector";
import styles from "../style/todo.module.scss";

const TodoInput = ({ onClick }) => {
  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const setTodo = useSetRecoilState(todoSelector);

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    const { title, content } = form;

    if (title.length === 0 || content.length === 0) {
      return alert("title || content 입력");
    }

    // 요청
    await fetch(`${URL}/todo/`, {
      method: "POST",
      body: new URLSearchParams({
        title,
        content,
      }),
    });

    // 요청 보내면 id 업데이트
    setTodo();

    setForm({
      title: "",
      content: "",
    });

    onClick();
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
