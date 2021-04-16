const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  senderID: { type: String, required: false },
  messageTimestamp: { type: Date, required: true },
  messageContent: { type: String, required: true },
});

const conversationSchema = new Schema({
  participants: { type: Array, required: true },
  lastMessageTimestamp: { type: Date, required: false },
  messages: [messageSchema],
});

module.exports = mongoose.model(
  "Conversation",
  conversationSchema,
  "conversations"
);
