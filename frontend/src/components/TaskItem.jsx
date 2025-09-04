import React, { useState } from "react";
import { updateTask, deleteTask } from "../services/api";

const TaskItem = ({ task, onTaskUpdated, onTaskDeleted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  // ✅ Save updated task
  const handleUpdate = async () => {
    try {
      const { data } = await updateTask(task._id, { title });
      onTaskUpdated(data);
      setIsEditing(false);
    } catch (err) {
      console.error("❌ Error updating task:", err.message);
    }
  };

  // ✅ Delete task
  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      onTaskDeleted(task._id);
    } catch (err) {
      console.error("❌ Error deleting task:", err.message);
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "6px", flex: "1" }}
          />
          <button onClick={handleUpdate} style={{ background: "green", marginLeft: "8px" }}>
            ✅ Save
          </button>
          <button onClick={() => setIsEditing(false)} style={{ background: "gray", marginLeft: "5px" }}>
            ❌ Cancel
          </button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button onClick={() => setIsEditing(true)} style={{ background: "#007bff", marginRight: "5px" }}>
            ✏ Edit
          </button>
          <button onClick={handleDelete}>🗑 Delete</button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
