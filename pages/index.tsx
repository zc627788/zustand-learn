import { useBoundStore } from "../store";
import { useEffect } from "react";
// In consuming app
export default function App() {

  const count = useBoundStore((state: any) => state.fishes);
  const addAFish = useBoundStore((state: any) => state.addAFish);



  return (
    <main>
      <p>bear:{count}</p>
      <button onClick={addAFish}>增加熊</button>
    </main>
  );
}
