const express = require("express");
const router = express.Router();
const {
  getAllDeveloppers,
  getDevelopperByEmail,
} = require("./handlers/users-handlers");
router.get("/", getAllDeveloppers);
router.get("/:id", getDevelopperByEmail);
module.exports = router;
