import styles from "../style/todo.module.scss";
import { useRecoilValue } from "recoil";
import { getTodo } from "../states/todo";

const TodoList = () => {
  const todoList = useRecoilValue(getTodo);

  const todoListData = todoList?.data;
  return (
    <>
      {todoListData.map((todo) => (
        <div key={todo.id} className={styles.card}>
          <div className={styles.todoContent}>
            <div className={styles.title}>
              <p>{todo.title} </p>
              <div className={styles.menu}>
                <p className={styles.check}>✓</p>
                <p>✕</p>
              </div>
            </div>
            <div className={styles.content}>{todo.content}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
