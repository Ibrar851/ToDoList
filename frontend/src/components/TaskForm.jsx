import React, { useState } from "react";
import { createTask } from "../services/api";

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const { data } = await createTask({ title });
      console.log("✅ Task created:", data);
      setTitle(""); // clear input
      onTaskAdded(data); // update parent state
    } catch (err) {
      console.error("❌ Error creating task:", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "8px", width: "70%" }}
      />
      <button type="submit" style={{ padding: "8px 12px", marginLeft: "10px" }}>
        Add
      </button>
    </form>
  );
};

export default TaskForm;
