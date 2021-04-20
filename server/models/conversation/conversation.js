const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  senderId: { type: String, required: false },
  messageTimestamp: { type: String, required: true },
  messageContent: { type: String, required: true },
});

const conversationSchema = new Schema({
  participants: { type: Array, required: true },
  lastMessageTimestamp: { type: String, required: false },
  messages: [messageSchema],
});

module.exports = mongoose.model(
  "Conversation",
  conversationSchema,
  "conversations"
);
