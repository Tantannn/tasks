import { useEffect, useRef, useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import type { Task } from "./type";
import { DEFAULT_TASKS } from "./const";
import useUndo from "./useUndo";
import useDebounceSearch from "./useDebounceSearch";
import useCountdown from "./useCountdown";

function App() {
  const editInputRef = useRef<HTMLInputElement>(null);
  const addTaskInputRef = useRef<HTMLInputElement>(null);

  const { startCountdown, stopCountdown, coundownInputRef } = useCountdown();
  const { tasks, setTasks, undo, redo, canUndo, canRedo } = useUndo(() => {
    try {
      const storedTasks = localStorage.getItem("taskStore");
      const parsed = storedTasks ? JSON.parse(storedTasks) : DEFAULT_TASKS;
      return Array.isArray(parsed) ? parsed : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { result, loading } = useDebounceSearch(searchQuery);

  const filteredTasks = tasks.filter((t) =>
    t.name.toLowerCase().includes(result?.search?.toLowerCase()),
  );

  const clearSearch = () => {
    setSearchQuery("");
  };

  const addTask = () => {
    const name = addTaskInputRef.current?.value.trim();
    if (!addTaskInputRef.current || !name) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      name,
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
  };

  const saveEditing = (id: string) => {
    const taskName = editInputRef.current?.value.trim();
    if (!taskName) return;
    const updateTask = (t: Task) => {
      const newTask = t.name === taskName ? t : { ...t, name: taskName };
      return newTask;
    };
    setTasks((prev) => prev.map((t) => (t.id === id ? updateTask(t) : t)));
    setEditingId(null);
  };

  useEffect(() => {
    localStorage.setItem("taskStore", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
          <button
            type="button"
            className="counter"
            disabled={!canUndo}
            onClick={() => undo()}
          >
            Undo
          </button>
          <button
            type="button"
            className="counter"
            disabled={!canRedo}
            onClick={() => redo()}
          >
            Redo
          </button>
        </div>
        <div>
          <h1>Get started</h1>
          <input ref={coundownInputRef} />
          <button
            type="button"
            className="counter"
            onClick={() => startCountdown()}
          >
            Start Countdown
          </button>
          
          <button
            type="button"
            className="counter"
            onClick={() => stopCountdown()}
          >
            Stop Countdown
          </button>
          <div>
            <div>
              <input
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                value={searchQuery}
              />
              <button
                type="button"
                className="counter"
                onClick={() => clearSearch()}
              >
                Clear Search
              </button>
            </div>
            <input ref={addTaskInputRef} />
            <button type="button" className="counter" onClick={() => addTask()}>
              Add Task
            </button>
          </div>
        </div>
        <div>
          {loading ? (
            <div>loading</div>
          ) : (
            filteredTasks.map((task) => {
              return (
                <div key={task.id}>
                  {editingId === task.id ? (
                    <>
                      <input ref={editInputRef} defaultValue={task.name} />
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
                    </>
                  ) : (
                    <div>
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
            })
          )}
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  );
}

export default App;
