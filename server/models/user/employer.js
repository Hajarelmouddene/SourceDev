const mongoose = require("mongoose");
const { Schema } = mongoose;

//schema to create an employer user on signup
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  projectStartDate: { type: Date, required: false },
  googleId: { type: String, required: false },
});

module.exports = mongoose.model("Employer", userSchema, "employers");
