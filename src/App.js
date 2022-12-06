// import Todo from "./components/Todo";
import { URL } from "./constant/url";
import { useCallback, useEffect, useState } from "react";
import useStore from "./hook/useStore";
import styles from "./style/zustandSt.module.scss";

function App() {
  // return <Todo />;
  const { apiData, setData } = useStore((state) => state);

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

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

    getData();
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      {apiData?.map((apiData) => (
        <div key={apiData.id} className={styles.content}>
          <p>{apiData.title}</p>
          <p>{apiData.content}</p>
        </div>
      ))}

      <input name="title" value={form.title} onChange={onChange} />
      <input name="content" value={form.content} onChange={onChange} />

      <button type="submit" onClick={onClick}>
        submit
      </button>
    </div>
  );
}

export default App;
