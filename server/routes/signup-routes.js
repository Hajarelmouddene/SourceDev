const express = require("express");
const { addDevelopper, addEmployer } = require("./handlers/users-handlers");
const router = express.Router();

//route to add a user of type developper to db
router.post("/dev", addDevelopper);
//route to add a user of type employer to db
router.post("/employer", addEmployer);

module.exports = router;
