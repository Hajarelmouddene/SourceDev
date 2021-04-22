const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoTasksSchema = new Schema({
  task: { type: String, required: true },
});

const inProgressTasksSchema = new Schema({
  task: { type: String, required: true },
});
const pendingReviewTasksSchema = new Schema({
  task: { type: String, required: true },
});
const completedTasksSchema = new Schema({
  task: { type: String, required: true },
});

const projectSchema = new Schema({
  projectName: { type: String, required: true },
  projectStartDate: { type: String, required: true },
  todoTasks: [todoTasksSchema],
  inProgressTasks: [inProgressTasksSchema],
  pendingReviewTasks: [pendingReviewTasksSchema],
  completedTasks: [completedTasksSchema],
  assignedDeveloppers: { type: Array, required: true },
  employerId: { type: String, required: true },
});

module.exports = mongoose.model("Project", projectSchema, "projects");
