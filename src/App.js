// import Todo from "./components/Todo";
import { URL } from "./constant/url";
import { useEffect } from "react";
import useFetch from "./hook/useFetch";
import useStore from "./hook/useStore";

function App() {
  // return <Todo />;
  const data = useFetch(`${URL}/todo`);
  const apiData = useStore((state) => state.apiData);
  const addData = useStore((state) => state.addData);

  useEffect(() => {
    if (data) {
      addData(data);
    }
  }, [data, addData]);

  return (
    <div>
      {apiData?.data?.map((apiData) => (
        <p key={apiData.id}>{apiData.title}</p>
      ))}
    </div>
  );
}

export default App;
