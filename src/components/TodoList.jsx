import styles from "../style/todo.module.scss";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoSelector } from "../states/selector";
import { URL } from "../constant/url";
import { useState } from "react";

const TodoList = ({ isShowBtn, isShow }) => {
  const [editText, setEditText] = useState({
    title: "",
    content: "",
  });

  const setTodo = useSetRecoilState(todoSelector);
  const todoList = useRecoilValue(todoSelector);
  const todoListData = todoList?.data;

  const onDelect = async (id) => {
    await fetch(`${URL}/todo/${id}`, {
      method: "DELETE",
    });

    setTodo(id);
  };

  const editTodo = (todo) => {
    if (todo)
      setEditText((state) => ({
        ...state,
        id: todo.id,
        title: todo.title,
        content: todo.content,
      }));
  };

  const onEdit = (e) => {
    const { name, value } = e.target;
    setEditText({
      ...editText,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    const { id, title, content } = editText;

    console.log(title, "title");

    if (title.length === 0 || content.length === 0) {
      return alert("title || content 입력");
    }

    // 요청
    await fetch(`${URL}/todo/${editText.id}`, {
      method: "PUT",
      body: new URLSearchParams({
        id,
        title,
        content,
      }),
    });

    // 요청 보내면 id 업데이트
    setTodo();

    isShow();
  };

  return (
    <>
      {!isShowBtn && (
        <div className={styles.addContent}>
          <div className={styles.title}>
            <h2>Edit todo📝</h2>
            <p onClick={isShow} className={styles.close}>
              ✕
            </p>
          </div>
          <div className={styles.inputContent}>
            <input
              placeholder="title"
              value={editText.title}
              name="title"
              onChange={onEdit}
              className={styles.input}
              autoComplete="off"
            />

            <input
              placeholder="content"
              value={editText.content}
              name="content"
              onChange={onEdit}
              className={styles.input}
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className={styles.submitButton}
            onClick={() => {
              onSubmit(editText.id);
            }}
          >
            Edit
          </button>
        </div>
      )}
      {todoListData.length !== 0 ? (
        <>
          {todoListData.map((todo) => (
            <div
              key={todo.id}
              className={styles.card}
              onClick={() => {
                editTodo(todo);
              }}
            >
              <div className={styles.todoContent}>
                <div className={styles.title}>
                  <p>{todo.title} </p>
                  <div className={styles.menu}>
                    <p
                      onClick={() => {
                        isShow();
                        editTodo(todo.id);
                      }}
                    >
                      edit
                    </p>
                    <p
                      onClick={() => {
                        onDelect(todo.id);
                      }}
                    >
                      ✕
                    </p>
                  </div>
                </div>
                <div className={styles.content}>{todo.content}</div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className={styles.card}>
          <div className={styles.todoContent}>
            <div className={styles.title}>
              <p>할일 업슴 ???</p>
              <div className={styles.menu}>
                <p>✕</p>
              </div>
            </div>

            <div className={styles.content}>
              <p>오늘의 할 일을 적어주세요</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoList;
