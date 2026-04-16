import "./TaskCard.css";

type TaskCardProps = {
  id: number;
  text: string;
  completed?: boolean;
  onDelete: (id: number) => void | Promise<void>;
  onToggle: (id: number) => void | Promise<void>;
};

function TaskCard({
  id,
  text,
  completed = false,
  onDelete,
  onToggle,
}: TaskCardProps) {
  return (
    <li className={`task-card ${completed ? "completed" : ""}`}>
      <div className="task-card-left">
        <input
          className="task-checkbox"
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id)}
        />
        <span className="task-text">{text}</span>
      </div>

      <button className="delete-btn" onClick={() => onDelete(id)}>
        Eliminar
      </button>
    </li>
  );
}

export default TaskCard;