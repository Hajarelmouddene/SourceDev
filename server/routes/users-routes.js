const express = require("express");
const router = express.Router();
const {
  getAllDeveloppers,
  getDevelopperByEmail,
  getDeveloppersFromConversations,
} = require("./handlers/users-handlers");
router.get("/", getAllDeveloppers);
router.get("/:id", getDevelopperByEmail);

//get developpers that an employer had conversations with
router.get(`/developpers/search?:queryString`, getDeveloppersFromConversations);

module.exports = router;
