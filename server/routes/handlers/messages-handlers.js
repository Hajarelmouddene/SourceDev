const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//send message to Mongo
const sendMessage = async (req, res) => {
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    console.log(req.body);
  } catch (error) {
    console.log("ERROR::", error);
  }
};

const getConversation = async (req, res) => {
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    console.log(req.body);
  } catch (error) {
    console.log("ERROR::", error);
  }
};

module.exports = {
  sendMessage,
  getConversation,
};
