import {  useBearStore } from "../store";
import { shallow } from "zustand/shallow";

// In consuming app
export default function App() {


  //省略写法
  const bears = useBearStore.use.bears();
  const increase = useBearStore.use.increment();

  return (
    <main>
      <p>bear:{bears}</p>
      <button onClick={increase}>增加熊</button>
    </main>
  );
}
