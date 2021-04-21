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
        dateAccountCreated: req.body.dateAccountCreated,
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
    console.log(req.body);
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
        city: req.body.city,
        province: req.body.province,
        country: req.body.country,
        profilePhoto: req.body.profilePhoto,
        dateAccountCreated: req.body.dateAccountCreated,
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
    console.log(req.params);
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

const getDeveloppersFromConversations = async (req, res) => {
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    console.log(req.query);

    // const developperFound = await Developper.findOne({
    //   _id: req.params.id,
    // }).exec();

    // if (developperFound) {
    //   console.log("developper Found");
    //   return res.status(200).json({ status: 200, profile: developperFound });
    // } else {
    //   return res.status(404).json({
    //     status: 404,
    //     message:
    //       "The requested developper profile does not exit in our database.",
    //   });
    // }
  } catch (error) {
    console.log("ERROR::", error);
  }
  mongoose.connection.close();
};

const updateDevelopperProfile = async (req, res) => {};

const getDeveloppersInConversation = async (req, res) => {
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    console.log(req.query);
    //find user by provided id
    const developpersFound = await Developper.find({
      _id: req.query.id,
    }).exec();

    const employersFound = await Employer.find({
      _id: req.query.id,
    }).exec();

    if (developpersFound.length > 0) {
      return res.status(200).json({ status: 200, profiles: developpersFound });
    } else if (employersFound.length > 0) {
      return res.status(200).json({ status: 200, profiles: employersFound });
    } else {
      return res.status(404).json({
        status: 404,
        message:
          "The requested developpers profiles do not exit in our database.",
      });
    }
  } catch (error) {
    console.log("ERROR::", error);
  }
  mongoose.connection.close();
};

const getDevelopperProfilesByPageLimit = async (req, res) => {
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    console.log("here");
    console.log(req.params);
    // 0 - 48 indexes (49 items all together)
    // 0 - 9 index is page 1
    //10 - 19 index is page 2
    //.... 40 - 49 items is page 5.
    //if I want page 5 I skip the first 39.
    //  desiredpagenumber - 1 * items per page  =  5-1 * 10 = 40 = start index of 5th page.
    //skip first 40 and start there. mongoose will do 0 -39 no need to calc indexes.
    console.log(req.query.location);
    let developpersFound;
    let count;
    if (req.query.location) {
      count = await Developper.countDocuments({ city: req.query.location });
      developpersFound = await Developper.find({
        city: req.query.location,
      })
        .skip(Number((req.params.pageNumber - 1) * req.params.itemsPerPage))
        .limit(Number(req.params.itemsPerPage))
        .exec();
      console.log(developpersFound);
    } else {
      count = await Developper.countDocuments();
      developpersFound = await Developper.find()
        .skip(Number((req.params.pageNumber - 1) * req.params.itemsPerPage))
        .limit(Number(req.params.itemsPerPage))
        .exec();
      console.log(developpersFound);
    }
    if (developpersFound.length > 0) {
      return res
        .status(200)
        .json({
          status: 200,
          profiles: developpersFound,
          profilesCount: count,
        });
    } else {
      return res.status(404).json({
        status: 404,
        message:
          "The requested developpers profiles do not exit in our database.",
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
  getDeveloppersFromConversations,
  updateDevelopperProfile,
  getDeveloppersInConversation,
  getDevelopperProfilesByPageLimit,
};
