const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;
const Developper = require("../../models/user/developper");
const Employer = require("../../models/user/employer");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//add a user of type developper to the database.
const addDevelopper = async (req, res) => {
  console.log("in dev");
  //connect to Mongo
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    //find user by provided email
    const employerFound = await Employer.findOne({
      email: req.body.email,
    }).exec();
    const developperFound = await Developper.findOne({
      email: req.body.email,
    }).exec();

    /*if user is found in db return. check both employer and developper collections to 
      ensure a visitor cannot signup to both collections with the same email */
    if (employerFound || developperFound) {
      return res
        .status(400)
        .json({ status: 400, message: "This user already exists." });
    } else {
      //if user is not in db, generate salt and hash for password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      //create user from schema and save to db.
      console.log(req.body);

      const user = new Developper({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        city: req.body.city,
        province: req.body.province,
        country: req.body.country,
        githubURL: req.body.gitHubURL,
        title: req.body.title,
        programmingLanguages: req.body.programmingLanguages,
        frameworks: req.body.frameworks,
        bio: req.body.bio,
        profilePhoto: req.body.profilePhoto,
      });
      user.save();
      return res
        .status(200)
        .json({ status: 200, message: "User added.", user: user });
    }
  } catch (error) {
    console.log("ERROR::", error);
  }
  mongoose.connection.close();
};

//add a user of type employer to the database.
const addEmployer = async (req, res) => {
  //connect to Mongo
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    //find user by provided email
    const employerFound = await Employer.findOne({
      email: req.body.email,
    }).exec();
    const developperFound = await Developper.findOne({
      email: req.body.email,
    }).exec();

    /*if user is found in db return. check both employer and developper collections to 
    ensure a visitor cannot signup to both collections with the same email */
    if (employerFound || developperFound) {
      return res
        .status(400)
        .json({ status: 400, message: "This user already exists." });
    } else {
      //if user is not in db, generate salt and hash for password
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      //create user from schema and save to db.
      const user = new Employer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        projectStartDate: req.body.projectStartDate,
      });
      user.save();
      return res
        .status(200)
        .json({ status: 200, message: "User added.", user: user });
    }
  } catch (error) {
    console.log("ERROR::", error);
  }
  mongoose.connection.close();
};

const getAllDeveloppers = async (req, res) => {
  //connect to Mongo
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    //find user by provided email
    const developpersFound = await Developper.find().exec();
    if (developpersFound) {
      return res.status(200).json({ status: 200, profiles: developpersFound });
    } else {
      return res.status(404).json({
        status: 404,
        message: "There are no developpers profiles currently in our database.",
      });
    }
  } catch (error) {
    console.log("ERROR::", error);
  }
  mongoose.connection.close();
};

const getDevelopperByEmail = async (req, res) => {
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    //find user by provided email
    const developperFound = await Developper.findOne({
      _id: req.params.id,
    }).exec();

    if (developperFound) {
      console.log("developper Found");
      return res.status(200).json({ status: 200, profile: developperFound });
    } else {
      return res.status(404).json({
        status: 404,
        message:
          "The requested developper profile does not exit in our database.",
      });
    }
  } catch (error) {
    console.log("ERROR::", error);
  }
  mongoose.connection.close();
};

module.exports = {
  addDevelopper,
  addEmployer,
  getAllDeveloppers,
  getDevelopperByEmail,
};
