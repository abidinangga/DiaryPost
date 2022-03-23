const express = require("express");
const router = express.Router();
const profile = require("./profile");
const post = require('./post')
const Controller = require('../controllers/controller');

router.get("/", Controller.Home);

router.use("/profile", profile);
router.use('/post', post)

module.exports = router;
