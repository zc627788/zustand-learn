import { useBoundStore, inc, setText } from "../store";

// In consuming app
export default function App() {
  //省略写法
  const count = useBoundStore((state: any) => state.count);
  const text = useBoundStore((state: any) => state.text);



  return (
    <main>
      <p>bear:{count}</p>
      <button onClick={inc}>增加熊</button>
      <input type="text" onChange={setText} value={text} />
      <p>{text}</p>
    </main>
  );
}
