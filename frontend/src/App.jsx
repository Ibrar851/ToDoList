import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ToastMessage from "./components/ToastMessage";
import { getTasks } from "./services/api";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(""); // ✅ NEW
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const { data } = await getTasks();
    setTasks(data.reverse());
  };

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
    setToastMessage("✅ Task added successfully!");
    setToastType("add"); // ✅ green
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
    setToastMessage("✅ Task updated successfully!");
    setToastType("update"); // ✅ blue
    setEditingTaskId(null);
  };

  const handleTaskDeleted = (id) => {
    setTasks(tasks.filter((t) => t._id !== id));
    setToastMessage("✅ Task deleted successfully!");
    setToastType("delete"); // ✅ red
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h2 className="title fs-3">Todo List</h2>

        <TaskForm onTaskAdded={handleTaskAdded} />

        <TaskList
          tasks={tasks}
          editingTaskId={editingTaskId}
          setEditingTaskId={setEditingTaskId}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      </div>

      <ToastMessage
        message={toastMessage}
        type={toastType} // ✅ pass type
        onClose={() => setToastMessage("")}
      />
    </div>
  );
};

export default App;
