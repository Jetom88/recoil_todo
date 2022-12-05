// import Todo from "./components/Todo";
import { useStore } from "./store/store";

function App() {
  // return <Todo />;
  const bears = useStore((state) => state.bears);
  const increase = useStore((state) => state.increase);
  const decrease = useStore((state) => state.decrease);
  return (
    <>
      <h1>{bears}</h1>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
    </>
  );
}

export default App;
