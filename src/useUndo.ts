import { useState } from "react";
import type { Task } from "./type";

const useUndo = (task: Task[]) => {
  const [past, setPast] = useState<Task[][]>([task]);
  const [present, setPresent] = useState<Task[]>();
  const [future, setFuture] = useState<Task[][]>();

  const set = (data: Task[]) => {
    setPresent(data);
    setPast((prev) => [...prev, data]);
  };

  const undo = () => {
    const clonedStack = [...past];
    const last = clonedStack.at(-1);
    const rest = clonedStack.slice(0, clonedStack.length - 1);
    setFuture((prev) => [...prev, present]);
    setPresent(last);
    setPast(rest);
  };

  const redo = () => {
    const clonedPast = [...future];
    const last = clonedPast.at(-1);
    const rest = clonedPast.slice(0, clonedPast.length - 1);
    setFuture(rest);
    setPast((prev) => [...prev, present]);
    setPresent(last);
  };

  return { past, set, undo, redo };
};
export default useUndo;
