import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import { getTasks } from "./services/api";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const { data } = await getTasks();
    setTasks(data);
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
    <div className="app-container">
      <div className="todo-card">
        <h2 className="title fs-3">Todo List</h2>
        <TaskList
          tasks={tasks}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      </div>
    </div>
  );
};

export default App;
