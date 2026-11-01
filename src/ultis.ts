import type { Task } from "./type";

export const same = (a: Task[], b: Task[]) =>
  a === b || (a.length === b.length && a.every((t, i) => t === b[i]));
