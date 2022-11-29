import { useRecoilState } from "recoil";
import { todoState } from "../states/todo";
import styles from "../style/todo.module.scss";

const TodoInput = ({ onClick }) => {
  //   const [todo, setTodo] = useRecoilState(todoState);
  const onChange = (e) => {
    console.log(e.target.value);
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
        />

        <input
          placeholder="content"
          className={styles.input}
          name="content"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TodoInput;
