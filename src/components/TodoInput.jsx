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
      <p onClick={onClick}>✕</p>
      <input
        placeholder="입력"
        className={styles.input}
        name="title"
        onChange={onChange}
      />
      <input
        placeholder="입력"
        className={styles.input}
        name="content"
        onChange={onChange}
      />
    </div>
  );
};

export default TodoInput;
