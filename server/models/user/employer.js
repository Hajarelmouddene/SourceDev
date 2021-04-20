const mongoose = require("mongoose");
const { Schema } = mongoose;

//schema to create an employer user on signup
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
  profilePhoto: { type: String, required: true },
  googleId: { type: String, required: false },
  dateAccountCreated: { type: String, required: true },
});

module.exports = mongoose.model("Employer", userSchema, "employers");
