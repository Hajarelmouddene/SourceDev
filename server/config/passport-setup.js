const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
require("dotenv").config();
const Developper = require("../models/user/developper");

const strategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/callback",
};

passport.use(
  new GoogleStrategy(
    strategyOptions,
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      //check if user exists in MongoDB, if not create this user.
      const user = new Developper({
        displayName: profile.displayName,
        email: profile.email,
      });
      user.save();
      // Developper.findOrCreate({ googleId: profile.id }, (err, user) => {
      //   return done(err, user);
      // });
    }
  )
);
