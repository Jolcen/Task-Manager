import { useState } from "react";
import "./TaskInput.css";

type TaskInputProps = {
  onAddTask: (text: string) => void | Promise<void>;
};

function TaskInput({ onAddTask }: TaskInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = async () => {
    const value = inputValue;

    await onAddTask(value);

    if (value.trim() !== "") {
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  return (
    <div className="task-input-container">
      <input
        className="task-input"
        type="text"
        placeholder="Escribe una tarea"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="task-add-btn" onClick={handleAddTask}>
        Agregar
      </button>
    </div>
  );
}

export default TaskInput;