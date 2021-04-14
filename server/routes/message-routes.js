const express = require("express");
const {
  sendMessage,
  getConversation,
} = require("./handlers/messages-handlers");
const router = express.Router();

//route to add a message to db
router.post("/sendmessage", sendMessage);
router.post("/conversation", getConversation);

module.exports = router;
