const express = require("express");
const router = express.Router();
const {
  addProject,
  getProjects,
  getProjectById,
  addProjectTask,
  updateProjectTask,
} = require("./handlers/projects-handlers");
router.post("/addproject", addProject);
router.get("/:id/:pageNumber/:itemsPerPage", getProjects);
router.get("/project/:id", getProjectById);
router.post("/project/:id/addTask", addProjectTask);
router.post("/project/:id/updateTask", updateProjectTask);

module.exports = router;
