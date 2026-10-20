import { useRef, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

interface Tasks {
  id: string;
  name: string;
  createdDate: number;
  endDate: number;
}
const DEFAULT_TASKS: Tasks[] = [
  {
    id: "123124",
    name: "cleaning",
    createdDate: Date.now(),
    endDate: Date.now(),
  },
];

function App() {
  const editInputRef = useRef<HTMLInputElement>(null);
  const addTaskInputRef = useRef<HTMLInputElement>(null);
  const searchTaskInputRef = useRef<HTMLInputElement>(null);

  const [tasks, setTasks] = useState<Tasks[]>(() => {
    try {
      const storedTasks = localStorage.getItem("task");
      return storedTasks ? JSON.parse(storedTasks) : DEFAULT_TASKS;
    } catch {
      return [];
    }
  });
  const [editingId, setEditingId] = useState<string | null>();

  const addTask = () => {
    if (!addTaskInputRef.current || !addTaskInputRef.current.value) return;
    const newTask: Tasks = {
      id: crypto.randomUUID(),
      name: addTaskInputRef.current.value,
      createdDate: Date.now(),
      endDate: Date.now(),
    };

    setTasks((prev) => [...prev, newTask]);
    addTaskInputRef.current.value = "";
  };

  const editTask = (id: string) => {
    setEditingId(id);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => {
      return prev.filter((t) => t.id !== id);
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    editInputRef.current.value = "";
  };

  const saveEditing = (id: string) => {
    if (!editInputRef.current || !editInputRef.current.value) return;
    const taskName = editInputRef.current.value;
    setTasks((prev) => {
      return prev.map((t) => (t.id === id ? { ...t, name: taskName } : t));
    });
    setEditingId(null);
  };

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            <input ref={searchTaskInputRef} />
            <button type="button" className="counter" onClick={() => addTask()}>
              Search Task
            </button>

            <input ref={addTaskInputRef} />
            <button type="button" className="counter" onClick={() => addTask()}>
              Add Task
            </button>
          </p>
        </div>
        <div>
          {tasks.map((task) => {
            return (
              <div>
                {editingId === task.id ? (
                  <div key={task.id}>
                    <input ref={editInputRef} />
                    <button
                      type="button"
                      className="counter"
                      onClick={() => cancelEditing()}
                    >
                      Cancel Edit
                    </button>
                    <button
                      type="button"
                      className="counter"
                      onClick={() => saveEditing(task.id)}
                    >
                      Save Edit
                    </button>
                  </div>
                ) : (
                  <div key={task.id}>
                    {task.name}
                    <button
                      type="button"
                      className="counter"
                      onClick={() => editTask(task.id)}
                    >
                      Edit Task
                    </button>
                    <button
                      type="button"
                      className="counter"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete Task
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
