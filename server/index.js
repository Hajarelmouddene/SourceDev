"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const signUpRouter = require("./routes/signup-routes");
const usersRouter = require("./routes/users-routes");
const authRouter = require("./routes/auth-routes");
const messageRouter = require("./routes/message-routes");
const projectsRouter = require("./routes/projects-routes");
const passportSetup = require("./config/passport-setup");
// const cors = require("cors");

const PORT = 4000;

express()
  .use(function (req, res, next) {
    // res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-with, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  // .use(
  //   cors({
  //     origin: "*",
  //     methods: "GET, POST, PATCH, DELETE, PUT",
  //     allowedHeaders: "Content-Type, Authorization",
  //   })
  // )
  .use(express.static("./server/assets"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  //setup routes
  .use("/", express.static(__dirname + "/"))
  ///route to add a developer or an employer as a user to db
  .use("/signup", signUpRouter)
  /// route to authenticate a user
  .use("/auth", authRouter)

  ///send a user message
  .use("/conversation", messageRouter)

  //get developper users from Mongo
  .use("/developpers", usersRouter)

  //create project in Mongo
  .use("/projects", projectsRouter)

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
