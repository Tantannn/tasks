import { useState } from "react";
import type { Task } from "./type";

const useUndo = () => {
  const [past, setPast] = useState<Task[]>([]);
  const [stack, setStack] = useState<Task[]>([]);

  const set = (data: Task) => {
    setStack((prev) => [...prev, data]);
  };

  const undo = () => {
    const clonedStack = [...stack];
    const last = clonedStack.at(-1);
    const rest = clonedStack.toSpliced(0, clonedStack.length - 1);
    setStack(rest);
    setPast((prev) => [...prev, last]);
  };

  const redo = () => {
    const clonedPast = [...past];
    const last = clonedPast.at(-1);
    const rest = clonedPast.toSpliced(0, clonedPast.length - 1);
    setPast(rest);
    setStack((prev) => [...prev, last]);
  };

  return { past, set, undo, redo };
};
export default useUndo;
