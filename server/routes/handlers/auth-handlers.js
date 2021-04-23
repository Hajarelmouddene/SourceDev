const mongoose = require("mongoose");
require("dotenv").config();
const { MONGO_URI } = process.env;
const bcrypt = require("bcrypt");
const passport = require("passport");
const Employer = require("../../models/user/employer");
const Developper = require("../../models/user/developper");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//get Local User from Mongo
const getLocalUserProfile = async (req, res) => {
  //connect to Mongo
  try {
    await mongoose.connect(MONGO_URI, options);
    console.log("Connected to MongoDb");
    //check employer collection if the user is an employer
    const employerFound = await Employer.findOne({
      email: req.body.email,
    }).exec();

    if (employerFound) {
      const match = await bcrypt.compare(
        req.body.password,
        employerFound.password
      );
      if (match) {
        console.log("employer authenticated");
        return res.status(200).json({ status: 200, user: employerFound });
      } else {
        console.log(
          "employer exists but password is wrong, ask to input it again or reset"
        );
        return res
          .status(400)
          .json({ status: 400, message: "Invalid password." });
      }
    } else {
      const developperFound = await Developper.findOne({
        email: req.body.email,
      }).exec();
      if (developperFound) {
        const match = await bcrypt.compare(
          req.body.password,
          developperFound.password
        );
        if (match) {
          console.log("developper authenticated");
          return res.status(200).json({ status: 200, user: developperFound });
        } else {
          console.log(
            "developper exists but password is wrong, ask to input it again or reset"
          );
          return res
            .status(400)
            .json({ status: 400, message: "Invalid password." });
        }
      } else {
        console.log("no developper nor employer were found. please sign up.");
        return res
          .status(404)
          .json({ status: 404, message: "User not found in db." });
      }
    }
  } catch (error) {
    console.log("ERROR::", error);
  }
};

//Request access code from Google Plus API upon user authentication
const requestGooglePermission = passport.authenticate("google", {
  scope: ["profile"],
});

/* Step 1: Provide the received Google access code in redirect URI to fetch profile info. 
Step 2 : After the user was found or added - if not found, user is added - to MongoDB, user is redirected either 
to login if authentication is not succesful or to home page if authentication is successful.*/
const redirectUser = () => {
  passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
      res.redirect("/");
    };
};

module.exports = {
  getLocalUserProfile,
  requestGooglePermission,
  redirectUser,
};
