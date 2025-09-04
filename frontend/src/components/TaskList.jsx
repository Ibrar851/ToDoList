import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, editingTaskId, setEditingTaskId, onTaskUpdated, onTaskDeleted }) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          isEditing={editingTaskId === task._id} // ✅ only one editing
          setEditingTaskId={setEditingTaskId}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
        />
      ))}
    </ul>
  );
};

export default TaskList;
