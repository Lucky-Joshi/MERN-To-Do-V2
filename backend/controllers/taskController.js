import Task from '../models/Task.js';

// 🔽 Get Tasks with Filters
export const getTasks = async (req, res) => {
  const { userId } = req.params;
  const { filter = 'all' } = req.query;

  let query = { userId };
  if (filter === 'completed') query.completed = true;
  if (filter === 'trashed') query.trashed = true;
  if (filter === 'all') query.trashed = false;

  try {
    const tasks = await Task.find(query).sort({ 
      priority: 1, createdAt: -1 
    });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ➕ Create Task
export const createTask = async (req, res) => {
  const { userId, title, priority, description } = req.body;

  try {
    const newTask = await Task.create({
      userId, title, priority, description
    });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Toggle Complete
export const toggleComplete = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🗑️ Soft Delete
export const softDelete = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    task.trashed = true;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ♻️ Restore
export const restoreTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    task.trashed = false;
    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Permanent Delete
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.json({ message: 'Task permanently deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
