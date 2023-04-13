import { useStore } from "../store";
import { shallow } from "zustand/shallow";

// In consuming app
export default function App() {
  // "select" the needed state and actions, in this case, the firstName value
  // and the action updateFirstName
  const [firstName, updateFirstName] = useStore(
    (state) => [state.firstName, state.updateFirstName],
    shallow
  );
  const [deep, updateDeep] = useStore((state) => [
    state.deep,
    state.updateDeep,
  ]);

  return (
    <main>
      <label>
        First name
        <input
          // Update the "firstName" state
          onChange={(e) => updateFirstName(e.currentTarget.value)}
          value={firstName}
        />
      </label>

      <p>
        Hello, <strong>{firstName}!</strong>
      </p>
      <p>{deep.nested.obj.count}</p>
      <input
        // Update the "firstName" state
        onChange={(e) => updateDeep(e.currentTarget.value)}
        value={deep.nested.obj.count}
      />
    </main>
  );
}
