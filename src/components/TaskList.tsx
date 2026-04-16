import TaskCard from "./TaskCard";
import type { Task } from "../App";

type TaskListProps = {
  tasks: Task[];
  onDeleteTask: (id: number) => void | Promise<void>;
  onToggleTask: (id: number) => void | Promise<void>;
};

function TaskList({ tasks, onDeleteTask, onToggleTask }: TaskListProps) {
  if (tasks.length === 0) {
    return <p>No hay tareas registradas.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          text={task.text}
          completed={task.completed}
          onDelete={onDeleteTask}
          onToggle={onToggleTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;