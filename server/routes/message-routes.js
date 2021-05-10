const express = require("express");
const {
  sendMessage,
  getAllConversations,
  updateConversation,
} = require("./handlers/messages-handlers");
const router = express.Router();

//route to add a message to db
router.post("/sendMessage", sendMessage);
router.get("/getAll/:id", getAllConversations);
router.patch("/update", updateConversation);

module.exports = router;
