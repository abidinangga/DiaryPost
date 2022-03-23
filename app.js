"use strict";
const express = require("express");
const route = require("./routers/index.js");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", route);

app.listen(port, function () {
  console.log("running " + port);
});
