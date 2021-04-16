const mongoose = require("mongoose");
const { Schema } = mongoose;
const projectSchema = new Schema({
  projectName: { type: String, required: true },
  projectStartDate: { type: Date, required: true },
  tasks: { type: Array, required: true },
  assignedDeveloppers: { type: Array, required: true },
  employerId: { type: String, required: true },
});

module.exports = mongoose.model("Project", projectSchema, "projects");
