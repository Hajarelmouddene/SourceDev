const express = require("express");
const router = express.Router();
const {
  addProject,
  getProjects,
  getProjectById,
} = require("./handlers/projects-handlers");
router.post("/addproject", addProject);
router.get("/:id", getProjects);
router.get("/project/:id", getProjectById);

module.exports = router;
