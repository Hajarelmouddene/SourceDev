const express = require("express");
const router = express.Router();
const {
  addProject,
  getProjects,
  getProjectById,
  updateProject,
} = require("./handlers/projects-handlers");
router.post("/addproject", addProject);
router.get("/:id/:pageNumber/:itemsPerPage", getProjects);
router.get("/project/:id", getProjectById);
router.post("/project/:id/update", updateProject);

module.exports = router;
