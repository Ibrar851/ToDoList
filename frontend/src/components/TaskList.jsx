import React, { useState, useEffect } from "react";
import { getTasks } from "../services/api";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from backend
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("❌ Error fetching tasks:", err.message);
    }
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
  };

  const handleTaskDeleted = (id) => {
    setTasks(tasks.filter((t) => t._id !== id));
  };

  return (
    <div>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
