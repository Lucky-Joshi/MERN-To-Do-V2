const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userId: String,
    title: String,
    description: String,
    priority: String,
    completed: { type: Boolean, default: false },
    trashed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
