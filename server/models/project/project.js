const mongoose = require("mongoose");
const { Schema } = mongoose;
const projectSchema = new Schema({
  projectName: { type: String, required: true },
  projectStartDate: { type: Date, required: true },
  todoTasks: { type: Array, required: false },
  inProgressTasks: { type: Array, required: false },
  pendingReviewTasks: { type: Array, required: false },
  completedTasks: { type: Array, required: false },
  assignedDeveloppers: { type: Array, required: true },
  employerId: { type: String, required: true },
});

module.exports = mongoose.model("Project", projectSchema, "projects");
