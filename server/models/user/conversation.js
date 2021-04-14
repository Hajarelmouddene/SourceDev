const mongoose = require("mongoos");
const { Schema } = mongoose;

const message = new Schema ({
senderID: 
messageTimestamp: 
messageContent: 
})

const conversation = new Schema({
  participants: { type: Array, required: true },
  lastMessageTimeStamp: { type: Date, required: true },
  messages: [message],
});

