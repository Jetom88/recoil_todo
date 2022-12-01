import styles from "../style/todo.module.scss";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoSelector } from "../states/selector";
import { URL } from "../constant/url";

const TodoList = () => {
  const setTodo = useSetRecoilState(todoSelector);
  const todoList = useRecoilValue(todoSelector);
  const todoListData = todoList?.data;

  const todoDelect = async (id) => {
    await fetch(`${URL}/todo/${id}`, {
      method: "DELETE",
    });

    setTodo(id);
  };

  return (
    <>
      {todoListData.length !== 0 ? (
        <>
          {todoListData.map((todo) => (
            <div key={todo.id} className={styles.card}>
              <div className={styles.todoContent}>
                <div className={styles.title}>
                  <p>{todo.title} </p>
                  <div className={styles.menu}>
                    <p
                      onClick={() => {
                        todoDelect(todo.id);
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
