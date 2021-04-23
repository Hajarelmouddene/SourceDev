const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;
const Project = require("../../models/project/project");
const { ObjectID } = require("mongodb");

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
      todoTasks: { task: req.body.todoTasks },
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
    let count;
    const employerProjectsFound = await Project.find({
      employerId: req.params.id,
    })
      .skip(Number((req.params.pageNumber - 1) * req.params.itemsPerPage))
      .limit(Number(req.params.itemsPerPage))
      .exec();

    // const developperProjectsFound = await Project.find({
    //   assignedDeveloppers: { _id: { $in: [req.params.id] } },
    // })
    //   .skip(Number((req.params.pageNumber - 1) * req.params.itemsPerPage))
    //   .limit(Number(req.params.itemsPerPage))
    //   .exec();

    const developperProjectsFound = await Project.find({
      "assignedDeveloppers._id": req.params.id,
    })
      .skip(Number((req.params.pageNumber - 1) * req.params.itemsPerPage))
      .limit(Number(req.params.itemsPerPage))
      .exec();

    console.log(developperProjectsFound);
    if (employerProjectsFound.length > 0) {
      count = await Project.countDocuments({
        employerId: req.params.id,
      });
      return res.status(200).json({
        status: 200,
        projects: employerProjectsFound,
        projectsCount: count,
      });
    } else if (developperProjectsFound.length > 0) {
      count = await Project.countDocuments({
        assignedDeveloppers: { $in: [req.params.id] },
      });
      return res.status(200).json({
        status: 200,
        projects: developperProjectsFound,
        projectsCount: count,
      });
    } else {
      return res.status(404).json({
        status: 404,
        message: "No projects found in our database.",
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

const addProjectTask = async (req, res) => {
  //connect to Mongo
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    //do I need any verification?
    //add new project to DB
    console.log(req.body);
    let projectFound = await Project.find({ _id: req.body._id });
    if (projectFound) {
      await Project.updateOne(
        { _id: req.body._id },
        {
          $push: {
            [req.body.taskType]: { task: req.body[req.body.taskType] },
          },
        }
      );
      let updatedProjectFound = await Project.find({ _id: req.body._id });

      return res.status(201).json({
        status: 201,
        project: updatedProjectFound,
        message: "project updated",
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

const updateProjectTask = async (req, res) => {
  //connect to Mongo
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    //do I need any verification?
    //add new project to DB
    console.log(req.body);
    let projectFound = await Project.findOne({
      _id: req.body.projectId,
      // [`${req.body.type}.id`]: req.body.taskId,
    });
    console.log(projectFound);
    if (projectFound) {
      if (projectFound) {
        const index = projectFound[req.body.type].findIndex((task) => {
          return task._id.toString() === req.body.taskId;
        });
        projectFound[req.body.type][index].task === req.body[req.body.type];
        console.log(projectFound);

        let updatedProject = await projectFound.save();

        console.log("HERE", updatedProject);

        return res.status(201).json({
          status: 201,
          project: updatedProject,
          message: "project updated",
        });
      }
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

module.exports = {
  addProject,
  getProjects,
  getProjectById,
  addProjectTask,
  updateProjectTask,
};
