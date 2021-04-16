const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;
const Project = require("../../models/project/project");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addProject = async (req, res) => {
  //connect to Mongo
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    //do I need any verification?
    //add new project to DB
    console.log(req.body);
    const project = new Project({
      projectName: req.body.projectName,
      projectStartDate: req.body.projectStartDate,
      tasks: req.body.tasks,
      assignedDeveloppers: req.body.assignedDeveloppers,
      employerId: req.body.employerId,
    });
    project.save();
    return res.status(200).json({
      status: 200,
      message: "project added.",
      project: project,
    });
  } catch (error) {
    console.log("ERROR::", error);
  }
  mongoose.connection.close();
};

const getProjects = async (req, res) => {
  //connect to Mongo
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    //do I need any verification?
    //add new project to DB
    console.log(req.params);
    const projectsFound = await Project.find({ employerId: req.params.id });
    if (projectsFound.length > 0) {
      return res.status(200).json({
        status: 200,
        projects: projectsFound,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "no projects found",
      });
    }
  } catch (error) {
    console.log("ERROR::", error);
  }
  mongoose.connection.close();
};

const getProjectById = async (req, res) => {
  //connect to Mongo
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    //do I need any verification?
    //add new project to DB
    console.log(req.params);
    const projectFound = await Project.find({ _id: req.params.id });
    if (projectFound.length > 0) {
      return res.status(200).json({
        status: 200,
        project: projectFound,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "no project was found",
      });
    }
  } catch (error) {
    console.log("ERROR::", error);
  }
  mongoose.connection.close();
};

module.exports = { addProject, getProjects, getProjectById };
