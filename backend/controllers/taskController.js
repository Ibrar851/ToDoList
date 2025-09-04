import Task from "../models/taskModel.js";

// ✅ Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(" Error fetching tasks:", error.message);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// ✅ Add new task
export const addTask = async (req, res) => {
  try {
    console.log("📩 Received Task Data:", req.body);
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(" Error adding task:", error.message);
    res.status(400).json({ message: "Error adding task" });
  }
};

// ✅ Update task
export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error(" Error updating task:", error.message);
    res.status(400).json({ message: "Error updating task" });
  }
};

// ✅ Delete task
export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error(" Error deleting task:", error.message);
    res.status(400).json({ message: "Error deleting task" });
  }
};
