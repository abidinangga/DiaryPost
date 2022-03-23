const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/:userId",Controller.Profile);
router.get("/:userId/edit", Controller.profileEdit);
router.post("/:userId/edit", Controller.profileEditPost);
router.get("/:userId/post", Controller.postProfile);

module.exports = router;