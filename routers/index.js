const express = require("express");
const router = express.Router();
const profile = require("./profile");
const post = require('./post')
const Controller = require('../controllers/controller');

router.get("/", Controller.Home);
router.post("/", Controller.login);
router.get("/regist", Controller.register);
router.post("/regist", Controller.saveRegister);
router.get('/logout', Controller.logout)

router.use("/profile", profile);
router.use('/post', post)

module.exports = router;
