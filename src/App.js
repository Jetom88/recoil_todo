// import Todo from "./components/Todo";
import { URL } from "./constant/url";
import { useCallback, useEffect, useState } from "react";
import useStore from "./hook/useStore";
import styles from "./style/zustandSt.module.scss";

const ItemEdit = ({ item, onDelete, getData }) => {
  const [edit, setEdit] = useState(false);

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

  const onClick = async (e) => {
    const { title, content } = form;

    await fetch(`${URL}/todo/${e}`, {
      method: "PUT",

      body: new URLSearchParams({
        title,
        content,
      }),
    });

    setForm({ title: "", content: "" });
    setEdit(false);
    getData();
  };

  return (
    <div className={styles.todo}>
      {edit && (
        <div className={styles.popup}>
          <div className={styles.popupTitle}>
            <h3>Edit todo</h3>
            <button
              className={styles.close}
              onClick={() => {
                setEdit(false);
              }}
            >
              ✕
            </button>
          </div>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="title"
          />
          <input
            name="content"
            value={form.content}
            onChange={onChange}
            placeholder="content"
          />

          <button
            type="submit"
            onClick={() => {
              onClick(item.id);
            }}
            className={styles.submitBtn}
          >
            edit
          </button>
        </div>
      )}

      <div className={styles.todoContent}>
        <p className={styles.todoTitle}>{item.title}</p>
        <p className={styles.content}>{item.content}</p>
      </div>

      <button
        onClick={() => {
          setEdit(!edit);
        }}
      >
        📝
      </button>
      <button
        onClick={() => {
          onDelete(item.id);
        }}
      >
        🗑️
      </button>
    </div>
  );
};

function App() {
  //zustand로 작성된 todo

  // return <Todo />;
  const { apiData, setData } = useStore((state) => state);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [show, setShow] = useState(false);

  const getData = useCallback(async () => {
    const res = await fetch(`${URL}/todo`).then((res) => res.json());
    setData(res.data);
  }, [setData]);

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onClick = async (e) => {
    const { title, content } = form;
    e.preventDefault();

    await fetch(`${URL}/todo`, {
      method: "POST",

      body: new URLSearchParams({
        title,
        content,
      }),
    });

    setForm({ title: "", content: "" });
    setShow(false);
    getData();
  };

  const onDelete = async (e) => {
    await fetch(`${URL}/todo/${e}`, {
      method: "DELETE",
    });

    getData();
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className={styles.container}>
      {show && (
        <div className={styles.popup}>
          <div className={styles.popupTitle}>
            <h3>Add todo</h3>
            <button
              className={styles.close}
              onClick={() => {
                setShow(false);
              }}
            >
              ✕
            </button>
          </div>
          <input
            name="title"
            value={form.title}
            onChange={onChange}
            placeholder="title"
          />
          <input
            name="content"
            value={form.content}
            onChange={onChange}
            placeholder="content"
          />

          <button type="submit" onClick={onClick} className={styles.submitBtn}>
            submit
          </button>
        </div>
      )}
      <div className={styles.date}>
        <h3 className={styles.mainText}>TODO LIST</h3>

        <div className={styles.addTodo}>
          <button
            className={styles.btn}
            onClick={() => {
              setShow(!show);
            }}
          >
            +
          </button>
        </div>
      </div>

      {apiData.length !== 0 ? (
        <div className={styles.todoBorder}>
          {apiData?.map((apiData) => (
            <div className={styles.todoList} key={apiData.id}>
              <ItemEdit item={apiData} onDelete={onDelete} getData={getData} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noData}>
          <p>할일이 없나여?🥲</p>
        </div>
      )}
    </div>
  );
}

export default App;
