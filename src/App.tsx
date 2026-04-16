import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import Footer from "./components/Footer";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
};

type BackendTask = {
  id: number;
  title: string;
  completed: boolean;
};

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);

      if (!response.ok) {
        throw new Error("No se pudo obtener las tareas");
      }

      const data: BackendTask[] = await response.json();

      const mappedTasks: Task[] = data.map((task) => ({
        id: task.id,
        text: task.title,
        completed: task.completed,
      }));

      setTasks(mappedTasks);
      setWarning("");
    } catch (error) {
      console.error("Error al cargar tareas:", error);
      setWarning("No se pudieron cargar las tareas del servidor.");
    }
  };

  const addTask = async (text: string) => {
    if (text.trim() === "") {
      setWarning("La tarea no puede estar vacía.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: text.trim(),
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo crear la tarea");
      }

      await loadTasks();
      setWarning("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
      setWarning("No se pudo agregar la tarea.");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("No se pudo eliminar la tarea");
      }

      await loadTasks();
      setWarning("");
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      setWarning("No se pudo eliminar la tarea.");
    }
  };

  const toggleTaskCompleted = async (id: number) => {
    try {
      const currentTask = tasks.find((task) => task.id === id);

      if (!currentTask) {
        setWarning("No se encontró la tarea seleccionada.");
        return;
      }

      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !currentTask.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo actualizar la tarea");
      }

      await loadTasks();
      setWarning("");
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      setWarning("No se pudo actualizar la tarea.");
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="app-page">
      <div className="app-container">
        <Header />
        <Footer totalTasks={tasks.length} completedTasks={completedTasks} />

        {warning && <p className="warning-message">{warning}</p>}

        <TaskInput onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onDeleteTask={deleteTask}
          onToggleTask={toggleTaskCompleted}
        />
      </div>
    </div>
  );
}

export default App;