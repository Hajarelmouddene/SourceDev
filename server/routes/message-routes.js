const express = require("express");
const {
  sendMessage,
  getAllConversations,
} = require("./handlers/messages-handlers");
const router = express.Router();

//route to add a message to db
router.post("/sendMessage", sendMessage);
router.get("/getAll/:id", getAllConversations);

module.exports = router;
