import { Suspense, useState } from "react";

import styles from "../style/todo.module.scss";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const Todo = () => {
  const menu = ["💜 뭐가", "💙 없어서", "🤎 wt"];

  const [show, setShow] = useState(false);
  const [isShowBtn, setIsShowBtn] = useState(true);

  const onClick = () => {
    setShow(!show);
  };

  return (
    <>
      {show && <TodoInput onClick={onClick} />}
      <div className={styles.todoContainer}>
        <div className={styles.todoBar}>
          <img
            className={styles.hamburger}
            src="/img/3075977.png"
            alt="햄버거"
          />
          <h2 className={styles.mainText}>Todo List </h2>
          <p className={styles.fake}>✕</p>
        </div>

        <div className={styles.content}>
          <div className={styles.contentMenu}>
            <h3 className={styles.menu}>Lorem ipsum</h3>
            {menu.map((menu) => (
              <p key={menu} className={styles.menuText}>
                {menu}
              </p>
            ))}
          </div>

          <div className={styles.contentMain}>
            <p className={styles.deco}>Hello 🖐️</p>

            <div className={styles.btn}>
              {isShowBtn ? (
                <>
                  <button
                    onClick={() => {
                      setShow(!show);
                    }}
                    className={show ? styles.addButtonActive : styles.addButton}
                  >
                    Write Todo
                  </button>

                  <a
                    href="https://github.com/Jetom88/recoil_todo"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.addButton}
                  >
                    github
                  </a>
                </>
              ) : (
                <p className={styles.editText}>edit...</p>
              )}
            </div>

            <Suspense fallback={<div>Loading...</div>}>
              <TodoList
                isShowBtn={isShowBtn}
                isShow={() => {
                  setIsShowBtn(!isShowBtn);
                }}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
