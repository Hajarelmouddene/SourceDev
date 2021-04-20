const mongoose = require("mongoose");
const { Schema } = mongoose;

//schema to create a developer user on signup
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  githHubURL: { type: String, required: false },
  googleId: { type: String, required: false },
  city: { type: String, required: true },
  province: { type: String, required: true },
  country: { type: String, required: true },
  title: { type: String, required: true },
  programmingLanguages: { type: Array, required: true },
  frameworks: { type: Array, required: true },
  bio: { type: String, required: true },
  profilePhoto: { type: String, required: false },
  dateAccountCreated: { type: String, required: true },
});

module.exports = mongoose.model("Developper", userSchema, "developpers");
