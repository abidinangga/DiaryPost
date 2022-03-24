"use strict";
const express = require("express");
const route = require("./routers/index.js");
const app = express();
const session = require('express-session')
const port = 3000;
const cors = require('cors')

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(cors())

app.use(session({
  secret: 'mamang racing',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
  }
}))

app.use("/", route);

app.listen(port, function () {
  console.log("running " + port);
});
