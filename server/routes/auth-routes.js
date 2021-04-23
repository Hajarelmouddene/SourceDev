const express = require("express");
const router = express.Router();
// const cors = require("cors");
const {
  getLocalUserProfile,
  logOut,
  requestGooglePermission,
  redirectUser,
} = require("./handlers/auth-handlers");

// const corsOptions = {
//   origin: "http://localhost:3000",
//   optionsSuccessStatus: 200,
// };

//route to auth local
router.post("/login", getLocalUserProfile);

//route to request permission from Google+ API when a user opts for sign in with Google option
// router.options("*", cors());
// router.get(
//   "/google",
//   cors(corsOptions),
//   requestGooglePermission,
//   (req, res) => {
//     console.log(req);
//   }
// );

router.get("/google", requestGooglePermission);

//callback route for Google to redirect user after authentication attempt
router.get("/google/callback", redirectUser);
module.exports = router;
