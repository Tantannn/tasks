import { useState } from "react";
import type { Task } from "./type";

type History = {
  past: Task[][];
  present: Task[];
  future: Task[][];
};

type Updater = Task[] | ((prev: Task[]) => Task[]);

const useUndo = (initial: Task[] | (() => Task[])) => {
  const [history, setHistory] = useState<History>(() => ({
    past: [],
    present: typeof initial === "function" ? initial() : initial,
    future: [],
  }));

  const tasks = history.present;

  const setTasks = (updater: Updater) => {
    setHistory((h) => {
      const next = typeof updater === "function" ? updater(h.present) : updater;
      if (next === h.present) return h;
      return { past: [...h.past, h.present], present: next, future: [] };
    });
  };

  const undo = () => {
    setHistory((h) => {
      if (!h.past.length) return h;
      return {
        past: h.past.slice(0, -1),
        present: h.past[h.past.length - 1],
        future: [...h.future, h.present],
      };
    });
  };

  const redo = () => {
    setHistory((h) => {
      if (!h.future.length) return h;
      return {
        past: [...h.past, h.present],
        present: h.future[h.future.length - 1],
        future: h.future.slice(0, -1),
      };
    });
  };

  return {
    tasks,
    setTasks,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
  };
};
export default useUndo;
