export interface Task {
  id: string;
  name: string;
  createdDate: number;
  endDate: number;
}

export type History = {
  past: Task[][];
  present: Task[];
  future: Task[][];
};
