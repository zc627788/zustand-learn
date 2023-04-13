import Image from "next/image";
import { Inter } from "next/font/google";
import { useStore } from "../store";

export default function Home() {
  const bears = useStore((state: any) => state.bears);
  return (
    <>
      <h1>{bears}</h1>
      <AddControls />
      <RemoveControls />
    </>
  );
}

function AddControls() {
  const increasePopulation = useStore((state: any) => state.increasePopulation);
  return <button onClick={increasePopulation}>one up</button>;
}

function RemoveControls() {
  const removeAllBears = useStore((state: any) => state.removeAllBears);
  return <button onClick={removeAllBears}>clean</button>;
}
