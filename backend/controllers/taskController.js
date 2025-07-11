const Task = require("../models/Task");

// Priority map for sorting
const priorityOrder = { High: 1, Medium: 2, Low: 3, Lowest: 4 };

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const { filter } = req.query;

    let query = { userId };

    if (filter === "completed") query.completed = true;
    else if (filter === "trashed") query.trashed = true;
    else query.trashed = false;

    let tasks = await Task.find(query);

    // Sort: uncompleted first, then by priority
    tasks.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.toggleDone = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.trashTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.trashed = true;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.restoreTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    task.trashed = false;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
